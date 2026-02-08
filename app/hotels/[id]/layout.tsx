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
        <nav className="content">
          <ul className="flex gap-x-6 lg:gap-x-10 font-bold text-sm">
            <li><a href="#overview" className=" data-[state=active]:bg-blue-500 " data-active>Tổng quan</a></li>
            <li><a href="#available-rooms">Phòng</a> </li>
            <li><a href="#location">Vị trí</a></li>
            <li><a href="#facilities">Tiện ích</a></li>
            <li><a href="#policy">Chính sách</a></li>
            <li><a href="#review">Đánh giá</a></li>
          </ul>
        </nav>
        {/* <Navbar /> */}
      </div>
      <main className="flex flex-col gap-y-4 content my-4">
        {children}
      </main>
      <Footer />
    </>
  );
}