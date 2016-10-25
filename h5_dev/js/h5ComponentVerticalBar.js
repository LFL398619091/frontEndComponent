/*基本图标组件对象（柱状图）*/
define(['jquery','common','h5ComponentBar'],function($,common,h5ComponentBar){
	function H5ComponentVerticalBar(config){
		this.config = $.extend(true,{},this.config,config);
	}
	H5ComponentVerticalBar.prototype.config = {
		type:"verticalBar",
		width:640,
		height:600,
		name:"h5_component_verticalBar_detail",
		className:'h5_component h5_component_verticalBar',
		animateIn:{
			marginTop:"-50%",
			bottom:300,
			opacity:1
		},
		animateOut:{
			bottom:'-600',
			opacity:0
		},
		css:{
			top:'50%',
			opacity:0,
			top:0
		},
		center:false,
		isVertical:true,
		data:[
			['js','.8','#ff7676'],
			['html','.4'],
			['css','.5'],
			['jq','.3'],
			['bb','.48'],
			['react','.65','#ff7676'],
			['ng','.19'],
		]
	};
	H5ComponentVerticalBar.prototype.createComponentVerticalBar=function(){
		var config = this.config;
		var h5_ComponentBar = new h5ComponentBar.H5ComponentBar(config).createComponentBar();
		return h5_ComponentBar;
	};
	return {
		H5ComponentVerticalBar:H5ComponentVerticalBar
	};
});