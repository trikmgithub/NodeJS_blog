  const express = require('express');
  const morgan = require('morgan');
  const path = require('path');
  const { engine : handlebars } = require('express-handlebars');
const { ClientRequest } = require('http');
  const app = express();
  const port = 3000;

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(express.json());

 
  // HTTP logger
  app.use(morgan('combined'));
  // Templates engine
  app.engine('.hbs', handlebars({extname: '.hbs'}));
  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname, 'resources/views'));

  app.use(express.static(path.join(__dirname, 'public')));
  console.log("conmemay" + path.join(__dirname, 'public'));

  app.get('/', (req, res) => {
    res.render('home');
  });

  app.get('/news', (req, res) => {
    res.render('news');
  });

  app.get('/search', (req, res) => {

    res.render('search');
  });

  app.post('/search', (req, res) => {
    console.log(req.body);
    res.send('');
  })
  

  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    
  } catch (error) {
    window.log('https://google.com/?q=' + error)
  }