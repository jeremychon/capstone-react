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
		this.getComments()
	}

	getComments = async () => {
		try {
			const url = process.env.REACT_APP_BACKEND_URL + '/comment/' + this.props.plan._id
			const foundComments = await fetch(url, {
				method: 'GET',
				credentials: 'include'
			})

			if (foundComments.status !== 200) {
				throw Error('foundComments is not running')
			}

			const foundCommentsRes = await foundComments.json()
			
			this.setState({comments: foundCommentsRes.data})

		} catch (err) {
			console.log(err);
		}
	}

	addComment = async (comment) => {
		try {
			const addedComment = await fetch(process.env.REACT_APP_BACKEND_URL + '/comment/' + this.props.plan._id, {
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

			this.setState({comment: [...this.state.comments, addedCommentRes.data]})

		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<Comment.Group className='commentSection'>
				<Header as='h3' dividing>Comments</Header>
				<CreateComment addComment={this.addComment} /> 
				<CommentList comments={this.state.comments} />
			</Comment.Group>
		)
	}
}



export default Comments