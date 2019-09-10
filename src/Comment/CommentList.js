import React from 'react'
import { Comment } from 'semantic-ui-react'

const CommentList = (props) => {
	
	const allComments = props.comments.map((comm) => {
		return (
			<Comment key={comm._id}>
				<Comment.Content>
					<Comment.Author>{comm.user.firstName} {comm.user.lastName}</Comment.Author>
					<Comment.Text>{comm.comment}</Comment.Text>
				</Comment.Content>
			</Comment>
		)
	})
	
	return (
		<div>{allComments}</div>
	)
}


export default CommentList