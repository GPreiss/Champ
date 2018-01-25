import React, { Component } from 'react';
import axios from 'axios'

import { withRouter } from 'react-router-dom'

window.axios = axios

const EMPTY_POST = {
  title: '',
  published: false,
  body: '',
  id: null
}

class PostForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      post: EMPTY_POST
    }

    this.handleOnChange = (event) => {
      const post = Object.assign({}, this.state.post)
      post[event.target.name] = event.target.value

      this.setState({
        post
      })
    }

    this.toggleChange = (event) => {
      const toggle = this.state.published? false : true

      const post = Object.assign({}, this.state.post)
      post.published = !post.published

      this.setState({
        post
      })
    }

    this.handleOnSubmit = (event) => {
      event.preventDefault()
      this.submit(this.state.post)
      //this.setState({
        //post: EMPTY_POST
      //})
    }

    this.handleReset = (event) => {
      event.preventDefault()
      this.setState({
        post: EMPTY_POST
      })
    }
  }


  submit(post) {
    if(post.id == null) {
      axios.post(`/api/v1/posts.json`,
        post)
      .then(function (response) {
        console.log(response)
        this.props.history.push('/')
      })
      .catch(function (error) {
        console.log(error)
      })
    } else {
      axios.put(`/api/v1/posts/${post.id}.json`,
        post
        ).then(() => {
          this.props.history.push('/')
        })
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
      return (
        <div className="container">
        <div className="columns">
        <div className="column col-6 post-outline">
        <form
        className="form-horizontal"
        onSubmit={this.handleOnSubmit}
        >
        <label className="form-label">Title</label>
        <input
        className="form-input"
        type="text"
        name="title"
        onChange={this.handleOnChange}
        value={post.title}
        />
        <label className="form-label">Body</label>
        <textarea
        className="form-input"
        name="body"
        id="input-example-3"
        rows="10"
        type="textarea"
        onChange={this.handleOnChange}
        value={post.body}
        />
        <label className="form-switch">
        <input
        type="checkbox"
        onChange={this.toggleChange}
        name="published"
        checked={post.published}
        value={post.published}
        />
        <i className="form-icon"></i> Published?
        </label>
        <div className="buttons-parent">
        <input
        type="submit"
        value={post.id? "Update" : "Submit"}
        className="btn btn-primary buttons-child"
        />
        <button
        className="btn buttons-child"
        onClick={this.handleReset}>
        Reset
        </button>
        </div>
        </form>
        </div>
        </div>
        </div>
        )
    }
  }

  export default withRouter(PostForm)
