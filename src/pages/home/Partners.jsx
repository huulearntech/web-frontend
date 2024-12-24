const Partners = ({ title, description, imageSrc }) => {
  return (
    <div className="flex flex-row w-full h-60 items-center justify-center bg-white rounded-lg shadow-lg space-x-12 p-4">
        <div className="w-full flex flex-col justify-start space-y-4">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      <img src={imageSrc} alt={title} className="w-full" />
    </div>
  );
}

export default Partners;