/*基本图标组件对象（散点图）*/
define(['jquery','common','h5ComponentBase'],function($,common,h5ComponentBase){
	function H5ComponentPoint(config){
		this.config = $.extend(true,{},this.config,config);
	}
	H5ComponentPoint.prototype.config = {
		type:"point",
		width:"320px",
		height:"568px",
		name:"h5_component_point_desc",
		className:'h5_component h5_component_point',
		animateIn:{
			opacity:1
		},
		animateOut:{
			opacity:0
		},
		css:{
			transition:'all 1s ease',
			opacity:0
		},
		center:true,
		data:[
			['A项','.4','green'],
			['B项','.3','blue','0','-100%'],
			['C项','.2','red','0','100%']
		]
	};
	H5ComponentPoint.prototype.createComponentPoint=function(){
		var config = this.config;
		var h5_ComponentBase = new h5ComponentBase.H5ComponentBase(config).createComponentBase();
		var base = config.data[0][1];/*以第一个数据为参照点*/
		$.each(config.data,function(index,item){
			var point = $('<div class="point point_'+index+'"></div>');
			var name = $('<div class="name">'+item[0]+'</div>');
			var rate = $('<div class="rate">'+(item[1]*100)+'%'+'</div>');
			name.append(rate);
			point.append(name);
			var width = (item[1]/base*100)+'%';
			var height = (item[1]/base*100)+'%';
			point.width(width);
			point.height(height);
			if(item[2]){
				point.css('backgroundColor',item[2]);
			}
			if (item[3] != undefined && item[4] != undefined) {
				point.css({
					left:item[3],
					top:item[4]
				})
			}
			h5_ComponentBase.append(point);
		});
		return h5_ComponentBase;
	};
	return {
		H5ComponentPoint:H5ComponentPoint
	};
});