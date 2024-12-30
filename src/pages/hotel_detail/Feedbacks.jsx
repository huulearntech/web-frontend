import { Card } from 'antd';

const FeedbackCard = ({ feedback }) => {
	const { author, date, content } = feedback;

	return (
		<Card className="w-full mb-4">
			<div className="w-full flex justify-between items-center">
				<h3 className="text-lg font-semibold">{author}</h3>
				<span className="text-sm text-gray-500">{date}</span>
			</div>
			<div className="w-full mt-2">
				<p className="text-base">{content}</p>
			</div>
		</Card>
	)
};

const Feedbacks = ({ feedbacks, hotelName }) => {
	return (
		<div className="w-full rounded-lg shadow-lg bg-white p-4">
			<h1 className="text-xl font-bold mb-4">Những review khác của du khách về  {hotelName}</h1>
			<ul className="w-full">
				{feedbacks.map((feedback) => (
					<li key={feedback.id} className='w-full'>
						<FeedbackCard feedback={feedback} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default Feedbacks;