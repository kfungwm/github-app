const express = require('express'),
      request = require('request'),
      pug = require('pug'),
      morgan = require('morgan'),
      USER_API_SERVER = 'https://api.github.com';

var app = express();

app.set('view engine', 'pug');

app.use(morgan('dev'));

const naamRequest = request.defaults({
  headers: {
    'User-Agent': 'Github is cool'
  }
});



app.get('/:gebruikers', (req, res) => {
  naamRequest.get(USER_API_SERVER + '/users/' + req.params.gebruikers, (error, response, body) => {
    if (!error) {
      res.render('coins/show', { gebruiker: JSON.parse(body) });
    } else {
      res.status(500).end();
    }
  });
});

app.get('/api/:gebruikers', (req, res) => {
  naamRequest.get(USER_API_SERVER + '/users/' +req.params.gebruiker, (error, response, body) => {
    if (!error) {
      res.json(JSON.parse(body));
    } else {
      res.status(500).end();
    }
  });
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
