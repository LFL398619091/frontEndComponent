// var common = require('common');
function $(s){
	return document.querySelectorAll(s);
}


var line,gradientColor;

var liArr = $("#type li");
/**
* @authors:jameslin
* @date:2016-10-01 17:48:30
* @description:效果切换开关
*/
for(var i =0;i<liArr.length;i++){
	liArr[i].onclick = function(){
		for(var j=0;j<liArr.length;j++){
			liArr[j].className = "";
		}
		this.className= "selected";
		draw.type = this.getAttribute("data-type");
	}
}


var volume = $("#volume")[0];

var config = {
	size : 64,
	percent : volume.value/volume.max,
	visualizer : draw,
	isMove:false,
	isOpacity:false
};

var musicVisualizer = new MusicVisualizer(config);

var musicList = $("#musicList li");
for(var i=0;i<musicList.length;i++){
	musicList[i].onclick =function(){
		for(var j=0;j<musicList.length;j++){
			musicList[j].className ="";
		}
		this.className="selected";
		var musicName = this.title;
		musicVisualizer.play("/media/"+musicName);
	};
}

volume.onchange=function(){
	var percent = this.value/this.max;
	musicVisualizer.ctrlVolume(percent);
};


var box = $("#box")[0];
var height,width;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
window.ctx = ctx;/*方便调试*/
box.appendChild(canvas);


var dots = [];
function getRandom(m,n){
	return Math.round(Math.random()*(n-m)+m);
}

function getDots(){
	dots = [];
	for(var i=0;i<config.size;i++){
		var x = getRandom(0,width);
		var y = getRandom(0,height);
		var color;
		if (config.isOpacity) {
			color = "rgba("+getRandom(0,255)+","+getRandom(0,255)+","+getRandom(0,255)+",0)";
		}else{
			color = "rgb("+getRandom(0,255)+","+getRandom(0,255)+","+getRandom(0,255)+")";
		}
		 
		dots.push({
			x:x,
			y:y,
			xOffSetRate:getRandom(1,3),
			color:color,
			cap:0
		});
	}
}

/**
* @authors:jameslin
* @date:2016-10-01 17:48:30
* @description:根据频域数据绘制canvas矩形
*/
function draw(array){
	ctx.clearRect(0,0,width,height);
	ctx.fillStyle = line;
	var w = width/config.size;
	for(var i=0;i<config.size;i++){
		var dot = dots[i];
		if(draw.type == "column"){
			var recW = w*0.6;//产生间隔
			var h = array[i]/256 * height;
			var capW = recW;
			var capH = recW >10 ? 10 :recW;
			ctx.fillRect(w*i,height-h,recW,h);
			ctx.fillRect(w*i,height-(dot.cap+capH),capW,capH);
			dot.cap--;
			if (dot.cap<0) {
				dot.cap = 0;
			}
			if (h > 0 && dot.cap < h+40) {
				dot.cap = h+40 > height - capH ? height -capH : h+40;
			}
		}else if(draw.type == "dot"){
			ctx.beginPath();
			var r = array[i]/256 *((height>width?width:height)/12);//最大半径50
			if (config.isMove) {
				dot.x = dot.x + dot.xOffSetRate;
				if (dot.x > width) {
					dot.x = r;
				}
			}
			ctx.arc(dot.x,dot.y,r,0,2*Math.PI,true);
			/*散点图的线性色*/
			gradientColor = ctx.createRadialGradient(dot.x,dot.y,0,dot.x,dot.y,r);
			gradientColor.addColorStop(0,"#fff");
			gradientColor.addColorStop(1,dot.color);
			ctx.fillStyle = gradientColor;
			ctx.fill();
			// ctx.strokeStyle = "#ff7676";
			// ctx.stroke();
		}
	}
}
draw.type ="column";
/**
* @authors:jameslin
* @date:2016-10-01 17:48:30
* @description:窗体改变大小时，canvas的宽高也能动态改变,适配不同尺寸浏览器
*/
function resize(){
	height = box.clientHeight;
	width = box.clientWidth;
	canvas.height = height;
	canvas.width = width;
	getDots();
}

/**
* @authors:jameslin
* @date:2016-10-01 17:48:30
* @description:初始化canvas宽高
*/

window.onresize = resize;


init();



/**
* @authors:jameslin
* @date:2016-10-01 17:48:30
* @description:初始化函数
*/
function init(){
	resize();
	/*柱状图的线性色*/
	line = ctx.createLinearGradient(0,0,0,height);
	line.addColorStop(0,"red");
	line.addColorStop(0.5,"yellow");
	line.addColorStop(1,"green");
}
