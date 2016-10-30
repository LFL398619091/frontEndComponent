window.onload=function(){
	(function(){
		var container = document.getElementsByClassName("container")[0];
		waterfall(container,'box');	
		var beforeScrollTop = document.body.scrollTop;
		window.onscroll=function(){
			var afterScrollTop = document.body.scrollTop;
            var isDown = afterScrollTop - beforeScrollTop > 0;
            beforeScrollTop = afterScrollTop;
			if (isDown) {
				moveScroll(container,"box");
			}
		}
	})()	
}
// 滚动条监听事件
function moveScroll(parent,className){
	if (isNeedLoad(parent,className)) {
		var imgArr = [{"src":"./images/7.jpg"},{"src":"./images/8.jpg"},{"src":"./images/9.jpg"},{"src":"./images/10.jpg"},{"src":"./images/11.jpg"}];
		for(var i=0;i<imgArr.length;i++){
			var box = document.createElement("div");
			box.className = "box";
			parent.appendChild(box);
			var image = document.createElement("div");
			image.className = "image";
			box.appendChild(image);
			var img = document.createElement("img");
			img.src = imgArr[i].src;
			image.appendChild(img);
		}
		waterfall(parent,className);
	}
}
/*是否需要重新加载*/
function isNeedLoad(parent,className){
	var boxes = document.getElementsByClassName(className);
	var lastBox = boxes[boxes.length-1];
	var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
	var scrollHeight = window.scrollY;
	var standardHeight = clientHeight + scrollHeight;
	return parseInt(lastBox.style.top) < standardHeight;
}
/*根据类名获取列数*/
function getColumnsByClassName(parent,className){
	var containerW = document.body.clientWidth || document.documentElement.clientWidth;
	var boxes = document.getElementsByClassName(className);
	var boxW = boxes[0].offsetWidth;
	var columns = Math.floor(containerW / boxW);
	return columns;
}
/*瀑布流函数*/
function waterfall(parent,className){
	var boxes = document.getElementsByClassName(className);
	var boxArr = [];
	var columns = getColumnsByClassName(parent,"box");
	parent.style.width = ( boxes[0].offsetWidth * columns ) + "px";
	parent.style.margin = "0 auto";
	for(var i=0;i<boxes.length;i++){
		if (i<columns) {
			boxArr.push(boxes[i].offsetHeight);
			boxes[i].style.top = 0;
			if (i==0) {
				boxes[i].style.left = 0;
			}else{
				boxes[i].style.left = boxes[i-1].offsetWidth * i + "px";
			}
			
		}else{
			var minimum = Math.min.apply(null,boxArr);
			var minimumIndex = getMinimumIndex(boxArr,minimum);
			var currentHeight = boxes[i].offsetHeight;
			/*设置下一个box的位置*/
			boxes[i].style.top = minimum +"px";
			boxes[i].style.left = (boxes[0].offsetWidth * minimumIndex) +"px";
			boxArr[minimumIndex] = parseInt(boxes[i].style.top) + currentHeight;/*替换前一列的最低的那个box*/
		}
	}
}
/*获取数组中最小值的索引*/
function getMinimumIndex(arr,val){
	for(var i=0;i<arr.length;i++){
		if (val === arr[i]) {
			return i;
		}
	}
	//木有找到
	return -1;
};



