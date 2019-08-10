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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accountById = await db('accounts').where('id', id);
    res.status(200).json(accountById);
  } catch (err) {
    res.status(500).json({ message: 'There was a problem with your request' });
  }
});

router.post('/', async (req, res) => {
  const accData = req.body;
  try {
    const acct = await db('accounts').insert(accData);
    if (acct) {
      res.status(201).json(acct);
    }
  } catch (error) {
    res.status(500).json({
      message: 'We were unable to add the selected account.',
      error: error
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await db('accounts')
      .where({ id })
      .updates(changes);
    if (changes) {
      res.status(200).json(changes);
    } else {
      res.status(400).json({
        success: false,
        message: 'We were unable to locate that account, pleaes check your id.'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, Error: error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const delAcct = await db('accounts')
      .where({ id })
      .del();
    if (delAcct) {
      res.status(200).json(delAcct);
    } else {
      res.status(400).json({
        success: false,
        message: 'We were unable to locate an account with that ID'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, Error: error });
  }
});

module.exports = router;
