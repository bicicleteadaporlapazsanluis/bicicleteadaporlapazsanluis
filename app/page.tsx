import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { RouteSection } from "@/components/route-section"
import { GallerySection } from "@/components/gallery-section"
import { RaffleSection } from "@/components/raffle-section"
import { RegistrationSection } from "@/components/registration-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ImageSlider } from "@/components/image-slider"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section id="inicio">
          <HeroSection />
        </section>
        <section id="acerca">
          <AboutSection />
        </section>
        <section id="recorrido">
          <RouteSection />
        </section>
        <section id="galeria">
          <ImageSlider />
        </section>
        <section id="sorteo">
          <RaffleSection />
        </section>
        <section id="inscripcion">
          <RegistrationSection />
        </section>
        <SponsorsSection />
        <Footer />
      </main>
    </>
  )
}
