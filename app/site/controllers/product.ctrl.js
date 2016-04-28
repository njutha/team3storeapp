(function(){

	angular
	.module('shopApp')
	.controller('ProductCtrl',ProductCtrl);

	function ProductCtrl($stateParams,$state,api,productSrv){
		var productVm = this;

		productVm.categories = [
			{label:'Shirts',value:'shirts'},
			{label:'Pants',value:'pants'},
			{label:'Shoes',value:'shoes'},
			{label:'Outerwear',value:'outerwear'},
			{label:'Accessories',value:'accessories'},
		];
		productVm.product = {};
		productVm.product_update_btn = 'Update Product';
		productVm.product_delete_btn = 'Remove Product';
		
		if($stateParams.productId != undefined){
			productSrv.getProduct($stateParams.productId)
			.then(function(res){
				productVm.product = res.data.product;
				//TODO #2 set category based on edit form based on 
				//product category
				for(var index in productVm.categories){
					if(productVm.product.category == productVm.categories[index].value){
						productVm.set_category = productVm.categories[index].value;
					}
				}
				
			})
		}

		//public functions
		// productVm.addProduct = addProduct;
		productVm.updateProduct = updateProduct;
		productVm.deleteProduct = deleteProduct;

		productVm.addProduct = function(){
			//TODO #2
			//create product object, pass to product service
			//Update text in button
			var product= {name: productVm.name, 
				image: productVm.image, 
				description: productVm.description, 
				category: productVm.category, 
				price: productVm.price, 
				quantity: productVm.quantity, 
				status: true
			}
			productSrv.addProduct(product);	
			// console.log(productVm.name,productVm.description, productVm.price)
			
		}

		function updateProduct(){
			productSrv.updateProduct(productVm.product, productVm.product.id)
			// console.log(productVm.product)
			//TODO #2
			//create product object, pass to product service
			//Update text in button
		}

		function deleteProduct(){
			productSrv.deleteProduct(productVm.product.id);
			//TODO #2
			//remove product, pass to product service
			//update text in button
		}
	}

})();




