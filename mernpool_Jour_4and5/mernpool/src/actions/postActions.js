import { GET_POSTS, UPDATE_POST, ADD_POST, DELETE_POST, POSTS_LOADING } from './types'
import axios from 'axios'

// get all posts
export const getPosts = () => dispatch => {
    dispatch(setPostsLoading())
    axios.get('http://127.0.0.1:8000/api/posts')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
}

// get all user posts
export const getUserPosts = id => dispatch => {
    dispatch(setPostsLoading())
    // headers 
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //request info
    const body = JSON.stringify({ id })

    axios.post('http://127.0.0.1:8000/api/posts/user', body, config)
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            }))
}

export const addPost = ({ title, date, content, creator }) => dispatch => {
    dispatch(setPostsLoading())
    // headers 
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //request info
    const body = JSON.stringify({ title, date, content, creator })

    axios.post('http://127.0.0.1:8000/api/posts/', body, config)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload: res.data
            }))
}

// no need to have = (title) => because there's only one
export const deletePost = id => dispatch => {
    axios.delete(`http://127.0.0.1:8000/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: id
            }))
}

export const setPostsLoading = () => {
    return {
        // just sets it from false to true
        type: POSTS_LOADING
    }
}