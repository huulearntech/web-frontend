const Partners = ({ title, description, }) => {
  return (
    <div className="flex flex-row w-full items-center justify-center space-x-6">
      <div className="flex flex-col items-center justify-start space-y-4">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default Partners;