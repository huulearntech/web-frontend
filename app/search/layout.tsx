import Header from "@/components/header"
import Footer from "@/components/footer"
import SearchBar from "@/components/search-bar";

export default function Layout ({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <>
      <Header className="static border-b border-2"/>
      <div className="py-3 sticky top-0 shadow-lg bg-white z-20">
        <SearchBar className="content" />
      </div>
      <main className="flex gap-x-6 content my-6">
        {children}
      </main>
      <Footer />
    </>
  );
}