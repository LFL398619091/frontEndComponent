/*基本图标组件对象（柱状图）*/
define(['jquery','common','h5ComponentBase'],function($,common,h5ComponentBase){
	function H5ComponentBar(config){
		this.config = $.extend(true,{},this.config,config);
	}
	H5ComponentBar.prototype.config = {
		type:"bar",
		width:"530px",
		height:"600px",
		name:"h5_component_bar_detail",
		className:'h5_component h5_component_bar',
		animateIn:{
			opacity:1
		},
		animateOut:{
			opacity:0
		},
		css:{
			opacity:0
		},
		center:true,
		isVertical:false,
		data:[
			['Javascript','.8','#ff7676'],
			['Html/Css','.4'],
			['Bootstrap','.5'],
			['Jquery','.3'],
			['Require.js','.48'],
			['myFocus.js','.65','#ff7676'],
			['Angular.js','.19'],
		]
	};
	H5ComponentBar.prototype.createComponentBar=function(){
		var config = this.config;
		var h5_ComponentBase = new h5ComponentBase.H5ComponentBase(config).createComponentBase();
		var base = config.data[0][1];/*以第一个数据为参照点*/
		$.each(config.data,function(index,item){
			var line = $('<div class="line"></div>');
			var line_name = $('<div class="name"></div>');
			line_name.text(item[0]);
			var line_process = $('<div class="process"></div>');
			var bgStyle = '';
			/*自定义颜色*/
			if (item[2]) {
				bgStyle = "style='background-color:"+item[2]+"'";
			}
			line_process.html('<div class="bg" '+bgStyle+'></div>');
			var line_rate = $('<div class="rate"></div>');
			if (config.isVertical) {
				var height = (item[1]*100)+"%";
				line_process.height(height);
				line_rate.text(height);
			}else{
				var width = (item[1]*100)+"%";
				line_process.width(width);
				line_rate.text(width);
			}
			line.append(line_name).append(line_process).append(line_rate);
			h5_ComponentBase.append(line);
		});
		return h5_ComponentBase;
	};
	return {
		H5ComponentBar:H5ComponentBar
	};
});