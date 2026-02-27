export type ProposalSource = 'diagnostic' | 'manual';
export type ProposalStatus = 'draft' | 'sent' | 'approved' | 'rejected';
export type PricingType = 'fixed' | 'monthly' | 'per_unit';

export interface ServiceCatalogItem {
    id: string;
    category: string;
    name: string;
    description: string | null;
    deliverables: any;
    pricing_type: PricingType;
    base_price: number | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
}

export interface Proposal {
    id: string;
    slug: string;
    client_name: string;
    client_company: string | null;
    client_email: string | null;
    source: ProposalSource;
    report_id: string | null;
    status: ProposalStatus;
    current_version: number;
    validity_days: number;
    expires_at: string | null;
    share_token: string;
    created_at: string;
    updated_at: string;
}

export interface ProposalVersion {
    id: string;
    proposal_id: string;
    version: number;
    content: any; // Using any for now, can refine if needed based on JSON schema
    change_note: string | null;
    created_at: string;
}

export interface ProposalView {
    id: string;
    proposal_id: string;
    viewer_hash: string;
    viewed_at: string;
    time_on_page_seconds: number | null;
    downloaded_pdf: boolean;
    user_agent: string | null;
}
