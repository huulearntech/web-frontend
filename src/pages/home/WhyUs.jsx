import luggage from '../../assets/icons/luggage.webp';
import checklist from '../../assets/icons/checklist.webp';
import shield from '../../assets/icons/shield.webp';

const WhyUsCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-row w-full items-center bg-white rounded-lg shadow-sm p-4 space-x-4">
      <img src={icon} alt={title} />
      <div className="flex flex-col">
        <h2 className="font-bold">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

const WhyUs = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-100">
      <h1 className="text-2xl font-bold">Why Book With Us?</h1>
      <div className="flex flex-row w-full justify-center space-x-10 mt-10">
        <WhyUsCard icon={luggage} title="Convenience" description="Book your hotel room and flight in one place." />
        <WhyUsCard icon={checklist} title="Easy to Use" description="Simple and easy to use interface." />
        <WhyUsCard icon={shield} title="Secure" description="Your privacy is our top priority." />
      </div>
    </div>
  );
};

export default WhyUs;