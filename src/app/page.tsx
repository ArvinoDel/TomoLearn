// app/page.tsx
import HeroSection from "./components/HeroSection";
// import Features from "@/components/Features";
// import CoursePreview from "@/components/CoursePreview";
// import Testimonials from "@/components/Testimonials";
import Footer from "./components/Footer";
import Home from "./contents/Home";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Home />
    </main>
  );
}
