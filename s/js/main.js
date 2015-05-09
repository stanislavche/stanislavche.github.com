window.ss = window.ss || {
	views: {},
	models: {},
	controllers: {},
	rounter: null
};
window.ss.views.App = Backbone.View.extend({
	el: '.js-app',
	nameInput: false,
	phoneInput: false,
	events: function() {
		return Modernizr.touch ? {
			'click .js-menu': 'showHideMenu',
			'click .js-menuShow': 'showHideMenu',
			'click .js-search-field': 'resizeSearch',
			'click .js-showReview': 'reviewShow',
			'click .js-sendReview': 'reviewHide',
			'click .js-order': 'showPopup',
			'click .js-wishBtnCheckbox': 'wish',
			'click .js-cancelWish': 'cancelWish',
			'click .js-next-buton': 'webkitIt',
			'click .js-orderSend': 'sendOrder',
			'click .js-orderCancel': 'orderCancel',
			'keyup .js-inputName': 'changeName',
			'keydown .js-inputPhone': 'changePhone',
			'input .js-inputPhone': 'validatePhone',
			'click .js-closePopup': 'closeFancybox'
		} : {
			'click .js-menuShow': 'preventDef',
			'mouseenter .js-menu': 'showHideMenu',
			'mouseleave .js-menu': 'showHideMenu',
			'mouseenter .js-menuShow': 'showHideMenu',
			'mouseleave .js-menuShow': 'showHideMenu',
			'click .js-search-field': 'resizeSearch',
			'click .js-showReview': 'reviewShow',
			'click .js-sendReview': 'reviewHide',
			'click .js-order': 'showPopup',
			'click .js-wishBtnCheckbox': 'wish',
			'click .js-cancelWish': 'cancelWish',
			'click .js-next-buton': 'webkitIt',
			'click .js-orderSend': 'sendOrder',
			'click .js-orderCancel': 'orderCancel',
			'keyup .js-inputName': 'changeName',
			'keydown .js-inputPhone': 'changePhone',
			'input .js-inputPhone': 'validatePhone',
			'click .js-closePopup': 'closeFancybox'
		};		
	},

	closeFancybox: function(e){
		e.preventDefault();
		$.fancybox.close();
	},

	changeName: function(event){
		var $element = $(event.currentTarget);
		if($element.val().length == 0){
			this.nameInput = false;
		} else {
			this.nameInput = true;
		}
	},

	validatePhone: function(event){
		var $element = $(event.currentTarget);
		if (!isNaN($element.val())){
			if ($element.val().length == 11){
				$element.addClass('validate');
				this.phoneInput = true;		
			} else {
				$element.removeClass('validate');
				this.phoneInput = false;
			}
		} else {
			$element.removeClass('validate');
			event.preventDefault();
			this.phoneInput = false;
			_.delay(function(){
				$element.val('');
			}, 300);
		}
	},

	changePhone: function(event){
		var value = $(event.currentTarget).val(),
			key = event.which ? event.which : event.keyCode
		;
		if (key < 48 || key > 57 || value.length > 10){
			if (key !== 8){
				event.preventDefault();
				return false;
			}
		}
	},

	sendOrder: function(e){
		e.preventDefault();
		var 
			$form = $(e.currentTarget).closest('.js-orderContainer'),
			formData = $form.find('.js-order-form').serialize(),
			self = this
		;
		if (this.nameInput && this.phoneInput){
			$.ajax({
				type: "POST",
				url: '#',
				data: formData,
				success : function( response ) {
					$form.find('.js-step1').removeClass('active');
					$form.find('.js-popupName').text($form.find('.js-inputName').val());
					$form.find('.js-congratContainer').addClass('active');
					$form.find('.js-phoneTime').text($form.find('.js-callHours').val() + ':' + $form.find('.js-callMinutes').val());
					_.delay(function(){
						$.fancybox.resize;
					}, 2000);
				}
			});
		}
	},

	orderCancel: function(e){
		e.preventDefault();
		$(e.currentTarget).closest('.js-orderContainer').find('.js-order-form')[0].reset();
	},

	reviewShow: function(e){
		$(e.currentTarget).hide();
		$('.js-review').addClass('active');
	},

	reviewHide: function(e){
		e.preventDefault();
		$('.js-showReview').show();
		$('.js-review').removeClass('active');
	},

	bodyFunc: function(e) {
		if (!($(e.target.offsetParent).parents('.js-search-field').length) && !($(e.target).hasClass('js-listItem'))){
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
		$('.js-search-field').removeClass('expand');
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
			e.preventDefault();
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

		$(e.currentTarget).closest('.js-product').find('.js-wishBtnCheckbox').trigger('click');
	},
	progressTimer: function () {
		
	},
	setActiveSlide: function (id) {

	},



	wish: function (e) {
		var $currentTarget = $(e.currentTarget);
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
	showPopup: function(e){
		e.preventDefault();
		var $self = $(e.currentTarget);
		var productId = $(e.currentTarget).attr('data-id');
		$('.js-orderProduct').attr('value', productId);
		if (new Date().getUTCHours() + 3 >= 9 && new Date().getUTCHours() + 3 < 21){
			$('.order-popup__category').removeClass('active');
			$('.order-popup__online').addClass('active');
		} else {
			$('.order-popup__category').removeClass('active');
			$('.order-popup__offline').addClass('active');
		}
		$.fancybox.update();
	},
	order: function(e){
		var self = this;
		$('.js-order').fancybox({
			padding: 0,
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin fancybox-skin_white"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close js-orderCancel" href="javascript:;"><svg class="icon_close_thin"><use xlink:href="/img/icons.svg#close_small" /></svg></a>'
			},
			beforeShow: function() {
				$('#buy-popup').addClass('active');
			},
			afterShow: function() {
				$('.js-callHours, .js-callMinutes').selectmenu( "refresh" );

			},
			afterClose: function() {
				$('#buy-popup').removeClass('active');
				$('body').find('.js-inputName').val('');
				$('body').find('.js-inputPhone').val('');
				$('body').find('.js-callHours').prop('selectedIndex',0);
				$('body').find('.js-callMinutes').prop('selectedIndex',0);
				$('body').find('.js-step1').addClass('active');
				$('body').find('.js-congratContainer').removeClass('active');
				$('body').find('.js-popupName').text('');
				$('body').find('.js-phoneTime').text('');
				$('body').find('.js-inputPhone').removeClass('validate');
				self.nameInput = false;
				self.phoneInput = false;
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
		if (this.$el.hasClass('catalog')){
			this.views.gallery = new window.ss.views.Catalog({});
		}
		// 
		this.fancybox();
		this.order();
		this.customSelect();
		$('body').bind('click', this.bodyFunc);
	},
	webkitIt: function (e) {
		e.preventDefault();
		var $currentTarget = $(e.currentTarget),
			$parent = $currentTarget.closest('.js-slide'),
			index = parseInt($parent.attr('data-slide')),
			totalSlides = $currentTarget.closest('.js-webkitContainer').find('.js-slide').length,
			$nextSlide = null,
			$allButtons = $currentTarget.closest('.js-webkitContainer').find('.js-next-buton')
		;
		if (!($currentTarget.hasClass('disabled'))){
			$parent.removeClass('active');
			if ((index + 1) > totalSlides){
				$nextSlide = $(".js-slide[data-slide='" + 1 + "']");
			} else {
				$nextSlide = $(".js-slide[data-slide='" + (index + 1) + "']")
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

	customSelect: function(){
		$('.js-callHours, .js-callMinutes').selectmenu({
			icons: { button: "custom-triangle" }
		});
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

	},
	initialize: function(){
		$('#slider-range').slider({
			range: true,
			min: 0,
			max: 200000,
			values: [ 0, 200000 ],
			slide: function( event, ui ) {
				$("#costFrom").val(ui.values[0]);
				$("#costTo").val(ui.values[1]);
			}
		});
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
});
window.ss.views.Order = Backbone.View.extend({
	el: '.js-orderPopup',
	events: {
		'click .js-sort': 'sort'
	},
	initialize: function(){
		var self = this;
	}
});
$(function () {
	window.ssApp = new window.ss.views.App();

	//youtube
	if ( $('.js-video-container')){
		var player,
			done = false,
			$container = $('.js-video-container'),
			videoUrl = $('#player').attr('data-src');
		window.onYouTubeIframeAPIReady = function() {
			
			player = new YT.Player('player', {
				height: '390',
				width: '640',
				videoId: videoUrl,
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange,
				}
			});
		};

		function onPlayerReady(event) {
			//event.target.playVideo();
		};

		function onPlayerStateChange(event) {
			if (event.data == YT.PlayerState.PLAYING) {
				$container.addClass('activated');
			} else {
				$container.removeClass('activated');
			}
		};

		function stopVideo() {
			player.stopVideo();
		}
	}
});
//# sourceMappingURL=main.js.map