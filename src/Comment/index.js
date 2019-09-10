import React from 'react'
import CommentList from './CommentList'
import CreateComment from './CreateComment'
import { Comment, Header } from 'semantic-ui-react'

class Comments extends React.Component {
	constructor() {
		super()

		this.state = {
			comments: []
		}
	}

	componentDidMount() {
		
	}

	addComment = async (comment) => {
		try {
			const addedComment = await fetch('http://localhost:9000/comment/' + this.props.plan._id, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(comment),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (addedComment.status !== 200) {
				throw Error('addedComment is not running')
			}

			const addedCommentRes = await addedComment.json()
			console.log(addedCommentRes, '<---- addedCommentRes');

			this.setState({
				comments: [...this.state.comments, addedCommentRes.data]
			})
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		console.log(this.props, '<----- props in comments');
		console.log(this.state, '<---- state in comments');
		return (
			<Comment.Group className='commentSection'>
				<Header as='h3' dividing>Comments</Header>
				<CreateComment addComment={this.addComment}/> 
				<CommentList comments={this.state.comments}/>
			</Comment.Group>
		)
	}
}



export default Comments