import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { getSinglePost, deletePost } from '../../actions/postActions'
import { addComment, getPostComments, deleteComment } from '../../actions/commentActions'
import PropTypes from 'prop-types'

class PostDetail extends Component {

    state = {
        isOpen: false,
        content: '',
        date: '',
        creator: '',
        post: ''
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    componentDidMount() {
        let id = window.location.href.split('/')
        id = id[id.length - 1]
        this.props.getSinglePost(id)
        this.props.getPostComments(id)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { user, isAuthenticated } = this.props.auth


        let id = window.location.href.split('/')
        id = id[id.length - 1]

        const newComment = {
            post: id,
            date: Date.now(),
            content: this.state.content,
            creator: user._id
        }

        // Add post via addPost action
        this.props.addComment(newComment)

        window.location.reload(false)
    }

    onDeletePostClick = _id => {
        this.props.deletePost(_id)
        window.location.reload(false)
    }

    onDeleteClick = _id => {
        this.props.deleteComment(_id)
        window.location.reload(false)
    }

    render() {
        const { posts } = this.props.post
        const { comments } = this.props.comment

        const { user, isAuthenticated } = this.props.auth

        let id = window.location.href.split('/')
        id = id[id.length - 2]

        return (
            <Container>
                {posts ?
                    <ListGroup className="pt-4">
                        <ListGroupItem key={posts._id}>
                            {isAuthenticated ?
                                id === user._id ?
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeletePostClick.bind(this, posts._id)}
                                    >
                                        &times;
                                </Button> : null
                                : null}
                            <h1>
                                {posts.title}
                            </h1>
                            <p>
                                {posts.content}
                            </p>
                            <small>
                                {posts.date}
                            </small>
                        </ListGroupItem>
                        {isAuthenticated ?
                            <Form onSubmit={this.onSubmit} className="card ml-2 pr-4 mr-2 pl-4">
                                <FormGroup className="mt-2 pt-2">
                                    <Label for="content">
                                        Add a comment
                                </Label>
                                    <Input
                                        className="m-2"
                                        type="textarea"
                                        name="content"
                                        id="content"
                                        placeholder="Add post content"
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                                <Button
                                    color="dark"
                                    className="mt-2 mb-2"
                                >
                                    Add
                            </Button>
                            </Form>
                            : null
                        }
                        <ListGroup className="pt-4">
                            {comments ? comments.map(({ content, date, creator, post, _id }) =>
                                <ListGroupItem key={_id}>
                                    {isAuthenticated ?
                                        posts.creator === user._id ?
                                            <Button
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={this.onDeleteClick.bind(this, _id)}
                                            >
                                                &times;
                                    </Button> : null
                                        : null}

                                    <p>
                                        {content}
                                    </p>
                                    <small>{date}</small>
                                </ListGroupItem>
                            ) : null}

                        </ListGroup>
                    </ListGroup>

                    : <h1>This post was deleted by the author</h1>}
            </Container>
        )
    }
}

PostDetail.propTypes = {
    post: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    //this post is the one in the index.js in the reducer folder
    post: state.post,
    comment: state.comment,
    auth: state.auth
})

// this connect is gonna take two things
// mapstatetoprops allows us to take our post state, in the reducer and then converts into a component property to be used in this component
export default connect(mapStateToProps, { getSinglePost, deletePost, deleteComment, addComment, getPostComments })(PostDetail)