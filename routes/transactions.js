'use strict';

var express = require('express');
var router = express.Router();
var Transaction = require('../models/transaction');


//get all transactions
router.get('/', function(req, res) {
  Transaction.get(function(err, transactions) {
    if(err) {
      res.status(400).send(err);
      return;
    }
    res.send("transactions", transactions);
  })
})

//post req new transaction
router.post('/', function(req, res) {
  var newTrans = req.body;
  Transaction.create(newTrans, function(err) {
    if(err) {
      res.status(400).send(err);
      return;
    } else {
      res.send();
    }
  })
})

//get trans by id
router.get('/:id', function(req, res) {
  var id = req.params.id;
  Transaction.get(function(err, transactions) {
    if(err) {
      res.status(400).send(err);
      return;
    }
    var trans = transactions.find(function(obj) {
      return obj.id === id;
    });
    if(!trans) {
      res.status(404).send({err: "Transaction not found"});
      return;
    } else {
      res.send(trans);
    }
  });
});

//delete trans by id
router.delete('/:id', function(req, res) {
  var id = req.params.id;

  Transaction.delete(id, function(err, transactions) {
    if(err) {
      res.status(400).send(err);
      return;
    } else {
      res.send();
    }
  })
})

//put req to update transaction
router.put('/:id', function(req, res) {
  var id = req.params.id;
  var updatesObj = req.body;

  Transaction.update(id, updatesObj, function(err, updatedTrans) {
    if(err) {
      res.status(400).send(err);
      return;
    } else {
      res.send(updatedTrans);
    }
  })
})

module.exports = router;
