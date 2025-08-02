
const shimmer = "animate-pulse bg-gray-300 dark:bg-gray-700";

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar Skeleton */}
       <div className="max-w-container hidden md:flex mx-auto text-base items-center justify-between py-2">
      {/* Logo Placeholder */}
      <div className={`${shimmer} h-8 w-24 rounded`}></div>

      {/* Nav Links */}
      <ul className="flex space-x-7 items-center">
        {/* Explore Dropdown Button */}
        <li>
          <div className={`${shimmer} h-8 w-28 rounded-md`}></div>
        </li>
        {/* Other nav links placeholders */}
        {Array.from({ length: 3 }).map((_, idx) => (
          <li key={idx}>
            <div className={`${shimmer} h-6 w-20 rounded`}></div>
          </li>
        ))}
      </ul>

      {/* Theme + Auth Buttons */}
      <div className="flex space-x-6 items-center">
        <div className={`${shimmer} h-6 w-6 rounded-full`}></div>
        <div className={`${shimmer} h-8 w-20 rounded-md`}></div>
      </div>
    </div>

      {/* Hero Section Skeleton */}
     <section className="w-full px-4 py-12 dark:bg-dark text-dark dark:text-light transition-all duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section Skeleton */}
        <div className="text-center md:text-left space-y-6 order-2 md:order-1">
          <div className={`${shimmer} h-10 w-2/3 mx-auto md:mx-0 rounded`}></div>
          <div className={`${shimmer} h-4 w-3/4 mx-auto md:mx-0 rounded`}></div>
          <div className={`${shimmer} h-4 w-2/3 mx-auto md:mx-0 rounded`}></div>

          <div className="flex justify-center md:justify-start gap-4 flex-wrap mt-4">
            <div className={`${shimmer} h-10 w-32 rounded-lg`}></div>
            <div className={`${shimmer} h-10 w-28 rounded-lg`}></div>
          </div>
        </div>

        {/* Right Section Skeleton - Torch Grid */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <div className="w-[300px] h-[300px] bg-white dark:bg-primary grid grid-cols-3 gap-2 p-2 rounded-lg shadow">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`${shimmer} w-full h-20 rounded-md`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* Topic Secton */}
     <section className="py-4 md:py-12 mt-14 px-6 hover:bg-white hover:dark:bg-primary transition-all">
      <div className="w-full md:max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
        {/* Left Heading Placeholder */}
        <div className="md:w-1/3 space-y-4">
          <div className={`${shimmer} h-8 w-1/2 rounded`}></div>
          <div className={`${shimmer} h-4 w-3/4 rounded`}></div>
          <div className={`${shimmer} h-4 w-2/3 rounded`}></div>
        </div>

        {/* Scrollable Right Section */}
        <div className="md:w-2/3 h-[500px] overflow-y-auto p-2 custom-scroll">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 15 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-primary p-4 rounded-lg shadow flex flex-col items-center justify-center space-y-3"
              >
                <div className={`${shimmer} w-10 h-10 rounded-full`}></div>
                <div className={`${shimmer} h-4 w-24 rounded`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* // Featured section  */}
      <section className="py-12 transition-colors duration-300">
      {/* Section Heading */}
      <div className="max-w-5xl mx-auto px-4">
        <div className={`${shimmer} h-8 w-48 mb-6 rounded`}></div>
      </div>

      {/* Skeleton Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-primary p-4 rounded-lg shadow-md space-y-4"
          >
            <div className={`${shimmer} h-6 w-3/4 rounded`}></div>
            <div className={`${shimmer} h-4 w-20 rounded`}></div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default PageSkeleton;
