(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)


	function ShopCtrl($scope,productSrv,$state, $stateParams,product){
		var shopVm = this;
		//TODO #3 Capture resolved products for view
		shopVm.products;

		if (product) {
			shopVm.product = product.data.product;
		}

		shopVm.cart = productSrv.cart;
		shopVm.orders;
		shopVm.addToCart = productSrv.addToCart;
		
		// console.log(product.data.product);

		shopVm.viewProduct = function(product) {
			$state.go('view-product',{productId: product.id});
		};

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});


		shopVm.openCart = function(){
			// alert("CHECKCHECK")
			$state.go('cart')
		}

		shopVm.submitOrder = function(){
			// alert("CHECKCHECK")
			shopVm.orders = shopVm.cart
			console.log("this is the orders")
			console.log(shopVm.orders)
			shopVm.cart = []
			console.log("this is the cart")
			console.log(shopVm.cart)
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


