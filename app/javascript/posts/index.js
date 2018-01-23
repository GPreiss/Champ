import React from 'react';
import ReactDOM from 'react-dom';
import PostList from './components/post_list';

const postsContainer = document.getElementById('posts');
if (postsContainer) {
  const posts = JSON.parse(postsContainer.dataset.posts);
  ReactDOM.render(
    <PostList posts={posts} />
    , postsContainer);
}
