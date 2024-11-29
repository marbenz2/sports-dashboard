import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(-1);
  };

  return (
    <button className="btn w-fit group" onClick={handleOnClick}>
      <ChevronLeft className="size-4 aspect-square group-hover:animate-spin-back" />
      Zurück
    </button>
  );
}
