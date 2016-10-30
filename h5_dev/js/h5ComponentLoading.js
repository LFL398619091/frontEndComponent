/*h5_loading.js文件*/
define(['jquery'],function($){
	function H5ComponentLoading(){
	};
	H5ComponentLoading.loading=function(images,h5){
		if(images && images.length!=0){
			this._length = images.length;
			this._count=0;
			var _this_ = this;
			for(var i=0;i<this._length;i++){
				var img = new Image();
				img.onload=function(){
					_this_._count++;
					var rate = ((_this_._count / _this_._length)*100 >>0 ) +'%';
					$('.rate').text(rate);
					if (rate === '100%') {
						h5.loader();
					}
				}
				img.src = images[i];
			}
			return false;
		}else{
			return true;
		}
	};
	return {
		H5ComponentLoading:H5ComponentLoading
	};
});