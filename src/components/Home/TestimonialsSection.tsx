import AnimatedCard from "../Common/AnimatedCard";
import CustomHeading from "../Custom/CustomHeading";
import CustomTitle from "../Custom/CustomTitle";

const testimonials = [
  {
    name: "Sonu Gupta",
    feedback:
      "This platform truly transformed my coding journey. The daily challenges kept me consistent, and the explanations were top-notch!",
    title: "Software Engineer @ Microsoft",
  },
  {
    name: "Pranay Gupta",
    feedback:
      "I cracked FAANG thanks to the structured problems and timely mock contests. Highly recommended for all DSA aspirants!",
    title: "SWE Intern @ Google",
  },
  {
    name: "Rohit Negi",
    feedback:
      "From beginner to confident coder – this site has it all. Clean UI, quality content, and a great community!",
    title: "Full Stack Developer @ Zomato",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 px-4   transition-colors duration-300">
      <CustomHeading>What Our Users Say</CustomHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
        {testimonials.map((testimonial) => (
          <AnimatedCard
            key={testimonial.name}
            className="bg-white dark:bg-primary text-dark dark:text-dime p-6"
          >
            <p className="italic mb-4 text-secondary dark:text-accent">
              “{testimonial.feedback}”
            </p>
            <CustomTitle>{testimonial.name}</CustomTitle>
            <p className="text-sm text-secondary dark:text-secondary font-medium mt-1">
              {testimonial.title}
            </p>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
