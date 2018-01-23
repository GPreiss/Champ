import React, { Component } from 'react';
import PostListItem from './post_list_item';

export default class PostList extends Component {
  render() {
    return (
      <div>
        {this.props.posts.map((post) => {
          return <PostListItem post={post} key={post.id} />;
        })}
      </div>
    );
  }
}
