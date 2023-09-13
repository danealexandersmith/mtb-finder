const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { Console } = require('node:console');
const fs = require('fs');

const userController = require(path.resolve(__dirname, './userController.js'))

const app = express();

// Automatically parse urlencoded body content and form data from incoming requests and place it
// in req.body

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

const PORT = 3000;


const mongoURI =  'mongodb+srv://rocknrolldane:kG2iS5sGC6xJu2CQ@cluster0.wdjltuo.mongodb.net/?retryWrites=true&w=majority';
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

  app.post('/register', userController.testBody, (req, res) => {
    res.status(200);
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