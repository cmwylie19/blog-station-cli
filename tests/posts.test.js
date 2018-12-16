var posts = require("../posts")

it('getAll should return',()=>{
    let val = posts.getAll();
    console.log(val)
    if(val === null) throw new Error('fetchPosts does not return value.');
})

it('getPost should return post',()=>{
    let post = posts.getPost('test');
    if(post === null) throw new Error('getPost does not return post');
})

it('addPost should save new post',()=>{
    posts.addPost('test-title','test-body');
    let post = posts.getPost('test-title');
  
    if(post === undefined) throw new Error('addPost does not add post');
    posts.removePost('test-title');
    //post = posts.getPost('test-title');
    //console.log(post)
})

it('removePost should remote a post',()=>{
    posts.addPost('test-title','test-body');
    let post = posts.getPost('test-title');
    posts.removePost('test-title');
    post = posts.getPost('test-title');
    if(post !== undefined) throw new Error('removePost does not remove post');
})