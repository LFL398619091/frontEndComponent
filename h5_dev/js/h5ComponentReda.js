/*基本图标组件对象（雷达图）*/
define(['jquery','common','h5ComponentBase'],function($,common,h5ComponentBase){
	function H5ComponentReda(config){
		this.config = $.extend(true,{},this.config,config);
	}
	/*config配置begin*/
	H5ComponentReda.prototype.config = {
		type:"reda",
		width:"400px",
		height:"400px",
		name:"h5_component_reda_detail",
		className:'h5_component h5_component_reda',
		animateIn:{
			opacity:1
		},
		animateOut:{
			opacity:1
		},
		css:{
			opacity:1
		},
		center:true,
		isVertical:false,
		data:[
			['java','.8','#ff7676'],
			['c','.4'],
			['c++','.5'],
			['C#','.3'],
			['php','.3']
		]
	};/*config配置end*/

	/*绘制雷达图begin*/
	H5ComponentReda.prototype.createComponentReda=function(){
		var config = this.config;
		var h5_ComponentBase = new h5ComponentBase.H5ComponentBase(config).createComponentBase();
		var w = config.width;
		var h = config.height;
		var canvas = document.createElement('canvas');
		var context = canvas.getContext("2d");
		context.width = canvas.width = w;
		context.height = canvas.height = h;
		var r = w/2;
		var count = config.data.length;
		context.beginPath();
		context.strokeStyle = 'red';
		var a = w/2;
		var b = h/2;
		/*计算多边形的顶点坐标
		 *已知圆心(x,y),半径r，角度deg 第几个订单n
		 * rad = ((2*Math.PI)/360) * (360/count) * n
		 * x = x + Math.sin(rad) * r;
		 * y = y + Math.cos(rad) * r;
		 * 绘制网格背景（分面绘制 10等份）
		*/
		for(var j = 10; j >0; j--){
			var rad,x,y;
			context.beginPath();
			var percent = j / 10;
			for(var i=0;i<count;i++){
				rad = ((2*Math.PI)/360) * (360/count) * i 
				x = a + Math.sin(rad) * r *percent;
				y = b + Math.cos(rad) * r *percent;
				context.lineTo(x,y);
			}
			context.closePath();
			if (j % 2 === 0) {
				context.fillStyle = "#99c0ff";
			}else{
				context.fillStyle = "#f1f9ff";
			}
			
			context.fill();
			context.closePath();
		}
		/*绘制伞骨*/
		context.beginPath();
		for(var i =0; i< count;i++ ){
			rad = ((2*Math.PI)/360) * (360/count) * i ;
			x = a + Math.sin(rad) * r;
			y = b + Math.cos(rad) * r;
			context.moveTo(a,b);
			context.lineTo(x,y);
			/*输出项目文字*/
			var text = $("<div class='text'></div>");
			text.text(config.data[i][0]);
			if (x>w/2) {
				text.css('left',x/2+5);
			}else{
				text.css('right',(w-x)/2+5);
			}
			if(y>h/2){
				text.css('top',y/2+5);
			}else{
				text.css('bottom',(h-y)/2+5);
			}
			
			if (config.data[i][2]) {
				text.css('color',config.data[i][2]);
			}
			text.css('opacity',0);
			text.css('transition','all .5s ease '+0.1*i+'s');
			h5_ComponentBase.append(text);
		}
		context.closePath();
		context.strokeStyle = "rgba(218, 210, 210,.5)";
		context.stroke();
		/*绘制数据层*/
		var canvas1 = document.createElement('canvas');
		var context1 = canvas1.getContext("2d");
		context1.width = canvas1.width = w;
		context1.height = canvas1.height = h;
		
		/*加上动画*/
		h5_ComponentBase.on('onArrive',function(){
			var s = 0;
			for(var i = 0; i < 100; i++){
				setTimeout(function(){
					s+=0.01;
					_drawDataLayer(h5_ComponentBase,s,context1,config);
				},i*10+1000);
			}
		});
		h5_ComponentBase.on('onLeave',function(){
			var s = 1;
			for(var i = 0; i < 100; i++){
				setTimeout(function(){
					s-=0.01;
					_drawDataLayer(h5_ComponentBase,s,context1,config);
				},i*10);
			}
		});
		//_drawDataLayer(1,context1,config);
		h5_ComponentBase.append(canvas).append(canvas1);
		return h5_ComponentBase;
	};/*绘制雷达图end*/
	/*绘制数据层begin*/
	function _drawDataLayer(h5_ComponentBase,percent,context,config){
		var count = config.data.length,
			w = config.width,
			h = config.height;
		var rad,rate,x,y,
			r = w/2,
			a = w/2,
			b = h/2;
		context.clearRect(0,0,w,h);
		/*画线*/	
		context.beginPath();
		context.strokeStyle = "red";
		for(var i=0;i<count;i++){
			rad = ((2*Math.PI)/360) * (360/count) * i ;
			rate = config.data[i][1] * percent;
			x = a + Math.sin(rad) * r*rate;
			y = b + Math.cos(rad) * r*rate;
			context.lineTo(x,y);
			
		}
		context.closePath();
		context.stroke();/*画线end*/
		if (percent >= 1) {
			h5_ComponentBase.find('.text').css('opacity',1);
		}
		if(percent <=0){
			h5_ComponentBase.find('.text').css('opacity',0);
		}
		/*画点begin*/
		// context.fillStyle = "#ff7676";
		// context.font = "30px Microsoft Yahei";
		// for(var i=0;i<count;i++){
		// 	rad = ((2*Math.PI)/360) * (360/count) * i ;
		// 	rate = config.data[i][1] * percent;
		// 	x = a + Math.sin(rad) * r*rate;
		// 	y = b + Math.cos(rad) * r*rate;
		// 	context.beginPath();
		// 	context.arc(x,y,5,0,2*Math.PI);
		// 	context.fillText(config.data[i][0],x+10,y+10);
		// 	context.fill();
		// 	context.closePath();
		// }
		
		/*画点end*/
	}/*绘制数据层end*/
	


	return {
		H5ComponentReda:H5ComponentReda
	};
});