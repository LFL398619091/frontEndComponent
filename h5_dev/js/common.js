/*全局js文件*/
define(['jquery'],function($){
	/*占位符替换的js函数*/
	String.prototype.myStringFormat = function(){
		if(arguments.length==0) return this; 
		/*js没有块级作用域*/
		for(var s=this, i=0; i<arguments.length; i++){
			s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]); 
		} 
		return s; 
	};
	$.fn.extend = {
		compare:function(DomA,DomB){
			var offsetA = DomA.offsetA;
			var offsetB = DomB.offsetB;
			/*不直接使用left，因为left有可能是auto*/
			var shadowA_X = [offsetA.left,DomA.width + offsetA.left];
			var shadowB_X = [offsetB.left,DomB.width + offsetB.left];
			var shadowA_y = [offsetA.top,DomA.height + offsetA.top];
			var shadowB_y = [offsetB.top,DomB.height + offsetB.top];
			// 检测x
			var inter_SecX = (shadowA_X[0] > shadowB_X[0] && shadowA_X[0] < shadowB_X[1])
							|| (shadowA_X[1]  > shadowB_X[0] && shadowA_X[1] < shadowB_X[1]);
			// 检测y
			var inter_SecY = (shadowA_Y[0] > shadowB_Y[0] && shadowA_Y[0] < shadowB_Y[1])
							|| (shadowA_Y[1] > shadowB_Y[0] && shadowA_Y[1] < shadowB_Y[1]);
			return 	inter_SecX && inter_SecY;						
		};
		reset:function(DomA,DomB){
			if($(DomA).top() != 'auto'){
				$(DomA).css('top',parseInt($(DomA).top())+$(DomB).height());
			}
			if($(DomB).bottom() != 'auto'){
				$(DomA).css('bottom',parseInt($(DomA).bottom())+$(DomB).height());
			}
		}
	};
});