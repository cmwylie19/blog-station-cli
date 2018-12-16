const fs = require('fs');

var fetchPosts = () => {
  try {
    var postsString = fs.readFileSync('posts-data.json');
    return JSON.parse(postsString);
  } catch (e) {
    return [];
  }
};

var savePosts = (posts) => {
  fs.writeFileSync('posts-data.json', JSON.stringify(posts));
};

var addPost = (title, body) => {
  var posts = fetchPosts();
  var post = {
    title,
    body
  };
  var duplicatePosts = posts.filter((post) => post.title === title);

  if (duplicatePosts.length === 0) {
    posts.push(post);
    savePosts(posts);
    return post;
  }
};

var getAll = () => {
  return fetchPosts();
};

var getPost = (title) => {
  var posts = fetchPosts();
  var filteredPosts = posts.filter((post) => post.title === title);
  return filteredPosts[0];
};

var removePost = (title) => {
  var posts = fetchPosts();
  var filteredPosts = posts.filter((post) => post.title !== title);
  savePosts(filteredPosts);

  return posts.length !== filteredPosts.length;
};

var logPost = (post) => {
  console.log('--');
  console.log(`Title: ${post.title}`);
  console.log(`Body: ${post.body}`);
};

module.exports = {
  addPost,
  getAll,
  getPost,
  removePost,
  logPost
};
