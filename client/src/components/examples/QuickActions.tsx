import { QuickActions } from "../QuickActions";

export default function QuickActionsExample() {
  const actions = [
    {
      id: 1,
      title: "ERP Login",
      icon: "login" as const,
      description: "Access student portal and academic resources",
    },
    {
      id: 2,
      title: "Fee Payment",
      icon: "payment" as const,
      description: "Pay school fees securely online",
    },
    {
      id: 3,
      title: "Download Prospectus",
      icon: "download" as const,
      description: "Get detailed information about our programs",
    },
    {
      id: 4,
      title: "Career Opportunities",
      icon: "careers" as const,
      description: "Join our team of dedicated educators",
    },
  ];

  return <QuickActions actions={actions} />;
}
