(function(){
	'use strict';

	angular
		.module('shopApp',['ui.router']);

	angular
		.module('shopApp')
		.config(function($stateProvider,$urlRouterProvider, $httpProvider){
			
			$urlRouterProvider.otherwise('/');

			$stateProvider
			.state('shop',{
				url:'/',
				templateUrl:'site/partials/shop-main.html',
				controller:'ShopCtrl as ctrl',
				//TODO #3 resolve products before main page load
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					},
					product: function() {
						return undefined;
					}
				}
			})

			.state('view-product',{
				url:'/view-product/:productId',
				templateUrl:'site/partials/product-page.html',
				controller:'ShopCtrl as ctrl',
				resolve:{
					product:function(productSrv, $stateParams){
						return productSrv.getProduct($stateParams.productId);
					}
				}
			})

			.state('cart',{
				url: '/mycart',
				templateUrl: 'site/partials/shop-cart.html',
				controller: 'ShopCtrl as ctrl',
				//resolve orders?
				resolve:{
					product:function(productSrv, $stateParams){
						return productSrv.getProduct($stateParams.productId);
					}
				}
			})

			.state('admin',{
				url:'/admin',
				templateUrl:'site/partials/admin.html',
				controller:'AdminCtrl as ctrl',
				//TODO #2 Resolve Products before admin page load
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			.state('admin.dash',{
				url:'/dashboard',
				templateUrl:'site/partials/admin-dash.html',
				controller:'AdminCtrl as ctrl',
			})

			.state('admin.add_product',{
				url:'/add_product',
				controller:'ProductCtrl as ctrl',
				templateUrl:'site/partials/admin-add-product.html'
			})

			.state('admin.edit_product',{
				url:'/edit_product/:productId',
				controller:'ProductCtrl as ctrl',
				templateUrl:'site/partials/admin-edit-product.html',
			})

			.state('admin.orders',{
				url:'/orders',
				controller:'OrdersCtrl as ctrl',
				templateUrl:'site/partials/admin-orders.html',
			})

			.state('auth',{
				url:'/auth',
				templateUrl:'site/partials/auth-main.html',
				controller:'AuthCtrl as ctrl',
			});

			$httpProvider.interceptors.push(function(){
		       return {
		           request: function(config) {
		               return config;
		           },
		           response: function(response) {
		               var auth_token = response.headers('authentication');
		               if(localStorage.authToken == undefined && auth_token != null){
		               		localStorage.authToken = auth_token;
		               }
		               return response;
		           }
		       }
		   });
		});
})();

