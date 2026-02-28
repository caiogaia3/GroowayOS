export interface GMBData {
    company_name: string;
    address: string;
    rating: number;
    reviews_count: number;
    photos_count: number;
    is_claimed: boolean;
    missing_fields: string[];
    sentiment_analysis: string;
}

export interface SEOData {
    score: number;
    load_time: string;
    on_page_issues: string[];
    mobile_friendly: boolean;
}

export interface AdsData {
    competitors: string[];
    top_keywords: string[];
    estimated_monthly_spend?: string;
}

export interface SpecialistResult {
    agent_id: string;
    agent_name: string;
    score: number;
    findings: string[];
    recommendations: string[];
}

export interface DiagnosticReport {
    id: string;
    lead_id: string;
    target_url: string;
    status: 'processing' | 'complete' | 'failed';
    final_score: number;
    gmb?: GMBData;
    seo?: SEOData;
    ads?: AdsData;
    specialists: SpecialistResult[];
    created_at: string;
}
