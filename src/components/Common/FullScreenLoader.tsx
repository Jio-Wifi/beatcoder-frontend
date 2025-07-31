const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-primary/80 flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-success border-t-transparent"></div>
    </div>
  );
};

export default FullScreenLoader;
