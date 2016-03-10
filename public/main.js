'use strict';

console.log('main.js');
var currentAmount;

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
    var total = res.data;
    var currentBalance = total.reduce(function())
    console.log('current', total);
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
  .then(function(data) {
    $scope.transactions.push(newTrans);

  }, function(err) {
    console.error(err);
  })
  $scope.transaction = {};
  }

$scope.deleteTrans = function(transaction) {
  var index = $scope.transactions.indexOf(transaction);
  var id = transaction.id;
  $http({
    method: 'DELETE',
    // url: "/transactions/" + index,
    url: "/transactions/" + id
  })
  .then(function(data) {
    $scope.transactions.splice(index, 1);
  }, function(err) {
    console.error(err);
  })
}

$scope.recordDebit = function() {
  console.log('debit');
  currentAmount = -$scope.transaction.amount;
  console.log('debit', currentAmount);

}
$scope.recordCredit = function() {
  console.log('credit');
  currentAmount = $scope.transaction.amount;
  console.log('credit', currentAmount);
}
// $scope.getBalance = function() {
$scope.getBalance = function () {
  var startingBalance = 1000.00;
  var newBalance = startingBalance - currentAmount;
  var currentBalance = newBalance - currentAmount;
  return newBalance;
  console.log('newB', newBalance);
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
