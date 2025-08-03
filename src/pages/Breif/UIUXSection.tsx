import { FaSun, FaMoon, FaMobileAlt, FaPalette } from "react-icons/fa";
import AnimatedSection from "../../components/Common/AnimatedSection";

const UIUXSection = () => {
  return (
    <AnimatedSection delay={0.3}>
    <section className="bg-white dark:bg-primary mt-4 px-6 py-12 space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary dark:text-light mb-2">🎨 UI & UX</h2>
        <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          BeatCoder provides a delightful developer experience with a clean,
          responsive, and customizable interface. Whether you're coding in the
          day or night, the platform adapts to you.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {/* Light Mode */}
        <div className="bg-white dark:bg-dark p-6 rounded-xl shadow hover:shadow-md transition">
          <FaSun className="text-yellow-400 text-3xl mx-auto mb-3" />
          <h4 className="font-semibold text-lg text-secondary dark:text-success">Light Mode</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Bright, clean layout optimized for readability and focus during
            daytime sessions.
          </p>
        </div>

        {/* Dark Mode */}
        <div className="bg-white dark:bg-dark p-6 rounded-2xl shadow hover:shadow-md transition">
          <FaMoon className="text-gray-300 text-3xl mx-auto mb-3" />
          <h4 className="font-semibold text-lg text-secondary dark:text-success">Dark Mode</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            An eye-friendly dark theme perfect for coding marathons at night.
          </p>
        </div>

        {/* Responsive Layout */}
        <div className="bg-white dark:bg-dark p-6 rounded-xl shadow hover:shadow-md transition">
          <FaMobileAlt className="text-green-500 text-3xl mx-auto mb-3" />
          <h4 className="font-semibold text-lg text-secondary dark:text-success">Responsive Design</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Fully optimized for mobile, tablet, and desktop — learn anywhere.
          </p>
        </div>

        {/* Custom Theming */}
        <div className="bg-white dark:bg-dark p-6 rounded-xl shadow hover:shadow-md transition">
          <FaPalette className="text-pink-500 text-3xl mx-auto mb-3" />
          <h4 className="font-semibold text-lg text-secondary dark:text-success">Custom Styling</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Tailored with smooth animations and color modes that match your
            preferences.
          </p>
        </div>
      </div>
    </section>
    </AnimatedSection>
  );
};

export default UIUXSection;
