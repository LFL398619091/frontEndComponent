requirejs.config({
	paths:{
		jquery:"jquery3.1.1.min"
	}
});
requirejs(['jquery','sidebar'],function($,sidebar){
	console.log(sidebar.isIDCard('360732198911204416'));	
});