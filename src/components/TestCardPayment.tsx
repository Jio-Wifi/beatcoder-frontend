
const TestCard = () => {
  const testCard = {
    number: "5267 3181 8797 5449",
    expiry: "12/25",
    cvv: "123",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white border rounded-lg shadow space-y-3">
      <h2 className="text-lg font-bold text-center text-gray-800">
        Test Card Details
      </h2>

      <div className="flex justify-between items-center border p-2 rounded">
        <span>{testCard.number}</span>
        <button
          onClick={() => copyToClipboard(testCard.number)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Copy
        </button>
      </div>

      <div className="flex justify-between items-center border p-2 rounded">
        <span>Expiry: {testCard.expiry}</span>
        <button
          onClick={() => copyToClipboard(testCard.expiry)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Copy
        </button>
      </div>

      <div className="flex justify-between items-center border p-2 rounded">
        <span>CVV: {testCard.cvv}</span>
        <button
          onClick={() => copyToClipboard(testCard.cvv)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default TestCard;
