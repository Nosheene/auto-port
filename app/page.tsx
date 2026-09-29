import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";

export default function Home() {
  return (
    <>
      <a
        href="#contenu"
        data-testid="skip-to-content"
        className="absolute -left-[999px] top-4 z-50 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground focus:left-4"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" className="flex-1">
        <Hero />
        <Stack />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
