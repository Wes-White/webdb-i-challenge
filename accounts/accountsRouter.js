const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ success: false, Error: error });
  }
});

router.get('/:id', (req, res) => {});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;
