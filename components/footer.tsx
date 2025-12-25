import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import * as logos from '@/public/logos';

export default function Footer () {
  return (
    <footer className="w-full bg-gray-800 flex flex-col justify-center items-center text-white">
      <div className="flex flex-col lg:flex-row content justify-between pt-14 pb-4">
        <div className="flex flex-col space-y-4 lg:w-[35%]">
          {/* Website Logo */}
          <div>
            <Image src={logos.tvlk_logo_text_light} alt="Traveloka Logo" loading="lazy" />
            <ul className="inline-flex space-x-4">
              <li><Image src={logos.iata} alt="IATA Logo" loading="lazy" /> </li>
              <li><Image src={logos.bst} alt="BST Logo" loading="lazy" /></li>
              <li><Image src={logos.bct} alt="BCT Logo" loading="lazy" /></li>
            </ul>
          </div>

          {/* Payment Partners */}
          <div>
            <h3 className="font-semibold mb-2">Đối tác thanh toán</h3>
            <ul className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-4 gap-2">
              <LiPaymentPartner logoSrc={logos.mastercard}/>
              <LiPaymentPartner logoSrc={logos.visa}/>
              <LiPaymentPartner logoSrc={logos.jcb}/>
              <LiPaymentPartner logoSrc={logos.amex}/>
              <LiPaymentPartner logoSrc={logos.vietqr}/>
              <LiPaymentPartner logoSrc={logos.momo}/>
              <LiPaymentPartner logoSrc={logos.techcombank}/>
              <LiPaymentPartner logoSrc={logos.vp}/>
              <LiPaymentPartner logoSrc={logos.vib}/>
              <LiPaymentPartner logoSrc={logos.vietcombank}/>
              <LiPaymentPartner logoSrc={logos.onepay}/>
              <LiPaymentPartner logoSrc={logos.mb}/>
              <LiPaymentPartner logoSrc={logos.hsbc}/>
              <LiPaymentPartner logoSrc={logos.sacombank}/>
              <LiPaymentPartner logoSrc={logos.acb}/>
              <LiPaymentPartner logoSrc={logos.tpbank}/>
              <LiPaymentPartner logoSrc={logos.vietinbank}/>
              <LiPaymentPartner logoSrc={logos.bidv}/>
              <LiPaymentPartner logoSrc={logos.citibank}/>
              <LiPaymentPartner logoSrc={logos.alepay}/>
            </ul>
          </div>
        </div>

        {/* About Us Section */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2 justify-between">Về Traveloka</h3>
          <ul className="grid grid-cols-5 gap-2 lg:flex lg:flex-col lg:space-y-3 text-sm text-gray-300">
            <LiLink text={"Cách đặt chỗ"} />
            <LiLink text={"Liên hệ chúng tôi"} />
            <LiLink text={"Trợ giúp"} />
            <LiLink text={"Tuyển dụng"} />
            <LiLink text={"Về chúng tôi"} />
          </ul>
        </div>

        {/* Our productions */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2 justify-between">Sản phẩm</h3>
          <ul className="grid grid-cols-5 gap-2 lg:flex lg:flex-col lg:space-y-3 text-sm text-gray-300">
            <LiLink text={"Khách sạn"}/>
            <LiLink text={"Vé máy bay"}/>
            <LiLink text={"Vé xe khách"}/>
            <LiLink text={"Đưa đón sân bay"}/>
            <LiLink text={"Cho thuê xe"}/>
            <LiLink text={"Hoạt động & vui chơi"}/>
            <LiLink text={"Du thuyền"}/>
            <LiLink text={"Biệt thự"}/>
            <LiLink text={"Căn hộ"}/>
          </ul>
        </div>
        
        {/* This section should be under the About Us section in the original site */}
        {/* Social Media Links */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2 justify-between">Theo dõi chúng tôi trên</h3>
            <ul className="grid grid-cols-5 gap-2 lg:flex lg:flex-col lg:space-y-3 text-sm text-gray-300">
              <LiLink text='Facebook' logoSrc={logos.facebook} />
              <LiLink text='Instagram' logoSrc={logos.instagram} />
              <LiLink text='Tiktok' logoSrc={logos.tiktok} />
              <LiLink text='Youtube' logoSrc={logos.youtube} />
              <LiLink text='Telegram' logoSrc={logos.telegram} />
            </ul>
        </div>
      </div>
      <hr className="w-full my-4 border-gray-500" />
      <div className="text-sm mb-4 text-center">
        <p>Demo website made by Huu Trinh 2025</p>
      </div>
    </footer>
  );
};

function LiPaymentPartner({ logoSrc }: { logoSrc: StaticImageData }) {
  return (
    <li className="px-4 py-3 flex items-center justify-center rounded-md bg-white" >
      <Image src={logoSrc} alt="" loading="lazy" />
    </li>
  )
}

function LiLink({ text, logoSrc }: { text: string, logoSrc?: StaticImageData }) {
  return (
    <li className="inline-flex space-x-2">
      { logoSrc && <Image src={logoSrc} alt="" loading="lazy" /> }
      <Link href="#" className="hover:underline"> {text} </Link>
    </li>
  )
}