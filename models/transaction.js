'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var transFilepath = path.join(__dirname, '../data/budget.json');

exports.get = function(cb) {
  fs.readFile(transFilepath, function(err, data){
    if(err) return cb(err);
    var transactions = JSON.parse(data);
    cb(null, transactions);
  });
};

exports.create = function(newTrans, cb) {
  this.get((err, transactions) => {
    if(err) return cb (err);
    newTrans.id = uuid();
    transactions.push(newTrans);
    this.write(transactions, cb);
  });
};

exports.write = function(transactions, cb) {
  fs.writeFile(transFilepath, JSON.stringify(transactions), cb);
};

exports.delete = function(id, cb) {
  this.get((err, transactions) => {
  var transaction = transactions.filter(function(transaction) {
      return transaction.id !== id;
    });
    this.write(transactions, cb);
  });
}

exports.update = function(id, updatesObj, cb) {
  this.get((err, transactions) => {
    var updatedTrans;
    transactions = transactions.map(function(transaction) {
      if(transaction.id === id) {
        for(var key in updatesObj) {
          transaction[key] = updatesObj[key];
        }
        updatedTrans = transaction;
      }
      return transaction;
    });
    if(!updatedTrans) {
      cb( {err: "Transaction not found"});
      return;
    }
    this.write(transactions, function(err) {
      cb(err, updatedTrans);
    });
  });
}
