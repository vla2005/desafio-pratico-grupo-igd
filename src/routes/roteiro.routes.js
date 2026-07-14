const express = require('express');
const { criarRoteiro } = require('../controllers/roteiro.controller');

const router = express.Router();

router.post('/', criarRoteiro);

module.exports = router;
