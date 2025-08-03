const screenshots = [
  "https://res.cloudinary.com/dspo4cbpz/image/upload/v1754223058/Macbook-Air-localhost_2_naw3lu.png",
  "https://res.cloudinary.com/dspo4cbpz/image/upload/v1754223057/iPhone-13-PRO-localhost_nkxmcx.png",
  "https://res.cloudinary.com/dspo4cbpz/image/upload/v1754223056/iPad-Air-4-localhost_funltw.png",
  "https://res.cloudinary.com/dspo4cbpz/image/upload/v1754223057/Macbook-Air-localhost_ily1tx.png",
  "https://res.cloudinary.com/dspo4cbpz/image/upload/v1754223055/Macbook-Air-localhost_4_cmickg.png",
  "https://res.cloudinary.com/dspo4cbpz/image/upload/v1754223054/Macbook-Air-localhost_5_di3cu1.png",
  "https://res.cloudinary.com/dspo4cbpz/image/upload/v1754223054/Macbook-Air-localhost_1_gjezcp.png",
  "https://res.cloudinary.com/dspo4cbpz/image/upload/v1754223052/Macbook-Air-localhost_3_ykggiz.png",
];

const ImageShowcase = () => {
  return (
    <div className="bg-dime dark:bg-dark py-12 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-center text-primary dark:text-light mb-10">
        Platform UI Showcase
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {screenshots.map((url, index) => (
          <div
            key={index}
            className="bg-white/30 dark:bg-dark/50 backdrop-blur-md border border-dime dark:border-light rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={url}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-56 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageShowcase;
