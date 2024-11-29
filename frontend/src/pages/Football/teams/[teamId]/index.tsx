import { useParams } from "react-router";

export default function TeamDetailsPage() {
  const teamId = useParams().teamId;
  return <div>TeamId:{teamId}</div>;
}
