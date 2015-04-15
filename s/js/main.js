window.ss = window.ss || {
	views: {},
	models: {},
	controllers: {},
	rounter: null
};
window.ss.views.App = Backbone.View.extend({
	el: '.js-app',
	events: function() {
		return Modernizr.touch ? {
			'click .js-wishBtnCheckbox': 'wish',
			'click .js-cancelWish': 'cancelWish',
			'click .js-next-buton': 'webkitIt',
			'click .js-menuShow': 'showHideMenu'
		} : {
			'click .js-wishBtnCheckbox': 'wish',
			'click .js-cancelWish': 'cancelWish',
			'click .js-next-buton': 'webkitIt',
			'click .js-menuShow': 'preventDef',
			'click .js-search-field': 'resizeSearch',
			'mouseenter .js-menu': 'showHideMenu',
			'mouseleave .js-menu': 'showHideMenu',
			'mouseenter .js-menuShow': 'showHideMenu',
			'mouseleave .js-menuShow': 'showHideMenu'
		}
		
	},

	bodyFunc: function(e) {
		if (!($(e.target.offsetParent).parents('.js-search-field').length)){
			$('.js-search-field').removeClass('expand');
		}
	},

	resizeSearch: function(e) {
		$(e.currentTarget).addClass('expand');
	},

	preventDef: function(e) {
		e.preventDefault();
	},

	showHideMenu: function(e) {
		var $dropdown = $('.js-dropdown'),
			$backMask = $('.js-mask');
		if ($(e.currentTarget).hasClass('js-menu')){
			if ($dropdown.hasClass('active')){
				$dropdown.removeClass('active');
				$backMask.removeClass('active');
				$('.js-menuShow').removeClass('active');
			} else {
				$dropdown.addClass('active');
				$backMask.addClass('active');
			}
		} else if ($(e.currentTarget).hasClass('js-menuShow')){
			var currentMenuName = e.currentTarget.attributes.href.nodeValue,
				$link = $(e.currentTarget),
				$currentMenu = $dropdown.find('.js-dropdown-container[data-type="' + currentMenuName + '"]');
			
			$('.js-menuShow').removeClass('active');
			$link.addClass('active');
			$('.js-dropdown-container').removeClass('active');
			$currentMenu.addClass('active');
		}
	},

	// showMenu: function(e) {
	// 	$('.js-dropdown').addClass('active');
	// 	console.log($(e.currentTarget));
	// },

	// hideMenu: function(e) {
	// 	$('.js-dropdown').removeClass('active');
	// 	console.log(e);
	// },

	cancelWish: function (e) {
		e.preventDefault();
		var $currentTarget = e.currentTarget;

		$currentTarget.parents('.js-product').find('.js-wishBtnCheckbox').trigger('click');
	},
	progressTimer: function () {
		
	},
	setActiveSlide: function (id) {

	},



	wish: function (e) {
		var $currentTarget = $(e.currentTarget);
		console.log($currentTarget.parents('.js-product'));
		if ($currentTarget.is(':checked')) {
			$currentTarget.closest('.js-wishBtn').addClass('checked');
			$currentTarget.parents('.js-product').find('.js-wishBlock').addClass('show');
		} else {
			$currentTarget.closest('.js-wishBtn').removeClass('checked');
			$currentTarget.parents('.js-product').find('.js-wishBlock').removeClass('show');
		}

	},
	fancybox: function(){
		$('.js-fancybox').fancybox({
			padding: 0,
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0"></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><svg class="icon_close_thin"><use xlink:href="/img/icons.svg#close_thin" /></svg></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			}
		});
	},
	initialize: function () {
		this.views = {};
		// Rating init
		this.$('.js-rating').barrating('show', {
			showSelectedRating: true,
			reverse: false,
			readonly: true
		});
		// Progress timer
		this.progressTimer();
		this.render();
		if (this.$el.hasClass('home')){
			this.views.carousel = new window.ss.views.Carousel({refreshTimeout: 2000});
		}
		if (this.$el.hasClass('product-page')){
			this.views.gallery = new window.ss.views.Gallery({});
		}
		// 
		this.fancybox();
		$('body').bind('click', this.bodyFunc);
	},
	webkitIt: function (e) {
		e.preventDefault();
		var $currentTarget = $(e.currentTarget),
			$parent = $currentTarget.parents('.js-slide'),
			index = parseInt($parent.attr('data-slide')),
			totalSlides = $currentTarget.parents('.js-webkitContainer').find('.js-slide').length,
			$nextSlide = null,
			$allButtons = $currentTarget.parents('.js-webkitContainer').find('.js-next-buton')
		;
		if (!($currentTarget.hasClass('disabled'))){
			$parent.removeClass('active');
			if ((index + 1) > totalSlides){
				$nextSlide = $(".js-slide[data-slide='" + 1 + "'");
			} else {
				$nextSlide = $(".js-slide[data-slide='" + (index + 1) + "'")
			}
			_.delay(function(){
				$nextSlide.addClass('active');
			}, 150);
			$allButtons.addClass('disabled');
			_.delay(function(){
				$nextSlide.addClass('even').removeClass('odd');
				$parent.addClass('odd').removeClass('even');
				$allButtons.removeClass('disabled');
			}, 1000);
		}
	},
	render: function () {

	}
});
window.ss.views.Carousel = Backbone.View.extend({
	el: '.js-carousel',
	events: {
		'click .js-carouselLink': 'changeSlideClick'
	},
	initialize: function () {
		this.currentItem = 0;
		this.$links = this.$('.js-carouselLink');
		this.$slideHolder = this.$('.js-carouselSlides');
		this.$items = this.$('.js-carouselItem');
		this.timeout = 0;
		if (this.$el.attr('data-autorefresh')){
			this.restartTimer();
		}
	},
	changeSlideClick: function(e) {
		e.preventDefault();
		this.currentItem = $(e.currentTarget).parent().index();
		this.changeSlide();
	},
	changeSlide: function() {
		// Check boundaries
		this.currentItem = (this.currentItem >= this.$links.length) ?
		    0 :
		    this.currentItem;
		// Set links colors
		this.$links.filter('.active').removeClass('active');
		this.$links.eq(this.currentItem).addClass('active');
		// Set slide
		this.$slideHolder.transition({y: - this.currentItem * 350});

		this.restartTimer();
	},
	restartTimer: function() {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.nextSlide.bind(this), 5000);
	},
	nextSlide: function() {
		this.currentItem += 1;
		this.changeSlide();
	}
});
window.ss.views.Catalog = Backbone.View.extend({
	el: '.js-catalog',
	events: {
		'click .js-sort': 'sort'
	},
	sort: function(){
		
	}
});
window.ss.views.Gallery = Backbone.View.extend({
	el: '.js-gallery',
	events: {
		'click .js-listItem': 'showImage'
	},
	initialize: function(){
		var self = this;
		setInterval(function(){
			if (parseInt($(self.el).find('.js-listItem.active').index()) + 1 !== parseInt($(self.el).find('.js-listItem').length)){
				var index = parseInt($(self.el).find('.js-listItem.active').index()) + 2;
				$('.js-listItem[data-slideId="'+ index +'"]').trigger('click');
			} else {
				$('.js-listItem').eq(0).trigger('click');
			}
		}, 10000);
	},
	showImage: function(e){
		e.preventDefault();
		var $self = $(e.currentTarget);
		var slideId = parseInt($(e.currentTarget).attr('data-slideId'));
		$('.js-listItem.active').removeClass('active');
		$self.addClass('active');
		$('.js-fancybox').fadeOut();
		$(this.el).find('.js-fancybox[data-slideId="' + slideId + '"]').fadeIn();
	}
})
$(function () {
	window.ssApp = new window.ss.views.App();
});
//# sourceMappingURL=main.js.map