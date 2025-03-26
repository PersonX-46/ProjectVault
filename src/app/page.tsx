import Image from "next/image";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      <HeroSection />
      <AdminLogin />
      <Footer />
    </div>
  );
}
