const express = require("express");
const app = require("express")();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
const handlebars  = require('express-handlebars');
const session = require('express-session');
const config = require('./app/config/config')
var multer = require('multer');
var upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 

var hbs = handlebars.create({
  defaultLayout: 'main',
  helpers      : {
    section: (name, options) => {
      if (!this._sections) this._sections = {};
          this._sections[name] = options.fn(this); 
          return null;
    }
  },
  extname      : '.html',
  layoutsDir   : 'views',
  partialsDir: [
      'views/partials',
  ]
}); 

app.engine('html', hbs.engine);
app.set('view engine', 'html');

app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static('public'))
app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true, 
  cookie: { maxAge: 1440000 } // 24 hrs
}));

// Routes
require("./app/routes/api.js")(router); // api
require("./app/routes/web.js")(router); // web
app.use('/api', router)
app.use(router)

// Error 404 Not found
app.use((req, res, next) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    if (req.session.user) {
      res.render('error/error-404', { title: 'Error 404'});
    } else {
      res.render('error/fullpage-404', { title: 'Error 404'});
    }

    return;
  }

  // respond with json
  if (req.accepts('json')) {s
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
}); 