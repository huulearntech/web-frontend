import Header from "@/components/header"
import Footer from "@/components/footer"
import SearchBar from "@/components/search-bar";
import Navbar from "./navbar";

export default function Layout ({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <>
      <Header className="static border-b border-2"/>
      <div className="flex flex-col py-3 sticky top-0 shadow-lg bg-white z-20 gap-y-4">
        <SearchBar className="content" />
        <Navbar />
      </div>
      <main className="flex flex-col gap-y-4 content my-4">
        {children}
      </main>
      <Footer />
    </>
  );
}