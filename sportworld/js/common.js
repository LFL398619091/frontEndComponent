define(['jquery'],function($){
	function common(){
		
	}
	/*jquery 扩展函数*/
	$.fn.extend({
		/*给某个元素添加class，给其他元素移除class*/
		registerAddSelfRemoveSiblings:function(addElement,removeElement,classObj){
			return this.each(function(){
				$(this).on('click',function(){
					$(this).addSelfRemoveSiblings(addElement,removeElement,classObj);
				});
			});
		},
		addSelfRemoveSiblings:function(addElement,removeElement,classObj){
			if (addElement.hasClass(classObj.addClass)) {
				return false;
			}else{
				addElement.addClass(classObj.addClass)
				removeElement.removeClass(classObj.addClass);
			}
		}
	});
});