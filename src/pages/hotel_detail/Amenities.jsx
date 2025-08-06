const Amenities = () => {
  return (
    <div id='amenities' className="grid grid-cols-3 gap-6">
      <div className="flex flex-col">
        <div className="inline-flex items-center mb-3">
          <img src="https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482303254515-bd78d369590cba427807f5b7b3df6022.png" alt="Food and Drink" className="size-6 mr-2" />
          <span className="font-semibold">Ẩm thực</span>
        </div>
        <ul className="list-disc pl-8 text-sm space-y-4">
          <li>Nhà hàng</li>
          <li>Quầy bar</li>
          <li>Phục vụ đồ ăn tại phòng</li>
        </ul>
      </div>

      <div className="flex flex-col">
        <div className="inline-flex items-center mb-3">
          <img src="https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/23/1482486478659-e5dc2da7d82c6e7f84df2d6da0cc611b.png" alt="Food and Drink" className="size-6 mr-2" />
          <span className="font-semibold">Dịch vụ khách sạn</span>
        </div>
        <ul className="list-disc pl-8 text-sm space-y-4">
          <li>Nhân viên xách hành lý</li>
          <li>Quầy lễ tân 24h</li>
          <li>Dịch vụ giặt ủi</li>
        </ul>
      </div>

      <div className="flex flex-col">
        <div className="inline-flex items-center mb-3">
          <img src="https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482303445040-27efd5874b7249a341778d5bb6c013f1.png" alt="Food and Drink" className="size-6 mr-2" />
          <span className="font-semibold">Các hoạt động</span>
        </div>
        <ul className="list-disc pl-8 text-sm space-y-4">
          <li>Khu vui chơi trẻ em</li>
          <li>Karaoke</li>
          <li>Dịch vụ spa</li>
        </ul>
      </div>

      <div className="flex flex-col">
        <div className="inline-flex items-center mb-3">
          <img src="https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482303125539-7b3d286227796ff15b7ea10423eed047.png" alt="Food and Drink" className="size-6 mr-2" />
          <span className="font-semibold">Tiện nghi công cộng</span>
        </div>
        <ul className="list-disc pl-8 text-sm space-y-4">
          <li>Bãi đậu xe</li>
          <li>Thang máy</li>
          <li>Phục vụ đồ ăn tại phòng</li>
        </ul>
      </div>

      <div className="flex flex-col">
        <div className="inline-flex items-center mb-3">
          <img src="https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482303267558-027736faae615602d02d68900e440901.png" alt="Food and Drink" className="size-6 mr-2" />
          <span className="font-semibold">Tiện nghi phòng</span>
        </div>
        <ul className="list-disc pl-8 text-sm space-y-4">
          <li>Bồn tắm</li>
          <li>Máy sấy tóc</li>
          <li>Tủ lạnh</li>
          <li>TV</li>
          <li>Lò vi sóng</li>
        </ul>
      </div>

      <div className="flex flex-col">
        <div className="inline-flex items-center mb-3">
          <img src="https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/23/1482486531890-cbaee7be1e0c71e690dba61a3ea68ae0.png" alt="Food and Drink" className="size-6 mr-2" />
          <span className="font-semibold">Tiện nghi chung</span>
        </div>
        <ul className="list-disc pl-8 text-sm space-y-4">
          <li>Phòng giữ đồ</li>
          <li>Phòng không hút thuốc</li>
          <li>Sân thượng/sân hiên</li>
        </ul>
      </div>

    </div>
  );
};

export default Amenities;