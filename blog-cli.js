const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const url = require('url');
const posts = require('./posts.js');

var express = require("express");
var app = express();


const titleOptions = {
  describe: 'Title of post',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of post',
  demand: true,
  alias: 'b'
};
const argv = yargs
  .command('add', 'Add a new post', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all post')
  .command('read', 'Read a post', {
    title: titleOptions,
  })
  .command('remove', 'Remove a post', {
    title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add') {
  var post = posts.addPost(argv.title, argv.body);
  if (post) {
    console.log('Post created');
    posts.logPost(post);
  } else {
    console.log('Post title taken');
  }
} else if (command === 'list') {
  var allPosts = posts.getAll();
  console.log(`Printing ${allPosts.length} post(s).`);
  allPosts.forEach((post) => posts.logPost(post));
} else if (command === 'read') {
  var post = posts.getPost(argv.title);
  if (post) {
    console.log('Post found');
    posts.logPost(post);
  } else {
    console.log('Post not found');
  }
} else if (command === 'remove') {
  var postRemoved = posts.removePost(argv.title);
  var message = postRemoved ? 'Post was removed' : 'Post not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}

// /* serves main page */
// app.get("/", function(req, res) {
//   res.sendfile('views/demo.html')
// });

// app.post("/add", (req,res)=>{
//   res.send()
// })
// app.post("/user/add", function(req, res) { 
// /* some server side logic */
// res.send("OK");
// });

// /* serves all the static files */
// app.get(/^(.+)$/, function(req, res){ 
//    console.log('static file request : ' + req.params);
//    res.sendfile( __dirname + req.params[0]); 
// });

// var port = process.env.PORT || 5000;
// app.listen(port, function() {
//  console.log("Listening on " + port);
// });