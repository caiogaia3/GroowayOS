import { getProposalWithVersion } from "@/features/proposals/actions/get_proposal";
import { notFound } from "next/navigation";
import EditProposalClient from "./EditProposalClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProposalPage(props: PageProps) {
    const { id } = await props.params;
    const data = await getProposalWithVersion(id);

    if (!data) return notFound();

    return <EditProposalClient proposal={data.proposal} initialVersion={data.version} />;
}
