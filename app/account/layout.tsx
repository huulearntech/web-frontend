import Header from "@/components/header"
import Footer from "@/components/footer"
import AccountNavbar from "./navbar";
import { Metadata } from "next";

export default function Layout ({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="h-[calc(100vh-5rem)] flex">
        <AccountNavbar />
      {children}
      </div>
      <Footer />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Manage your account settings and preferences.',
}