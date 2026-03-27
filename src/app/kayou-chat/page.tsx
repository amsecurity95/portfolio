import ProjectShowcase from "@/components/ProjectShowcase";

export default function KayouChatPage() {
  return (
    <ProjectShowcase
      name="Kayou Chat"
      tagline="Multi-Agent AI Platform"
      icon="/projects/kayou-chat.png"
      color="#4ade80"
      stack={["Node.js", "Socket.io", "Groq", "Anthropic"]}
      demoUrl="/demos/kayou-chat.html"
      features={[
        "9 specialized AI agents across Build, Security, and Research teams",
        "Brain-based persistent memory — agents remember across conversations",
        "Mentor learning system — Claude teaches Sonic automatically",
        "Real-time cooperation between agents via work channel dispatch",
        "@mention tagging for direct agent-to-agent communication",
        "External agent support — Kayou Code runs on Fly.io via OpenClaw",
        "Project tracking and filesystem access built in",
        "Socket.io real-time messaging with profile photo uploads",
      ]}
    />
  );
}
