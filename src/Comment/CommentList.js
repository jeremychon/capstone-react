import React from 'react'
import { Comment } from 'semantic-ui-react'

const CommentList = (props) => {
	
	const allComments = props.comments.map((comm) => {
		return (
			<Comment key={comm._id}>
				<Comment.Content>
					<Comment.Text>{comm.comment}</Comment.Text>
				</Comment.Content>
			</Comment>
		)
	})
	
	return (
		<div style={{margin: '10% 0 20% 0'}}>{allComments}</div>
	)
}


export default CommentList