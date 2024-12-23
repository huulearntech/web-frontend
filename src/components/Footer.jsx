import React from 'react';
import {
  FaFacebookF as FacebookIcon,
  FaTwitter as TwitterIcon,
  FaInstagram as InstagramIcon
} from 'react-icons/fa';

import { ReactComponent as FooterLogo } from '../assets/icons/logo_footer.svg';
import BoCongThuong from '../assets/icons/bo_cong_thuong.webp';
import { ReactComponent as IATA } from '../assets/icons/iata.svg';
import Bsi from '../assets/icons/bsi.webp';

import Jcb from '../assets/icons/jcb.webp';
import Mastercard from '../assets/icons/mastercard.webp';
import Visa from '../assets/icons/visa.webp';
import VnPay from '../assets/icons/vnpay.png';
import MoMo from '../assets/icons/momo.webp';

const PaymentPartner = ({ src, alt }) => (
  <li className="flex w-16 h-10 rounded-md bg-white items-center justify-center">
    <img src={src} alt={alt} className="object-cover object-center" />
  </li>
);

const Footer = ({ className }) => {
  return (
    <footer className={className}>
      <div className="flex flex-col bg-gray-800 text-white py-8 items-center justify-center">
        <div className="flex flex-row w-full max-w-7xl items-end justify-between space-x-10">
          {/* Website Logo */}
          <div>
            <FooterLogo className="h-20" />

            <ul className="inline-flex space-x-4">
              <li>
                <img src={BoCongThuong} alt="Bo Cong Thuong" />
              </li>
              <li>
                <IATA />
              </li>
              <li>
                <img src={Bsi} alt="BSI" />
              </li>
            </ul>
          </div>

          {/* Payment Partners */}
          <div>
            <h3 className="font-semibold mb-2">Đối tác thanh toán</h3>
            <ul className="list-none flex flex-row space-x-6">
              <PaymentPartner src={Jcb} alt="JCB" />
              <PaymentPartner src={Mastercard} alt="Mastercard" />
              <PaymentPartner src={Visa} alt="Visa" />
              <PaymentPartner src={VnPay} alt="VNPay" />
              <PaymentPartner src={MoMo} alt="MoMo" />
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="font-semibold mb-2 justify-between">Theo dõi chúng tôi trên</h3>
            <div className="flex justify-between space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                <FacebookIcon className="h-8 w-8 text-white hover:text-blue-600" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                <TwitterIcon className="h-8 w-8 text-white hover:text-cyan-400" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                <InstagramIcon className="h-8 w-8 text-white hover:text-pink-500" />
              </a>
            </div>
          </div>
        </div>
        <hr className="w-full my-4 border-gray-500" />
        <div className="text-sm">
          <p>&copy; Nhóm 24. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;