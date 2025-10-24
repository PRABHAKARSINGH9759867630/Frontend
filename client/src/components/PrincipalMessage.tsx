import LeadershipDesk from "./LeadershipDesk";

export interface PrincipalMessageProps {
  name?: string;
  title?: string;
  photo?: string;
  message?: string;
  fullMessageLink?: string;
  useDatabase?: boolean; // New prop to control whether to use database or props
}

export function PrincipalMessage({
  name: propName,
  title: propTitle,
  photo: propPhoto,
  message: propMessage,
  fullMessageLink = "/principal-message",
  useDatabase = true,
}: PrincipalMessageProps) {
  // Simply render the new LeadershipDesk component
  return <LeadershipDesk />;
}
