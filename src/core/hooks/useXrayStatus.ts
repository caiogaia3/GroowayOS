"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/core/lib/supabase';

interface XrayStatus {
    status: 'processing' | 'complete' | 'failed' | 'idle';
    reportData: any;
    finalScore: number;
    error?: string;
}

/**
 * Hook to poll for diagnostic analysis completion.
 * @param diagnosticId The ID of the diagnostic to track
 */
export function useXrayStatus(diagnosticId: string | null) {
    const [data, setData] = useState<XrayStatus>({
        status: 'idle',
        reportData: null,
        finalScore: 0
    });

    useEffect(() => {
        if (!diagnosticId) {
            setData({ status: 'idle', reportData: null, finalScore: 0 });
            return;
        }

        setData(prev => ({ ...prev, status: 'processing' }));

        const poll = async () => {
            const { data: diagnostic, error } = await supabase
                .from('diagnostics')
                .select('*')
                .eq('id', diagnosticId)
                .single();

            if (error) {
                console.error('Polling error:', error);
                return;
            }

            if (diagnostic?.status === 'complete') {
                setData({
                    status: 'complete',
                    reportData: diagnostic.report_data,
                    finalScore: diagnostic.final_score
                });
                clearInterval(interval);
            } else if (diagnostic?.status === 'failed') {
                setData(prev => ({ ...prev, status: 'failed', error: 'Análise falhou.' }));
                clearInterval(interval);
            }
        };

        const interval = setInterval(poll, 3000); // Polling every 3s
        poll(); // Initial check

        return () => clearInterval(interval);
    }, [diagnosticId]);

    return data;
}
