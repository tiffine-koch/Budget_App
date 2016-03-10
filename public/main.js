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
  }, function (err) {
    console.error('ERR', err);
  });
}
getAllTransactions();

$scope.getBalance = function () {
  //use a for loop or reduce here
  //fix deleted amounts
  var newBalance = 0;
  for(var i = 0; i < $scope.transactions.length; i++) {
    var transaction = $scope.transactions[i];
    newBalance += transaction.amount;
  }
  console.log('newB', newBalance);
  return newBalance;
}
$scope.recordDebit = function() {
  currentAmount = -$scope.transaction.amount;
  console.log('debit', currentAmount);

}
$scope.recordCredit = function() {
  console.log('credit');
  currentAmount = +$scope.transaction.amount;
  console.log('credit', currentAmount);
}

$scope.addTrans = function() {
  console.log('click');
  var newTrans = $scope.transaction;
  console.log("addTrans", $scope.transaction);
  $http({
    method: 'POST',
    url: '/transactions',
    data: {desc: $scope.transaction.desc, date: $scope.transaction.date, amount: currentAmount}
  })
  .then(function(data) {
    $scope.transactions.push(newTrans);
    getBalance();

  }, function(err) {
    console.error(err);
  })
  $scope.transaction = {};
  }

$scope.deleteTrans = function(transaction) {
  var id = this.transaction.id;
  $http({
    method: 'DELETE',
    url: "/transactions/" + id
  })
  .then(function(data) {
    $scope.transactions.splice(id, 1);
    getBalance();
  }, function(err) {
    console.error(err);
  })
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
