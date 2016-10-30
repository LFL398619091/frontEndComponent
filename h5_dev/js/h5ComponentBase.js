/*基本图文组件对象*/
define(['jquery','common'],function($,common){
	function H5ComponentBase(config){
		this.config = $.extend(true,{},this.config,config);
	}
	H5ComponentBase.prototype.config = {
		type:"base",
		name:"h5_component_xxx",
		className:'h5_component h5_component_base',
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
		delay:0
	};
	H5ComponentBase.prototype.createComponentBase=function(){
		var config = this.config;
		var divStr = "<div {0} {1} {2}></div>";
		var idStr = config.id || "";
		var id = idStr?"id='"+idStr+"'" :"";
		var nameStr = config.name || "";
		var classNameStr = config.className || "";
		classNameStr = nameStr ? classNameStr+" "+nameStr : classNameStr;
		var className = classNameStr ? "class='"+classNameStr+"'":"";
		divStr = divStr.myStringFormat(id,name,className);
		var componentDiv = $(divStr);
		/*设置自定义样式*/
		config.text && componentDiv.text(config.text);
		config.width && componentDiv.width(config.width/2);
		config.height && componentDiv.height(config.height/2);
		config.css && componentDiv.css(config.css);
		if (config.center) {
			componentDiv.css({
				left:'50%',
				marginLeft:((config.width/4)*(-1))+'px'
			});
		}
		var func = config.func;
		if (func) {
			componentDiv.on(func.name,function(){
				eval(func.callBack);
			});
		}
		config.bg && componentDiv.css('backgroundImage','url('+config.bg+')');
		/*注册事件*/
		componentDiv.on('onLeave',function(){
			setTimeout(function(){
				config.animateOut && componentDiv.animate(config.animateOut);
				var name = config.name;
				componentDiv.removeClass(name+"_arrive");
				componentDiv.addClass(name+"_leave");
			},config.delay || 0);
			return false;/*阻止事件冒泡*/
		});
		componentDiv.on('onArrive',function(){
			setTimeout(function(){
				config.animateIn && componentDiv.animate(config.animateIn);
				var name = config.name;
				componentDiv.removeClass(name+"_leave");
				componentDiv.addClass(name+"_arrive");
			},config.delay || 0);
			return false;/*阻止事件冒泡*/
		});
		return componentDiv;
	};
	return {
		H5ComponentBase:H5ComponentBase
	};
});