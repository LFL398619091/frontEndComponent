define(['jquery'],function($){
	function Scroll(config){
		this.config = $.extend({},Scroll.DEFAULT_CONFIG,config);
	}
	Scroll.DEFAULT_CONFIG = {
		time:800,
		pos:200
	};
	Scroll.prototype.move2Pos=function(){
		var time = this.config.time;
			pos = this.config.pos;
		var scroll = $('html,body');
			scrollTop = $(window).scrollTop();
		if (!scroll.is(':animated') && scrollTop != pos) {
			scroll.animate({
				scrollTop:pos
			},time,null);
		}
	};
	Scroll.prototype.go2Pos=function(){
		var pos = this.config.pos;
		var scroll = $('html,body');
			scrollTop = $(window).scrollTop();
		if (scrollTop != pos) {
			scroll.scrollTop(pos);
		}
	}
	return {
		Scroll:Scroll
	}
});