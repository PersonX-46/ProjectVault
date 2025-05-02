import Image from "next/image";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";
import MissionVision from "./components/VisionMision";

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <MissionVision />
      <Footer />
    </div>
  );
}
