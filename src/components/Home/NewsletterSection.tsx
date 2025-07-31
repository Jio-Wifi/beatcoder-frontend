import AnimatedCard from "../Common/AnimatedCard";
import CustomHeading from "../Custom/CustomHeading";

const NewsletterSection = () => {
  return (
    <section className="py-12 px-4 bg-gray-100 dark:bg-primary transition-colors duration-300">
      <div className="max-w-3xl mx-auto text-center">
        <CustomHeading>Stay Updated!</CustomHeading>
        <p className="mt-4 text-primary dark:text-dime text-lg">
          Subscribe to our newsletter for latest DSA problems, contests, and updates.
        </p>

        <AnimatedCard className="mt-8 bg-white dark:bg-dark p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed! (form integration pending)");
            }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full sm:flex-1 px-4 py-2 rounded-md border border-dime dark:border-primary bg-transparent text-primary dark:text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-accent text-white font-semibold hover:brightness-90 transition"
            >
              Subscribe
            </button>
          </form>
        </AnimatedCard>
      </div>
    </section>
  );
};

export default NewsletterSection;
