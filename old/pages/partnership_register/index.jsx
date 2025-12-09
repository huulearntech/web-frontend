import React, { useState } from 'react';
import { Steps, Form, notification } from 'antd';
import PartnerEmailFormStep from './PartnerEmailFormStep';
import AccommodationFormStep from './AccommodationFormStep';
import LocationPicker from './LocationPicker';
import hotelServices from '../../services/hotelServices';

const PartnershipRegister = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  const handleEmailPasswordSubmit = (values) => {
    const { confirmPassword, ...filteredValues } = values;
    setFormData({ ...formData, ...filteredValues });
    setStep(2);
  };

  const handleAccommodationSubmit = async (values) => {
    const finalData = { ...formData, ...values };
    console.log('Received values of form: ', finalData);

    setLoading(true);
    try {
      await hotelServices.registerHotel(finalData);
      notification.success({
        message: 'Hotel registration successful',
        description: 'Your hotel has been registered successfully. We will review your information and get back to you soon.',
      });
    } catch (error) {
      console.error('Error registering hotel:', error);
      notification.error({
        message: 'Hotel registration failed',
        description: 'An error occurred while registering your hotel. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return <PartnerEmailFormStep form={form} onSubmit={handleEmailPasswordSubmit} formData={formData} />;
      case 2:
        return <AccommodationFormStep form={form} onSubmit={handleAccommodationSubmit} onBack={() => setStep(1)} formData={formData} />;
      default:
        return <PartnerEmailFormStep form={form} onSubmit={handleEmailPasswordSubmit} formData={formData} />;
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex w-full max-w-3xl items-center justify-center -translate-y-20 bg-white rounded-lg p-8 shadow-lg">
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