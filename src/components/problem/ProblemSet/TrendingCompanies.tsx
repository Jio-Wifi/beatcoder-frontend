const TrendingCompanies = () => (
  <div className="bg-white dark:bg-primary p-4 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold mb-2">🔥 Trending Companies</h3>
    <ul className="space-y-2">
      {["Google", "Amazon", "Meta", "Netflix"].map((company) => (
        <li key={company} className="text-accent font-medium">{company}</li>
      ))}
    </ul>
  </div>
);

export default TrendingCompanies;
