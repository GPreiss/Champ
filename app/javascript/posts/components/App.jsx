import React, {Component} from 'react'
import axios from 'axios';
// import Posts from './posts'

class App extends Component {
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
      return(
        <div key={post.id}>
          <h3> {post.title}</h3>
          <p> {post.body}</p>
          <p> {post.factorial}</p>
        </div>
      )
    });

    return (
      <div>
      <h1>Hello, World!</h1>
      {posts}
      </div>
      )
  }
}


export default App;
