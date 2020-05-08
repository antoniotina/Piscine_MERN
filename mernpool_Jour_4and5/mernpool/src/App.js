import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'
import { Container } from 'reactstrap'
import IndexNavbar from './components/IndexNavbar'
import UserPosts from './components/posts/UserPosts'
import PostList from './components/posts/PostList'
import PostModal from './components/posts/PostModal'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {

    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Router>
                <Provider store={store}>
                    <IndexNavbar />
                    <Container>
                        <Route path="/:id" exact component={UserPosts} />
                        {/* <PostModal />
                        <PostList /> */}
                    </Container>
                </Provider>
            </Router>
        )
    }
}

export default App;