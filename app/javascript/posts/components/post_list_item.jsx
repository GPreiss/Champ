import React, { Component } from 'react';

export default class PostListItem extends Component {
  render() {
    return (
      <div className="post">
        <div className="post-body">
          <h3>
            <a href={this.props.post.url} target="_blank">{this.props.post.name}</a>
          </h3>
        </div>
      </div>
    );
  }
}
