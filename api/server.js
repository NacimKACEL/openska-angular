'use strict';

const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const appRoutes = require('./routes');
const authCheck = require('./services/auth');

/* Initialisation d'Express, le principal framework web pour Node */
const app = express();

/* Traitement JSON des données reçues en POST */
app.use(express.json());

/* Compression gzip */
app.use(compression());

/* Vérifie le token JWT */
app.use(authCheck);

/* CSRF protection */
app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });
// app.use('/api/account', csrfProtection);

/* Content Security Policy */
app.use((req, res, next) => {
  //res.set('Content-Security-Policy', `default-src 'self'; form-action 'self'; base-uri 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; frame-src 'self' https://www.youtube.com; object-src 'none'; require-sri-for script style;`);
  next();
});

/* Static files */
app.use(express.static(`${__dirname}/htdocs`, { index: false }));
app.use('/static', express.static(`${__dirname}/static`));

/* API routing */
app.use('/api', appRoutes);

/* For all others routes, serve index.html, where Angular will take care of app routing */
app.get('*', csrfProtection, (req, res) => {

  /* CSRF cookie on first load */
  res.cookie('XSRF-TOKEN', req.csrfToken());

  res.sendFile(`${__dirname}/htdocs/index.html`);

});

/* Lancement du serveur web */
app.listen(3000, () => {
  console.log(`Backend running on http://localhost:3000`);
});
