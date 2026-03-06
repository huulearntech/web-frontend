import Header from "@/components/header"
import Footer from "@/components/footer"
import SearchBar from "@/components/search-bar copy";

// TODO: default values for search bar based on search params, so that when the user goes back to the search page, they can see their previous search params in the search bar
export default function Layout ({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <>
      <Header className="static border-b border-2"/>
      <div className="py-3 sticky top-0 shadow-lg bg-white z-20 flex justify-center">
        <SearchBar className="content" />
      </div>
      <main className="flex gap-x-6 content my-6">
        {children}
      </main>
      <Footer />
    </>
  );
}