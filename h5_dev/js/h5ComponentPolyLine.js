/*基本图标组件对象（折线图）*/
define(['jquery','common','h5ComponentBase'],function($,common,h5ComponentBase){
	function H5ComponentPolyLine(config){
		this.config = $.extend(true,{},this.config,config);
	}
	/*config配置begin*/
	H5ComponentPolyLine.prototype.config = {
		type:"polyline",
		width:"530px",
		height:"400px",
		name:"h5_component_polyline_detail",
		className:'h5_component h5_component_polyline',
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
			['js','.8','#ff7676'],
			['html','.4'],
			['css','.5'],
			['jq','.3']
		]
	};/*config配置end*/

	/*绘制折线图begin*/
	H5ComponentPolyLine.prototype.createComponentPolyLine=function(){
		var config = this.config;
		var h5_ComponentBase = new h5ComponentBase.H5ComponentBase(config).createComponentBase();
		var canvas1 = _createGridCanvas(h5_ComponentBase,config);
		var canvas2 = _createPolyLineCanvas(config);
		var context = canvas2.getContext("2d");
		/*制作折线图动画*/
		h5_ComponentBase.on('onArrive',function(){
			//_createPolyLine(1,context,config);
			_makePolyLineIn(context,config);	
		});
		h5_ComponentBase.on('onLeave',function(){
			//_createPolyLine(1,context,config);
			_makePolyLineOut(context,config);	
		});
		
		h5_ComponentBase.append(canvas1).append(canvas2);
		/*折线图生长动画*/
		return h5_ComponentBase;
	};/*绘制折线图end*/

	/*制作折线图入场动画begin*/
	function _makePolyLineIn(context,config){
		var s = 0;
		for(var i=0; i<100; i++){
			setTimeout(function(){
				s+=0.01;
				_createPolyLine(s,context,config);
			},i*10);
		}
	}/*制作折线图入场动画end*/
	/*制作折线图离场动画begin*/
	function _makePolyLineOut(context,config){
		var s = 1;
		for(var i=0; i<100; i++){
			setTimeout(function(){
				s-=0.01;
				_createPolyLine(s,context,config);
			},i*10+500);
		}
	}/*制作折线图离场动画end*/

	/*创建grid-canvas begin*/
	function _createGridCanvas(h5_ComponentBase,config){
		var w = config.width;
		var h = config.height;
		/*加入一个canvas画布，用作网格线的背景*/
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = context.width = w;
		canvas.height = context.height = h;
		_createGrid(h5_ComponentBase,context,config);
		return canvas;
	};/*创建grid-canvas end*/

	/*创建polyline-canvas begin*/
	function _createPolyLineCanvas(config){
		var w = config.width;
		var h = config.height;
		/*加入一个canvas画布，用作折线的背景*/
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = context.width = w;
		canvas.height = context.height = h;
		return canvas;
	};/*创建polyline-canvas end*/

	/*绘制网格线begin*/
	function _createGrid(h5_ComponentBase,context,config){
			var w = config.width;
			var h = config.height;
			var lines = 10;/*100 ->10精度*/
			var length = config.data.length;
			var stepH = h/lines;/*水平线间距*/
			var stepW = w/(length+1);/*垂直线间距*/
			context.beginPath();
			context.lineWidth  = 1;
			context.strokeStyle = "#aaa";
			/*水平网格线*/
			for (var i = 0; i <= lines; i++) {
				context.moveTo(0,i*stepH);
				context.lineTo(w,i*stepH);
			}
			/*垂网格线*/
			for (var i = 0; i <= length+1; i++) {
				var x = i * stepW;
				var y = h;
				context.moveTo(x,0);
				context.lineTo(x,y);
				/*增加项目名称的dom*/
				var text = $('<div class="text"></div>');
				if (config.data[i]) {
					text.text(config.data[i][0]);	
				}
				var textW = stepW/2 >> 0;
				text.width(textW);
				text.css('left',(x+textW)/2);
				h5_ComponentBase.append(text);
			}
			context.stroke();
	}/*绘制网格线end*/


	/*绘制折线begin*/
	function _createPolyLine(percent,context,config){
			var w = config.width;
			var h = config.height;
			context.clearRect(0,0,w,h);/*先清空上一次画布*/
			context.beginPath();
			context.lineWidth  = 2;
			context.font = "22px Microsoft Yahei";
			var length = config.data.length;
			var stepX = w/(length+1);
			var lastX;
			$.each(config.data,function(index,item){
				var x = (index+1)*stepX;
				var y = (1-item[1]*percent)*h;
				/*连线*/
				context.strokeStyle = "#E23636";
				context.lineTo(x,y);
				/*标出点*/
				context.arc(x,y,5,0,2*Math.PI);
				/*添加文字*/
				context.fillStyle = item[2] ? item[2] : "#595959" ;
				context.fillText(((percent*item[1]*100)>>0)+'%',x+10,y+10);
				lastX = x;
			});
			context.stroke();
			context.fillStyle = "rgba(226,115,27,0)";
			/*绘制阴影*/
			context.lineTo(lastX,h);
			context.lineTo(stepX,h);
			context.fillStyle = "rgba(226,115,27,0.2)";
			context.fill();
	}/*绘制折线end*/


	return {
		H5ComponentPolyLine:H5ComponentPolyLine
	};
});