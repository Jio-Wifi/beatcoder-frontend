import ArchitectureLayers from "./ArchitectureLayers";
import BackendWorkflowSection from "./BackendWorkflowSection";
import DatabaseDesignSection from "./DatabaseDesignSection";
import IntroductionSection from "./IntroductionSection";
import KeyFeatures from "./KeyFeatures";
import TechnologyStack from "./TechnologyStack";
import UIUXSection from "./UIUXSection";

const Breif = () => {
  return (
    <div className="prose max-w-6xl px-4 py-10 mx-auto dark:prose-invert">
      {/* // Introduction Section  */}
      <IntroductionSection />

      {/* // Architecture Layers  */}
      <ArchitectureLayers />

      {/* // Technology Stack  */}
      <TechnologyStack />

      {/* // Key Features Section */}
      <KeyFeatures />

      {/* // UI & UX Section  */}

      <UIUXSection />

      {/* // Backend Workflow */}

      <BackendWorkflowSection />

      {/* // Database Design  */}
      <DatabaseDesignSection />
    </div>
  );
};

export default Breif;
