/*内容管理对象*/
define(['jquery','h5ComponentLoading','jquery_ui','fullPage','common','h5ComponentBase','h5ComponentPoint',
	'h5ComponentBar','h5ComponentVerticalBar','h5ComponentPolyLine','h5ComponentReda',
	'h5ComponentPie'],
	function($,h5ComponentLoading,jquery_ui,fullPage,common,h5ComponentBase,
	h5ComponentPoint,h5ComponentBar,h5ComponentVerticalBar,
	h5ComponentPolyLine,h5ComponentReda,h5ComponentPie){
	function H5(){

		this.id = ("h5_"+Math.random()).replace('.','_');
		this.el = $("<div class='h5' id='"+this.id+"'></div>").hide();
		this.pages = [];
		$('body').append(this.el);
	};
	/*页面初始化呈现*/
	H5.prototype.loader=function(images,currentPage){
		if (typeof h5ComponentLoading.H5ComponentLoading.loading === 'function') {
			if(!h5ComponentLoading.H5ComponentLoading.loading(images,this)){
				return;
			}
		}		
		$('.loading').remove();
		/*支持刷新时具有载入动画*/
		this.el.find('.h5_page').eq(0).find('.h5_component').trigger("onArrive");
		this.el.show();
		this.el.fullpage({
			onLeave:function(index,nextIndex,direction){
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad:function(currentPage,currentIndex){
				$(this).find('.h5_component').trigger('onArrive');
			}
		});
		if (currentPage) {
			$.fn.fullpage.moveTo(currentPage);
		}
		return this;
	}
	/*新增一个页*/
	H5.prototype.addPage=function(name,text){
		var page = $('<div class="section h5_page"></div>');
		if(name != undefined && name != ''){
			page.addClass('h5_page_'+name);
		}
		if(text != undefined && text != ''){
			page.text(text);
		}
		this.el.append(page);
		this.pages.push(page);
		if (typeof this.addFooter === 'function') {
			this.addFooter();
		}
		return  this;
	};
	/*新增一个组件*/
	H5.prototype.addComponent=function(config){
		var config = $.extend(true,{},{type:"base"},config);
		var component;
		switch(config.type){
			case "base":
				component = new h5ComponentBase.H5ComponentBase(config).createComponentBase();
				break;
			case "point":
				component = new h5ComponentPoint.H5ComponentPoint(config).createComponentPoint();
				break;
			case "bar":
				component = new h5ComponentBar.H5ComponentBar(config).createComponentBar();
				break;
			case "verticalBar":
			component = new h5ComponentVerticalBar.H5ComponentVerticalBar(config).createComponentVerticalBar();
			break; 	
			case "polyline":
			component = new h5ComponentPolyLine.H5ComponentPolyLine(config).createComponentPolyLine();
			break;
			case "reda":
			component = new h5ComponentReda.H5ComponentReda(config).createComponentReda();
			break;
			case "pie":
			component = new h5ComponentPie.H5ComponentPie(config).createComponentPie();
			break;
			default:
				break;	
		}
		var currentPage = this.pages.slice(-1)[0];
		currentPage.append(component);
		return this;
	};
	H5.prototype.addFooter=function(){
		this.addComponent({
			type:'base',
			name:'h5_component_footer',
			bg:'../images/footer.png',
			css:{
				opacity:0,
				bottom:-20,
				width:'100%',
				height:'20px'
			},
			animateIn:{
				opacity:1,
				bottom:'-1px'
			},
			animateOut:{
				opacity:0,
				bottom:-20
			},
			center:false
		});
	}
	return {
		H5:H5
	};
});