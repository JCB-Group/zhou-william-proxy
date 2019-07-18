const express = require('express');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
const port = 3000,
      checkout = 'http://localhost:3001',
      reviews = 'http://localhost:3002',
      description = 'http://localhost:3003';

express()
    .use(express.static('public'))
    .all('/rooms(/dates)?', (req, res) => apiProxy.web(req, res, {target: checkout}))
    .all('/reviews', (req, res) => apiProxy.web(req, res, {target: reviews}))
    .all('/search', (req, res) => apiProxy.web(req, res, {target: reviews}))
    .all('/getData', (req, res) => apiProxy.web(req, res, {target: description}))
    .listen(port, () => console.log(`listening at ${port}`))