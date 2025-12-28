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
      <div className="flex flex-col py-3 sticky top-0 shadow-lg bg-white z-20">
        <SearchBar className="content" />
        <nav className="content">
          <ul className="flex space-x-3 font-bold text-sm">
            <li className="px-4 pt-4 data-[state=active]:ring-4 ring-primary" data-active ><a href="#">Tổng quan</a></li>
            <li className="px-4 pt-4"><a href="#">Phòng</a> </li>
            <li className="px-4 pt-4"><a href="#">Vị trí</a></li>
            <li className="px-4 pt-4"><a href="#">Tiện ích</a></li>
            <li className="px-4 pt-4"><a href="#">Chính sách</a></li>
            <li className="px-4 pt-4"><a href="#">Đánh giá</a></li>
          </ul>
        </nav>
      </div>
      <main className="flex flex-col gap-y-4 content my-4">
        {children}
      </main>
      <Footer />
    </>
  );
}