import LandingPage from "../components/landingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/common/NavBar";
import AnimatedLayout from "../components/common/AnimatedLayout";
import Contact from "../components/contact/Contact";
import Projects from "../components/project/Projects";

const AllRoutes = () => (
  <AnimatedLayout>
    <Navbar />

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </AnimatedLayout>
);

export default AllRoutes;
