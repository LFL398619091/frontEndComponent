/**
 * dialog.js
 * @authors jameslin
 * @date    2016-10-08 09:41:25
 * @description dialog弹出框js
 */
 ;(function($){
 	var dialog = function(config){
 		
 		/*默认配置 begin*/
 		this.config = {
 			size:{
 				width:"auto",
 				height:"auto"
 			}/*dialog尺寸*/,
 			buttons:null,
 			type:"loading"/*dialog类型*/,
 			message:null/*提示语信息*/,
 			delay:{
 				time:null,
 				callback:null
 			}/*延迟关闭时间*/,
 			maskOpacity:null/*遮罩层透明度*/,
 			isAnimation:false/*是否开启动画*/,
 			isTouchOtherArea2Close:false
 		};
 		/*默认配置 end*/

 		if (config && $.isPlainObject(config)) {
 			this.isConfig = true;
 			$.extend(this.config,config); /*扩展自定义配置*/
 		}else{
 			this.isConfig = false;
 		}

 		
 	};
 	//纪录dialog层级（静态变量）
 	dialog.zIndex = 99999;
 	dialog.prototype = {
 		openDialog:function(){
 			/*创建dialog DOM begin*/
 			this.body = $("body");
 			//创建遮罩层
 			this.mask = $('<div class="g-dialog-container">');
 			//创建弹出框
 			this.win = $('<div class="dialog-window">');
 			//创建弹出框header
 			this.win_header = $('<div class="dialog-header"></div>');
 			//创建提示信息
 			this.win_content = $('<div class="dialog-content">');
 			//创建按钮区域
 			this.win_footer = $('<div class="dialog-footer">');
 			//渲染DOM
 			this.createDialog();
 			/*创建dialog dom end*/
 		},
 		/*创建弹出框 begin*/
 		createDialog:function(){
 			var _this_ = this,
 			config = this.config,
 			mask = this.mask,
 			win = this.win,
 			win_header = this.win_header,
 			win_content = this.win_content,
 			win_footer = this.win_footer,
 			body = this.body,
 			isConfig = this.isConfig;
 			//增加dialog的层级
 			mask.css('zIndex',++(dialog.zIndex));
 			if (!isConfig) {

 				//如果没有传递任何config，则弹出一个loading－dialog
 				win.append(win_header.addClass('loading'));
 				//设置动画
 				if (config.isAnimation) {
 					this.createAnimation();
 				}
 				mask.append(win);
 				body.append(mask);

 			}else{

 				//否则根据用户自定义参数进行dialog创建
 				win_header.addClass(config.type);
 				win.append(win_header);
 				if(config.message){
 					win_content.append(document.createTextNode(config.message));
 					win.append(win_content);
 				}
 				//设置对话框的宽高
 				if (config.size) {
 					if(config.size.width && config.size.width != 'auto'){
 						win.width(config.size.width);
 					}
 					if(config.size.height && config.size.height != 'auto'){
 						win.height(config.size.height);
 					}
 				}
 				//设置遮罩层的透明度
 				if (config.maskOpacity) {
 					win.css('backgroundColor','rgba(0,0,0,'+config.maskOpacity+')');
 				}
 				//设置按钮组
 				if (config.buttons) {
 					for (var i = 0 ; i < config.buttons.length ; i++) {
 						var button = this.createButtons(_this_,config.buttons[i]);
 						win_footer.append(button);
 					}
 				}
 				win.append(win_footer);
 				//设置动画
 				if (config.isAnimation) {
 					this.createAnimation();
 				}
 				mask.append(win);
 				
 				/*点击其他区域，关闭dialog begin*/
 				if (config.isTouchOtherArea2Close) {
 					/*阻止事件冒泡*/
 					win.click(function(e){
 						e.stopPropagation();
 					});
 					mask.click(function(){
 						_this_.closeDialog();
 					});
 				}/*点击其他区域，关闭dialog end*/

 				body.append(mask);

 				/*是否延时自动关闭 begin*/
 				if (config.delay && config.delay.time && /^[0-9]*$/.test(config.delay.time)) {
 					setTimeout(function(){
 						_this_.closeDialog();
 						if (config.delay.callback && typeof config.delay.callback == 'function') {
 							config.delay.callback();
 						}
 					},config.delay.time);
 				}/*是否延时自动关闭 end*/

 			}	
 		},/*创建弹出框 begin*/
 		/*动画函数 begin*/
 		createAnimation:function(){
 			var _this_ = this;
 			this.win.css("-webkit-transform","scale(0,0)");
 			window.setTimeout(function(){
 			_this_.win.css("-webkit-transform","scale(1,1)");
 			},100);
 		},/*动画函数 end*/
 		/*创建按钮 begin*/
 		createButtons:function(_this_,btn){
 			var button = $('<button></button>');
 			button.append(document.createTextNode(btn.text));
 			if(btn.skin){
 				button.addClass(btn.skin);
 			}
 			if (btn.callback) {
 				button.on('click',function(){
 					var res = btn.callback();
 					if (res) {
 						_this_.closeDialog();
 					}
 				});
 			}
 			return button;
 		},/*创建按钮 end*/

 		/*关闭对话框 begin*/
 		closeDialog:function(){
 			this.mask.remove();
 		}/*关闭对话框 end*/
 	};
 	window.dialog = dialog;
 	$.dialog = function(config){
 		return new dialog(config);
 	}
 	
 })(jQuery);
