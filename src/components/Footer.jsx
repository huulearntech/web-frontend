import {
  tvlk_footer_logo, iata_logo, bst_logo, bct_logo, mastercard_logo,
  visa_logo, jcb_logo, amex_logo, vietqr_logo, momo_logo,
  techcombank_logo, vp_logo, vib_logo, vietcombank_logo, onepay_logo,
  mb_logo, hsbc_logo, sacombank_logo, acb_logo, tpbank_logo,
  vietinbank_logo, bidv_logo, citibank_logo, alepay_logo, facebook_icon,
  instagram_icon, tiktok_icon, youtube_icon, telegram_icon
} from '../assets/icons/iconUrl';
const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 flex flex-col items-center justify-center text-white">
      <div className="flex w-full max-w-7xl justify-between">
        <div className="flex flex-col space-y-4">
          {/* Website Logo */}
          <div>
            <img src={tvlk_footer_logo} alt="Traveloka Logo" />
            <ul className="inline-flex space-x-4">
              <li><img src={iata_logo} alt="IATA Logo" /></li>
              <li><img src={bst_logo} alt="BST Logo" /></li>
              <li><img src={bct_logo} alt="BCT Logo" /></li>
            </ul>
          </div>

          {/* Payment Partners */}
          <div>
            <h3 className="font-semibold mb-2">Đối tác thanh toán</h3>
            <ul className="grid grid-cols-4 gap-2">
              <li className="px-2 py-3 rounded-md bg-white"><img src={mastercard_logo} alt="MasterCard" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={visa_logo} alt="Visa" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={jcb_logo} alt="JCB" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={amex_logo} alt="American Express" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={vietqr_logo} alt="VietQR" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={momo_logo} alt="Momo" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={techcombank_logo} alt="Techcombank" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={vp_logo} alt="VP Bank" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={vib_logo} alt="VIB" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={vietcombank_logo} alt="Vietcombank" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={onepay_logo} alt="OnePay" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={mb_logo} alt="MB Bank" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={hsbc_logo} alt="HSBC" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={sacombank_logo} alt="Sacombank" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={acb_logo} alt="ACB" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={tpbank_logo} alt="TP Bank" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={vietinbank_logo} alt="VietinBank" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={bidv_logo} alt="BIDV" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={citibank_logo} alt="Citibank" /></li>
              <li className="px-2 py-3 rounded-md bg-white"><img src={alepay_logo} alt="Alepay" /></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col">
          {/* About Us Section */}
          <div className="mt-8">
            <h3 className="font-semibold mb-2 justify-between">Về Traveloka</h3>
            <ul className="flex flex-col space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="inline-flex gap-2">
                  <span>Cách đặt chỗ</span>
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex gap-2">
                  <span>Liên hệ chúng tôi</span>
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex gap-2">
                  <span>Trợ giúp</span>
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex gap-2">
                  <span>Tuyển dụng</span>
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex gap-2">
                  <span>Về chúng tôi</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Our productions */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2 justify-between">Sản phẩm</h3>
          <ul className="flex flex-col space-y-3 text-sm text-gray-300">
            <li>
              <a href="#" className="inline-flex gap-2">
                <span>Khách sạn</span>
              </a>
            </li>
            <li>
              <a href="#" className="inline-flex gap-2">
                <span>Vé máy bay</span>
              </a>
            </li>
            <li>
              <a href="#" className="inline-flex gap-2">
                <span>Vé xe khách</span>
              </a>
            </li>
            <li>
              <a href="#" className="inline-flex gap-2">
                <span>Đưa đón sân bay</span>
              </a>
            </li>
            <li>
              <a href="#" className="inline-flex gap-2">
                <span>Cho thuê xe</span>
              </a>
            </li>
            <li>
              <a href="#" className="inline-flex gap-2">
                <span>Hoạt động & vui chơi</span>
              </a>
            </li>
            <li>
              <a href="#" className="inline-flex gap-2">
                <span>Du thuyền</span>
              </a>
            </li>
            <li>
              <a href="#" className="inline-flex gap-2">
                <span>Biệt thự</span>
              </a>
            </li>
            <li>
              <a href="#" className="inline-flex gap-2">
                <span>Căn hộ</span>
              </a>
            </li>
          </ul>
        </div>
        
        {/* This section should be under the About Us section in the original site */}
        {/* Social Media Links */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2 justify-between">Theo dõi chúng tôi trên</h3>
          <div className="flex justify-between space-x-6">
            <ul className="flex flex-col space-y-3 text-sm text-gray-300">
              <li>
                <a href="https://www.facebook.com/TravelokaVN" className="inline-flex gap-2">
                  <img src={facebook_icon} alt="Facebook" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/traveloka.vn/" className="inline-flex gap-2">
                  <img src={instagram_icon} alt="Instagram" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@traveloka.vn" className="inline-flex gap-2">
                  <img src={tiktok_icon} alt="TikTok" />
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@travelokavn" className="inline-flex gap-2">
                  <img src={youtube_icon} alt="YouTube" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a href="https://t.me/travelokavietnamofficial" className="inline-flex gap-2">
                  <img src={telegram_icon} alt="Telegram" />
                  <span>Telegram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="w-full my-4 border-gray-500" />
      <div className="text-sm mb-4 text-center">
        <p>John Doe &copy; This is just a demo website. No rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;