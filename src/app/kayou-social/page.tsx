import ProjectShowcase from "@/components/ProjectShowcase";

export default function KayouSocialPage() {
  return (
    <ProjectShowcase
      name="Kayou Social"
      tagline="AI-Powered Social Media Management"
      icon="/projects/kayou-social.png"
      color="#E91E8C"
      stack={["Next.js", "Stripe", "Remotion", "Groq"]}
      demoUrl="/demos/kayou-social-dashboard.html"
      features={[
        "AI-powered post generation with multiple content styles",
        "Multi-platform publishing — Instagram, X, TikTok, LinkedIn",
        "Remotion-based programmatic video generation with 5 templates",
        "Smart scheduling with optimal posting time suggestions",
        "Real-time analytics dashboard with engagement tracking",
        "Stripe-integrated billing with subscription management",
        "AI agent team for content strategy and audience analysis",
        "Custom brand persona onboarding flow",
      ]}
    />
  );
}
