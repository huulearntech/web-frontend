import { Avatar, List, Image, Space } from 'antd';
import { LikeOutlined, DislikeOutlined} from '@ant-design/icons';

const Feedbacks = ({ feedbacks, hotelName }) => {
	return (
		<div id='feedbacks'>
			<List
				grid={{ gutter: 16, column: 1 }}
				header={<h1 className="text-xl font-bold mb-4">Những review khác của du khách về {hotelName}</h1>}
				dataSource={feedbacks}
				renderItem={feedback => (
					<List.Item
						actions={[
							<LikeOutlined key="like" />,
						]}>
						<List.Item.Meta
							avatar={<Avatar src={feedback.avatar} />}
							title={feedback.author}
							description={<p className="text-base">{feedback.rating + ' - ' + feedback.date}</p>}
						/>
						<Space direction="vertical" style={{ width: '100%' }}>
						{feedback.content}
						<Image.PreviewGroup
							preview={{ toolbarRender: () => null }}
						>
							{feedback.images && feedback.images.map((image, index) => (
								<Image
									key={index}
									width={100}
									height={100}
									style={{ borderRadius: '8px', objectFit: 'cover' }}
									src={image}
								/>
							))}
						</Image.PreviewGroup>
						</Space>
					</List.Item>
				)}
			/>
		</div>
	)
}

export default Feedbacks;