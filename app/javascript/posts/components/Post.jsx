import React, { Component } from 'react';
import axios from 'axios'

import { withRouter } from 'react-router-dom'



class PostShow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      post: { title: '', id: -1, body: '', published: false }
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id

    axios.get(`/api/v1/posts/${id}.json`)
      .then((response) => {
        this.setState({post: response.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { post } = this.state

    return <div className="container">
    <div className="columns">
    <div className="column col-6 post-outline">
      <h3 className="center"><kbd>{post.title} {post.factorial}</kbd></h3>
      <p>{post.body}</p>
      <p>{post.published? "Published" : "Edit to publish"}</p>
      {post.published?
        null :
        <div className="buttons-parent">
          <div className="buttons-child">
          <button
              className="btn"
              onClick={() => {
                this.props.history.push(`/posts/edit/${post.id}`)
              }}>
              Edit
            </button>
            <button
              className="btn"
              onClick={() => this.props.onDelete(post)}>
              Delete
            </button>
          </div>
        </div>
      }
    </div>
    </div>
    </div>
  }
}

export default withRouter(PostShow)
