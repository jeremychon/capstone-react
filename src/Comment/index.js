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
		console.log("componentDidMount in Comments -- getComments about to be called");
		this.getComments()
	}

	getComments = async () => {
		console.log("here's this.props.plan in getComments in Comments")
		console.log(this.props.plan._id);
		try {
			const url = 'http://localhost:9000/comment/' + this.props.plan._id
			console.log("we're gonna fetch to this URL in getComments in Comments");
			const foundComments = await fetch(url, {
				method: 'GET',
				credentials: 'include'
			})

			if (foundComments.status !== 200) {
				throw Error('foundComments is not running')
			}

			const foundCommentsRes = await foundComments.json()
			console.log("here's the comments we got in getComments in Comment.js");
			console.log(foundCommentsRes);
			this.setState({comments: foundCommentsRes.data})

		} catch (err) {
			console.log(err);
		}
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

			this.setState({comment: [...this.state.comments, addedCommentRes.data]})

		} catch (err) {
			console.log(err);
		}
	}

	render() {
		console.log("here's this.props.plan in render() in Comment -- should contain ID");
		console.log(this.props.plan);
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