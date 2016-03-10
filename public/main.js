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

$scope.addTrans =function() {
  console.log('click');
  var newContact = $scope.contact;
  //if statement to check for empty fields
    $http({
      method: 'POST',
      url: '/transactions',
      data: {name: $scope.contact.name, email: $scope.contact.email, location: $scope.contact.location,
        phone: $scope.contact.phone,
        spirit: $scope.contact.spirit
      }
    })
    .then(function(res) {
      $scope.contacts.push(newContact);
    }, function(err) {
      console.error(err);
    })
    $scope.contact = {};
}

});
