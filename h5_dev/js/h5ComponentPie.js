/*基本图标组件对象（饼图）*/
define(['jquery','common','h5ComponentBase'],function($,common,h5ComponentBase){
	function H5ComponentPie(config){
		this.config = $.extend(true,{},this.config,config);
	}
	/*config配置begin*/
	H5ComponentPie.prototype.config = {
		type:"reda",
		width:"400px",
		height:"400px",
		name:"h5_component_pie_detail",
		className:'h5_component h5_component_pie',
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
			['java','.4','#ff7676'],
			['c','.2'],
			['c++','.15'],
			['C#','.2'],
			['php','.05']
		]
	};/*config配置end*/

	/*绘制饼图begin*/
	H5ComponentPie.prototype.createComponentPie=function(){
		var config = this.config;
		var h5_ComponentBase = new h5ComponentBase.H5ComponentBase(config).createComponentBase();
		var w = config.width;
		var h = config.height;

		/*绘制底图层*/
		var canvas = document.createElement('canvas');
		$(canvas).css('zIndex',1);
		var context = canvas.getContext("2d");
		window.ctx = context;
		context.width = canvas.width = w;
		context.height = canvas.height = h;
		var r = w/2;
		var count = config.data.length;
		context.beginPath();
		context.strokeStyle = 'red';
		var a = w/2;
		var b = h/2;
		context.fillStyle = "#eee";
		context.strokeStyle = "#eee";
		context.lineWidth = 1;
		context.arc(a,b,r,0,2*Math.PI);
		context.stroke();
		context.fill();
		context.closePath();/*绘制底图层end*/

		/*绘制数据层*/
		var canvas1 = document.createElement('canvas');
		var context1 = canvas1.getContext("2d");
		context1.width = canvas1.width = w;
		context1.height = canvas1.height = h;
		var allAngel = Math.PI*2; /*100%圆周的角度 360deg*/
		var originalAngel = 1.5*Math.PI;
		_createDataPie();
		$(canvas1).css('zIndex',2);
		function _createDataPie(){
			var colors = ['red','green','blue','orange','gray'];
			for (var i = 0; i < count; i++) {
				var item = config.data[i];
				var startAngel = originalAngel;/*设置开始的角度*/
				var endAngel = startAngel + allAngel*item[1] /*结束角度*/
				context1.beginPath();
				color = item[2] ? item[2] : colors[i];
				context1.fillStyle = color;
				context1.strokeStyle = color;
				context1.lineWidth = .1;
				context1.moveTo(a,b);
				context1.arc(a,b,r,startAngel,endAngel);
				context1.stroke();
				context1.fill();
				context1.closePath();
				originalAngel = endAngel;
				/*加入项目名称*/
				var text = $("<div class='text'></div>");
				text.text(item[0]);
				if (item[2]) {
					text.css("color",item[2]);
				}
				text.css('zIndex',999);
				text.css('opacity',0);
				text.css('transition','all 1s ease');
				var percent = $("<div class='percent'></div>");
				percent.text((item[1]*100>>0) + '%');
				text.append(percent);
				var x = a + Math.sin(0.5*Math.PI-endAngel)*r;/*纠正位置*/
				var y = b + Math.cos(0.5*Math.PI-endAngel)*r;
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
				h5_ComponentBase.append(text);
			}
		};/*绘制数据层end*/
		/*加入蒙版层begin*/
		var canvas2 = document.createElement('canvas');
		$(canvas2).css('zIndex',3);
		$(canvas1).css('opacity',0);
		var context2 = canvas2.getContext("2d");
		context2.width = canvas2.width = w;
		context2.height = canvas2.height = h;
		originalAngel = 1.5*Math.PI;
		function _makePieAnimation(percent){
			context2.clearRect(0,0,w,h);
			context2.beginPath();
			context2.strokeStyle = 'red';
			context2.fillStyle = "#eee";
			context2.strokeStyle = "#eee";
			context2.lineWidth = 1;
			if (percent <= 0) {
				context2.arc(a,b,r,0,allAngel,true);
				$(h5_ComponentBase).find('.text').css('opacity',0);
			}else{
				context2.arc(a,b,r,originalAngel,allAngel+originalAngel*percent,true);
			}
			context2.stroke();
			context2.fill();
			context2.closePath();
			if (percent >=1) {
				$(h5_ComponentBase).find('.text').css('opacity',1);
			}
		}
		// _makePieAnimation(0);
		/*加入蒙版层end*/
		/*加上动画*/
		h5_ComponentBase.on('onArrive',function(){
			$(this).find('canvas').eq(1).css('opacity',1);
			var s = 0;
			for(var i = 0; i < 100; i++){
				setTimeout(function(){
					s+=0.01;
					
					_makePieAnimation(s);
				},i*10);
			}
		});
		h5_ComponentBase.on('onLeave',function(){
			var s = 1;
			for(var i = 0; i < 100; i++){
				setTimeout(function(){
					s-=0.01;
					if (s<=0) {
						$(canvas2).find('.text').css('opacity',0);
					}
					_makePieAnimation(s);
				},i*10);
			}
		});
		//_drawDataLayer(1,context1,config);
		h5_ComponentBase.append(canvas).append(canvas1).append(canvas2);
		//h5_ComponentBase.append(canvas).append(canvas1);
		return h5_ComponentBase;
	};/*绘制饼图end*/
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
		
	}/*绘制数据层end*/
	


	return {
		H5ComponentPie:H5ComponentPie
	};
});