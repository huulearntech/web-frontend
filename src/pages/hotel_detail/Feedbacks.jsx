import { Card } from 'antd';

const FeedbackCard = ({ feedback }) => {
	const { author, date, content } = feedback;


	return (
		<Card className="feedback-card mb-4">
			<div className="feedback-card__header flex justify-between items-center">
				<h3 className="text-lg font-semibold">{author}</h3>
				<span className="text-sm text-gray-500">{date}</span>
			</div>
			<div className="feedback-card__content mt-2">
				<p className="text-base">{content}</p>
			</div>
		</Card>
	)
};

const Feedbacks = ({ feedbacks }) => {

	return (
		<div>
			<h1>Feedbacks</h1>
			<ddiv></ddiv>

			<ul>
				{feedbacks.map((feedback) => (
					<li key={feedback.id}>
						<FeedbackCard feedback={feedback} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default Feedbacks;