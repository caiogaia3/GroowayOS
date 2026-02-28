"use server";

import { spawn } from 'child_process';
import { TriggerAnalysisSchema, TriggerAnalysisInput } from '@/core/lib/validation';

/**
 * Triggers the Python analysis orchestrator.
 * This runs in the background and updates Supabase directly.
 * 
 * Path construction uses env vars and string ops to prevent
 * Turbopack from statically tracing the intelligence/venv symlinks.
 */
export async function triggerAnalysisAction(params: TriggerAnalysisInput) {
    try {
        // Validate inputs
        const validatedParams = TriggerAnalysisSchema.parse(params);

        // Build paths at runtime only — prevents Turbopack from 
        // following the venv symlink during build-time module resolution
        const cwd = process.cwd();
        const sep = '/';
        const pythonRoot = `${cwd}${sep}intelligence`;
        const scriptPath = `${pythonRoot}${sep}main.py`;
        const venvPython = `${pythonRoot}${sep}venv${sep}bin${sep}python3`;

        // Prepare JSON input
        const jsonInput = JSON.stringify(validatedParams);

        console.log(`[*] Triggering Python analysis for: ${params.url}`);

        // Spawn process
        const pythonProcess = spawn(venvPython, [scriptPath, jsonInput], {
            cwd: pythonRoot,
            env: { ...process.env, PYTHONPATH: pythonRoot }
        });

        // We don't wait for it to finish (background task)
        // Python will update Supabase once done

        pythonProcess.stdout.on('data', (data) => {
            console.log(`[Python STDOUT]: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`[Python STDERR]: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`[Python] Finalizado com código: ${code}`);
        });

        return { success: true };
    } catch (error: any) {
        console.error('Error triggering analysis:', error);
        return { success: false, error: error.message };
    }
}
