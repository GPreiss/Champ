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
      <div className="container">
      <div className="banner">
      <h3 className="banner-title">Posts</h3>
      <img className="img-fit-contain banner-img"src="https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cf56dd62f7e28facff79eaf6e7a78df4&auto=format&fit=crop&w=1274&q=80" class="img-fit-cover banner-img" alt=""></img>
      </div>
      <table className="post-table index-table table table-striped table-hover table-scroll">
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
      <button className="btn btn-new"><Link to={`/posts/create`}>New Post!</Link></button>
      </div>
      </tbody>
      </table>
      </div>
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

    return <div className="delete-modal">
    <div className="delete-title">
    Are you sure you want to delete post: {this.state.deletePost.title}?
    </div>
    <div className="delete-btn">
    <button className="btn btn-error btn-yes" onClick={() => {
      this.doDeletePost(this.state.deletePost)
      this.setState({
        deletePost: null
      })
    }}> yes
    </button>
    <button className="btn btn-success" onClick={() => {
      this.setState({
        deletePost: null
      })
    }}> no
    </button>
    </div>
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
