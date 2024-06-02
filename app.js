const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Bam29:idder1234@nodetuts.tkjwfon.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000, () => {
    console.log("sever is runing")
  }))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// testes to learn
app.get('/addNewBlog', (req, res) => {
  const blog = new Blog({
    title: "first title",
    snippet: "best blog",
    body: "i'm the best web developer and the best entroprenur"
  })
  blog.save().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err)
  })
})
app.get('/get-all-blogs', (req, res) => {

  Blog.find().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err)
  })
})

app.get('/get-a-blog/:id', (req, res) => {

  Blog.findById(req.params.id).then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err)
  })
})