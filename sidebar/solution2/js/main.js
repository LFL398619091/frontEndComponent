/*定义别名*/
requirejs.config({
	paths:{
		jquery:"jquery3.1.1.min",
		scroll:"./common/scroll"/*不要加后缀.js*/
	}
});
requirejs(['jquery','back2Top'],function($,back2Top){
	// new back2Top.Back2Top($('#back2Top'),{mode:"go",pos:0});
	/*调用jquery插件*/
	$('#back2Top').back2Top({mode:"move"});
});