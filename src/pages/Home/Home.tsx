import AnimatedSection from "../../components/Common/AnimatedSection";
import FeaturedProblemsSection from "../../components/Home/FeaturedProblemsSection";
import HeroSection from "../../components/Home/HeroSection";
import NewsletterSection from "../../components/Home/NewsletterSection";
import TestimonialsSection from "../../components/Home/TestimonialsSection";
import TopicsSection from "../../components/Home/TopicsSection";
import UpcomingContestsSection from "../../components/Home/UpcomingContestsSection";

const Home = () => {

  return (
    <div className="max-w-container flex flex-col gap-10 mx-auto p-4">
      <AnimatedSection delay={0.1}>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <TopicsSection />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <FeaturedProblemsSection />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <UpcomingContestsSection />
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <TestimonialsSection />
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <NewsletterSection />
      </AnimatedSection>
    </div>
  );
};

export default Home;
