(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)


	function ShopCtrl($scope,productSrv,$state, $stateParams,product){
		var shopVm = this;
		//TODO #3 Capture resolved products for view
		shopVm.products = productSrv.products;

		shopVm.curPage = 0;
	  	shopVm.productsPerPage = 8;
	  	shopVm.numPages = Math.ceil(shopVm.products.length/shopVm.productsPerPage);

		shopVm.categories = [
			{label:'All',value:''},
			{label:'Shirts',value:'shirts'},
			{label:'Pants',value:'pants'},
			{label:'Shoes',value:'shoes'},
			{label:'Outerwear',value:'outerwear'},
			{label:'Accessories',value:'accessories'}
		];
		
		if (product) {
			shopVm.product = product.data.product;
		}

		shopVm.cart = productSrv.cart;
		shopVm.orders = productSrv.orders;
		shopVm.addToCart = productSrv.addToCart;
		
		// console.log(product.data.product);

		shopVm.viewProduct = function(product) {
			$state.go('shop.view-product',{productId: product.id});
		};

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});


		shopVm.openCart = function(){
			// alert("CHECKCHECK")
			$state.go('shop.cart')
		}

		shopVm.submitOrder = function(){
			// alert("CHECKCHECK")
			for(var i = 0; i<shopVm.cart.length; i++){
				shopVm.orders.push(shopVm.cart[i])
			}
			console.log("this is the orders")
			console.log(shopVm.orders)
			shopVm.cart.splice(0,shopVm.cart.length);
			console.log("this is the cart")
			console.log(shopVm.cart);
			$state.go('shop.confirmation');
		}

		shopVm.removeFromCart = function(productId){
			for(var i=0; i < shopVm.cart.length; i++){
				console.log(shopVm.cart[i])
				console.log(productId)
				if(shopVm.cart[i] == productId){
					shopVm.cart.splice(i,1);
					i--;
				}
			}
		}


	}
})();


