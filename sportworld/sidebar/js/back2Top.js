define(['jquery','scroll'],function($,scroll){
	function Back2Top(el,config){
		this.config = $.extend({},Back2Top.DEFAULT_CONFIG,config);
		this.$el = $(el);
		this.scroll = new scroll.Scroll({
			pos:this.config.pos,
			time:this.config.time
		});
		this._checkPos();
		this.$el.on('click',$.proxy(this._move,this));
		// $('#back2Top').on('click',checkPos);
		var _this_ = this;
		$(window).on('scroll',function(){
			_this_._checkPos();
			//稍微等一秒，等css渲染完毕，再执行margin-top的计算
			window.setTimeout(_this_._computeMarginTop,1000);
		});
		
	}
	Back2Top.prototype._computeMarginTop = function(){
		var container = $(".sidebar-container");
		$(container).css('margin-top',-container.height()/2);
	};
	/*校验滚动条的位置，判断是否需要隐藏“返回顶部”*/
	Back2Top.prototype._checkPos = function(){
		console.log(1);
		var win = $(window);
		back2Top = this.$el;
		if (win.scrollTop() > this.config.pos) {
			back2Top.fadeIn();
		}else{
			back2Top.fadeOut();
		}
	}
	Back2Top.prototype._move = function(){
		var config = this.config;
		if (config.mode === "move") {
			this.scroll.move2Pos();
		}else if(config.mode === "go"){
			this.scroll.go2Pos();
		}
		// $.proxy(new scroll.Scroll({pos:0,time:2000}).move2Pos(),this);
	};
	/*默认配置，放在静态变量中*/
	Back2Top.DEFAULT_CONFIG = {
		mode:"move",
		pos:$(window).height(),
		time:800
	};
	/*注册jquery插件 begin*/
	$.fn.extend({
		back2Top:function(config){
			return this.each(function(){
				new Back2Top(this,config);
			});
		}
	});
	/*注册jquery插件 end*/
	/*return {
		Back2Top:Back2Top
	};*/
	// $.fn.extend({ 
	// 	back2Top:function(){ 
	// 		return this.each({ 
	// 				new Back2Top(); 
	// 			}); 
	// 		}
	// 	} 
	// });
});