(function () {

	'use strict';

	angular
	.module('ShopingCheckOff',[])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('CheckOffService', CheckOffService);

	function CheckOffService(){

		var service = this;
		var itemsToBuy = [{name: "Item one", qty: 10},
		                  {name: "Item two", qty: 20},
		                  {name: "Item three", qty: 30},
		                  {name: "Item four", qty: 40},
		                  {name: "Item five", qty: 50}];
		var itemsAlreadyBought = [];

		service.buyItem = function (idx) {
			itemsAlreadyBought.push(itemsToBuy[idx]);
			itemsToBuy.splice(idx,1);
		};

		service.returnItem = function (idx) {
			itemsToBuy.push(itemsAlreadyBought[idx]);
			itemsAlreadyBought.splice(idx,1);
		};

		service.getItemsToBuy = function () {
			return itemsToBuy;
		};

		service.getItemsAlreadyBought = function () {
			return itemsAlreadyBought;
		};

	}; // function CheckOffService

	ToBuyController.$inject = ['CheckOffService'];
	function ToBuyController(CheckOffService){

		var toBuy = this;

		toBuy.items = CheckOffService.getItemsToBuy();

		toBuy.buyItem = function (idx) {
			CheckOffService.buyItem(idx);
		};

	}; // function ToBuyController(CheckOffService){

	AlreadyBoughtController.$inject = ['CheckOffService'];
	function AlreadyBoughtController(CheckOffService){

		var alreadyBought = this;

		alreadyBought.items = CheckOffService.getItemsAlreadyBought();

		alreadyBought.returnItem = function (idx) {
			CheckOffService.returnItem(idx);
		};

	}; // function AlreadyBoughtController(CheckOffService){

})();