requirejs.config({
	paths:{
		jquery:"./jquery3.1.1.min",
		scroll:"../sidebar/js/common/scroll",/*不要加后缀.js*/
		back2Top:"../sidebar/js/back2Top"
	}
});
requirejs(['jquery','common','back2Top'],function($,common,back2Top){
	myFocus.set({id:'boxID'});
	/*注册下拉列表的点击事件*/
	$('#nav-dropdown-list li a').on('click',function(){
		var href = $(this).attr('href');
		var tab = $('#tab-list li a[href="'+href+'"]');
		tab.tab('show');
	});
	/*调用jquery插件,生成右侧工具条*/
	$('#back2Top').back2Top({mode:"move",pos:0});
	$('#btn1').click(function(){
		openDialog1();
	});
	function openDialog1() {
		var dialog = $.dialog({type:"dialog-loading",message:"加载中！！！",buttons:[{skin:"green",text:"确定",callback:function(){
			alert("11111111");
			return false;
		}},{skin:"red",text:"删除",callback:function(){
			alert("22222222");
			dialog.closeDialog();
		}}],isAnimation:true,delay:{
			time:null,
			callback:function(){
				alert('自动关闭后的回调函数');
			}
		},isTouchOtherArea2Close:true});
		dialog.openDialog();
	}
});
