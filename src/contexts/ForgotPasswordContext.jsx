import { useContext, useState, createContext } from "react";

const ForgotPasswordContext = createContext();

export const ForgotPasswordProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const token = localStorage.getItem('token');

  const submitForm = () => {
    setStep((prevStep) => (prevStep + 1) % 3);
  }

  return (
    <ForgotPasswordContext.Provider value={{ step, setStep, submitForm }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPasswordContext = () => {
  const context = useContext(ForgotPasswordContext);
  if (!context) {
    throw new Error("useForgotPasswordContext must be used within a ForgotPasswordProvider");
  }
  return context;
};