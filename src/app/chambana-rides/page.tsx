import ProjectShowcase from "@/components/ProjectShowcase";

export default function ChambanaRidesPage() {
  return (
    <ProjectShowcase
      name="Chambana Rides"
      tagline="Community Rideshare Platform"
      icon="/projects/chambana-rides.png"
      color="#1E88E5"
      stack={["React", "Leaflet", "OSRM", "Node.js"]}
      demoUrl="/demos/chambana-rides.html"
      features={[
        "Real-time driver matching with route mapping via OSRM",
        "Full driver mode — toggle between rider and driver experience",
        "Interactive Leaflet maps with actual road routing",
        "Booking flow with pickup/dropoff, date, passengers, luggage",
        "Driver dashboard — online toggle, earnings, incoming ride requests",
        "Community feed with posts, comments, and group pages",
        "Flight tracker with live AirLabs API data",
        "Sound effects and animations for ride accept/decline flow",
      ]}
    />
  );
}
