function MusicVisualizer(obj){
	this.source = null;
	this.count = 0;
	this.analyser = MusicVisualizer.ac.createAnalyser();
	this.size = obj.size;
	this.analyser.fftSize = this.size * 2;
	this.gainNode = MusicVisualizer.ac[MusicVisualizer.ac.createGain?"createGain":"createGainNode"]();
	this.gainNode.connect(MusicVisualizer.ac.destination);
	this.analyser.connect(this.gainNode);
	this.visualizer = obj.visualizer;
	this.xhr = new XMLHttpRequest();
	this.ctrlVolume(config.percent);
	this.visualize();
}
MusicVisualizer.ac = new (window.AudioContext || window.webkitAudioContext)();
MusicVisualizer.prototype.load = function(url,fun){
	this.xhr.open("GET",url);
	this.xhr.responseType = "arraybuffer";
	var _this_ = this;
	this.xhr.onload = function(){
		fun(_this_.xhr.response);
	}
	this.xhr.send();
}
MusicVisualizer.prototype.decodeData = function(arraybuffer,fun){
	MusicVisualizer.ac.decodeAudioData(arraybuffer,function(buffer){
		fun(buffer);
	},function(err){
		console.log(err);
	});
}
MusicVisualizer.prototype.play = function(url){
	this.source && this.stop();
	var _this_ = this;
	var n = ++this.count;
	this.load(url,function(arraybuffer){
		if (n!=_this_.count) {
			return;
		}
		_this_.decodeData(arraybuffer,function(buffer){
			if (n!=_this_.count) {
				return;
			}
			var bs = MusicVisualizer.ac.createBufferSource();
			bs.buffer = buffer;
			bs.connect(_this_.analyser);
			bs[bs.start?"start":"noteOn"](0);
			_this_.source = bs;
		});
	});
}
MusicVisualizer.prototype.stop = function(){
	this.source[this.source.stop?
	"stop":"noteOff"](0);
}
MusicVisualizer.prototype.ctrlVolume = function(percent){
	this.gainNode.gain.value = percent;
}
MusicVisualizer.prototype.visualize = function(){
	var array = new Uint8Array(this.analyser.frequencyBinCount);
	requestAnimationFrame = window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame;
	var _this_ = this;							
	function myAnimation(){
		/*将频域数据复制到array数组中*/
		_this_.analyser.getByteFrequencyData(array);
		_this_.visualizer(array);
		requestAnimationFrame(myAnimation);
	}
	requestAnimationFrame(myAnimation);		
}
