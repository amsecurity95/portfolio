import ProjectShowcase from "@/components/ProjectShowcase";

export default function TropicalMapPage() {
  return (
    <ProjectShowcase
      name="Tropical Map"
      tagline="Civic Infrastructure Mapping — iOS App Store"
      icon="/projects/tropical-map.png"
      color="#2d9f4f"
      stack={["React Native", "Express", "PostgreSQL", "Railway"]}
      demoUrl="/demos/tropical-map.html"
      features={[
        "Interactive map with real-time place data and points of interest",
        "Published on the iOS App Store with active users",
        "Real estate module with property listings and search",
        "Drone delivery service integration",
        "Security and camera surveillance module",
        "Business listings with admin approval workflow",
        "Inspector review and feedback system",
        "Multi-region support with French localization",
      ]}
    />
  );
}
