import luggage from '../../assets/icons/luggage.webp';
import checklist from '../../assets/icons/checklist.webp';
import shield from '../../assets/icons/shield.webp';

const WhyUsCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-row w-full items-center bg-white rounded-lg shadow-sm p-4 space-x-4">
      <img src={icon} alt={title} />
      <div className="flex flex-col">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

const WhyUs = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-100">
      <h1 className="text-2xl font-semibold">Lý do nên đặt chỗ với Traveloka?</h1>
      <div className="flex flex-row w-full justify-center space-x-10 mt-10">
        <WhyUsCard icon={luggage} title="Đáp ứng mọi nhu cầu của bạn" description="Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tin chọn sản phẩm hoàn chỉnh và Hướng Dẫn Du Lịch của chúng tôi." />
        <WhyUsCard icon={checklist} title="Tùy chọn đặt chỗ linh hoạt" description="Kế hoạch thay đổi bất ngờ? Đừng lo!Đổi lịch hoặc Hoàn tiền dễ dàng." />
        <WhyUsCard icon={shield} title="Thanh toán an toàn và thuận tiện" description="Tận hưởng nhiều cách thanh toán an toàn, bằng loại tiền thuận tiện nhất cho bạn." />
      </div>
    </div>
  );
};

export default WhyUs;