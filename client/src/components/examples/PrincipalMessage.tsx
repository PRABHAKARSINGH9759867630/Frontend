import { PrincipalMessage } from "../PrincipalMessage";

export default function PrincipalMessageExample() {
  return (
    <PrincipalMessage
      useDatabase={true}
      fullMessageLink="/principal-message"
    />
  );
}
