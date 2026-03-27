import ProjectShowcase from "@/components/ProjectShowcase";

export default function AkiliMoneyPage() {
  return (
    <ProjectShowcase
      name="Akili Money"
      tagline="USD-to-DRC Remittance Platform"
      icon="/projects/akili-money.png"
      color="#00b974"
      stack={["React Native", "Node.js", "PostgreSQL", "Thunes"]}
      demoUrl="/demos/akili-money.html"
      features={[
        "Cross-border money transfers from USD to Congolese Franc",
        "Multiple payout methods — Airtel Money, M-Pesa, bank transfer",
        "Real-time exchange rate quotes with transparent fee breakdown",
        "KYC identity verification built into the flow",
        "Transaction history with status tracking",
        "Cash App-inspired mobile-first design",
        "Thunes payment processor integration for global payouts",
        "Device sync — access your account across multiple devices",
      ]}
    />
  );
}
