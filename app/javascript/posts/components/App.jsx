import React, {Component} from 'react'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './../../../assets/stylesheets/app.scss';
import PostForm from './PostForm.jsx'
import PostShow from './Post.jsx'

const preventDefault = event => event.preventDefault()

const Post = ({ post, onDelete }) => {
  return <tr>
  <td>{post.title}</td>
  <td>{post.body}</td>
  <td>{post.published}</td>
  <td><Link to={`/posts/${post.id}`} className="text-success">Show</Link></td>
  <td><Link to={`/posts/edit/${post.id}`} className="text-primary">Edit</Link></td>
  <td><a onMouseDown={preventDefault} onClick={() => {
    onDelete(post)
  }} className="text-error">Destroy</a></td>
  </tr>
}

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }


  componentDidMount() {
    axios.get('/api/v1/posts.json')
    .then((response) => {
      this.setState({posts: response.data})
    })
    .catch((error) => {
      console.log(error);
    });

  }

  render() {
    const posts = this.state.posts.map(post => {
      return(<Post post={post} key={post.id} onDelete={() => this.props.onDelete(post)} />)
    });

    return (
      <table className="index-table">
      <thead>
      <tr>
      <th>Title</th>
      <th>Body</th>
      <th>Published</th>
      <th colSpan="3"></th>
      </tr>
      </thead>

      <tbody>
      {posts}
      <div>
      <p><Link to={`/posts/create`} className="text-success">Click here to add a new post!</Link></p>
      </div>
      </tbody>
      </table>
      )
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletePost: null,
      reloadKey: 1
    };

    this.deletePost = this.deletePost.bind(this)
    this.doDeletePost = this.doDeletePost.bind(this)
  }

  deletePost(post) {
    this.setState({
      deletePost: post
    })
    // todo implement
  }

  doDeletePost(post) {
    axios.delete(`/api/v1/posts/${post.id}.json`).then(() => {
      this.setState({
        reloadKey: this.state.reloadKey + 1
      })
    })
  }

  renderDeleteDialog() {
    if (!this.state.deletePost) {
      return null
    }

    return <div style={{
      position: 'absolute',
      margin: 'auto',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 200,
      height: 200,
      background: 'white',
      padding: 20,
      border: '1px solid gray',
      borderRadius: 4,
      overflow: 'auto'
    }}>
    Are you sure you want to delete post {this.state.deletePost.title}?
    <button onClick={() => {
      this.doDeletePost(this.state.deletePost)
      this.setState({
        deletePost: null
      })
    }}> yes
    </button>
    <button onClick={() => {
      this.setState({
        deletePost: null
      })
    }}> no
    </button>
    </div>
  }

  render() {
    return (
      <Router>
      <div>
      {this.renderDeleteDialog()}
      <Route exact path="/posts/create" render={() => <PostForm create={true} />} />
      <Route exact path="/posts/edit/:id" render={() => <PostForm />} />
      <Route exact path="/posts/:id" render={() => <PostShow onDelete={this.deletePost}/>} />
      <Route exact path="/" render={() => <PostList key={this.state.reloadKey} onDelete={this.deletePost} />} />
      </div>
      </Router>
      )
  }
}


export default App;
