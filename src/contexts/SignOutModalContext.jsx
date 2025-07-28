import { useContext, useState, createContext } from "react";

const SignOutModalContext = createContext();

export const SignOutModalProvider = ({ children }) => {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const openSignOutModal = () => setIsSignOutModalOpen(true);
  const closeSignOutModal = () => setIsSignOutModalOpen(false);

  return (
    <SignOutModalContext.Provider value={{ isSignOutModalOpen, openSignOutModal, closeSignOutModal }}>
      {children}
    </SignOutModalContext.Provider>
  );
};

export const useSignOutModal = () => {
  const context = useContext(SignOutModalContext);
  if (!context) {
    throw new Error("useSignOutModal must be used within a SignOutProvider");
  }
  return context;
};