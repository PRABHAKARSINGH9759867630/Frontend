import { Affiliations } from "../Affiliations";

export default function AffiliationsExample() {
  const affiliations = [
    { id: 1, name: "CBSE", logo: "" },
    { id: 2, name: "Rotary Club", logo: "" },
    { id: 3, name: "Astropathshala", logo: "" },
    { id: 4, name: "NABET", logo: "" },
    { id: 5, name: "ISO 9001", logo: "" },
    { id: 6, name: "UNESCO", logo: "" },
  ];

  return <Affiliations affiliations={affiliations} />;
}
