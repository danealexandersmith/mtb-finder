const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { Console } = require('node:console');
const fs = require('fs');
require('dotenv').config();

const userController = require(path.resolve('./servers/controllers/userController.js'));
const cookieController = require(path.resolve('./servers/controllers/cookieController.js'));
const sessionController = require(path.resolve('./servers/controllers/sessionController.js'));

// const testPath = path.resolve('./models/UserModel.js');
// console.log(testPath);

const app = express();

// Automatically parse urlencoded body content and form data from incoming requests and place it
// in req.body

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT;


const mongoURI = process.env.MONGO_KEY;

mongoose.connect(mongoURI);


// Send html, style, and background on load

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });

app.get('/style/style.css', (req, res) => {  
  const cssData = fs.readFileSync(path.resolve(__dirname,'../style/style.css'));
  res.writeHead(200, {'Content-Type': 'text/css'});
  res.end(cssData);
});

app.get('/mountain_background_3.jpeg', (req, res) => {  
    const cssImage = fs.readFileSync(path.resolve(__dirname,'../mountain_background_3.jpeg'));
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(cssImage);
  });

// send HTML, syle, and background for signup page

  app.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/signup.html'));
  });

  app.get('/style/signup_style.css', (req, res) => {  
    const cssData = fs.readFileSync(path.resolve(__dirname,'../style/signup_style.css'));
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(cssData);
  });

  app.post('/register', userController.createUser, (req, res) => {
    res.redirect('/');
  });

  app.post('/login', userController.authenticate, cookieController.setSSID, (req, res) => {
    res.redirect('/userPage');
  });


// Authorized routes

  // send user hompage
  app.get('/userPage', sessionController.isLoggedIn, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/userPage.html'))
  });

  app.get('/style/userPage.css', (req, res) => {  
    const cssData = fs.readFileSync(path.resolve(__dirname,'../style/userPage.css'));
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(cssData);
  });


// 404 handler

app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });
  
// Global error handler

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
  });


app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;