'use strict';

console.log('main.js');

var app = angular.module('MyApp', []);

app.controller('mainCtrl', function($scope, $http) {
  console.log('hello from mainCtrl');
  $scope.transactions = [];

  function getAllTransactions() {
  $http({
    method: 'GET',
    url: '/transactions',
  })
  .then(function (res) {
    $scope.transactions = res.data;
    console.log(res.data);
    console.log($scope.transactions);
  }, function (err) {
    console.error('ERR', err);
  });
}
getAllTransactions();

$scope.addTrans = function() {
  console.log('click');
  var newTrans = $scope.transaction;
  console.log("addTrans", $scope.transaction);
  $http({
    method: 'POST',
    url: '/transactions',
    data: {desc: $scope.transaction.desc, date: $scope.transaction.date, amount: $scope.transaction.amount}
  })
  .then(function(res) {
    $scope.transactions.push(newTrans);
  }, function(err) {
    console.error(err);
  })
  $scope.transaction = {};
  }

$scope.deleteTrans = function(transaction) {
  var index = $scope.transactions.indexOf(transaction);
  $http({
    method: 'DELETE',
    url: "/transactions/" + index,
  })
  .then(function(data) {
    $scope.transactions.splice(index, 1);
  }, function(err) {
    console.error(err);
  })
}

$scope.recordDebit = function() {
  console.log('debit');
}
$scope.recordCredit = function() {
  console.log('credit');
}
$scope.getBalance = function() {
  var balance = 1000.00;
  var newBalance = balance - transaction.amount;
}

$scope.editTrans = function(newTrans) {
  var index = $scope.transactions.indexOf(newTrans);
  $scope.transactions.push($scope.transaction);
  $http({
    method: 'PUT',
    url: "/transactions/" + index,
    data: index
  })
  .then(function(data){
    addTrans();
    console.log('data', data);
  }, function(err){
    console.error(err);
  })
  $scope.transaction = {};
  };
});
