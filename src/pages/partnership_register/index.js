import React, { useState } from 'react';
import { Steps } from 'antd';
import PartnerEmailFormStep from './PartnerEmailFormStep';
import AccommodationFormStep from './AccommodationFormStep';



const PartnershipRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleEmailPasswordSubmit = (values) => {
    setFormData(values);
    setStep(2);
  };

  const handleAccommodationSubmit = (values) => {
    const finalData = { ...formData, ...values };
    console.log('Received values of form: ', finalData);
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return <PartnerEmailFormStep onSubmit={handleEmailPasswordSubmit} />;
      case 2:
        return <AccommodationFormStep onSubmit={handleAccommodationSubmit} onBack={() => setStep(1)}/>;
      default:
        return <PartnerEmailFormStep onSubmit={handleEmailPasswordSubmit} />;
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex w-full max-w-4xl items-center justify-center -translate-y-20 bg-white rounded-lg p-8 shadow-lg">
        <div className="absolute -top-20 w-full max-w-xl">
          <Steps current={step - 1} responsive={false}>
            <Steps.Step title="Email & Password" />
            <Steps.Step title="Accommodation Info" />
          </Steps>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default PartnershipRegister;