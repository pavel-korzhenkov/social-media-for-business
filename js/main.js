$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
if($('.slider__body').length>0){
	$('.slider__body').slick({
		dots: true,
		arrows: false,
		accessibility: false,
		slidesToShow: 3,
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 991.98,
			settings: {
				slidesToShow: 2,
			}
		},{
			breakpoint: 767.98,
			settings: {
				slidesToShow: 1,
			}
		}
		]
	});
}
$(window).resize(function(event) {
	adaptive_function();
})
function adaptive_header(w,h) {
	var headerMenu=$('.header-menuu');
	if (w<768) {
		if (!$('.header-top-menu').hasClass('done')) {
			$('.header-top-menu').addClass('done').appendTo(headerMenu);
		}
	} else {
		$.each($('.header-top-menu'), function(index, val) {
			if ($(this).hasClass('done')) {
				$(this).removeClass('done').prependTo($('.header-top__column').eq(1));
			}
		});
	}
}
function adaptive_footer(w,h) {
	if (w<768) {
		if ($('.footer-title').hasClass('first-time')) {
			$('.footer-title').removeClass('first-time');
			$('.footer-title').next().slideUp(0);
		}
		$('.footer-title').click(function(event) {
			$('.footer-title').not($(this)).removeClass('active');
			$('.footer-title').not($(this)).next().slideUp(300);
			$(this).toggleClass('active').next().slideToggle(300);
			jquery.stop();
		});
	} else {
		$('.footer-title').removeClass('active');
		$('.footer-title').next().slideDown(0);
		$('.footer-title').off();
		$('.footer-title').addClass('first-time');
	}
}
function adaptive_function() {
	var w=$(window).outerWidth();
	var h=$(window).outerHeight();
	adaptive_header(w,h);
	adaptive_footer(w,h);
}
adaptive_function();
//FIELDS
$('input[data-value], textarea[data-value]').each(function() {
	if (this.value == '' || this.value == $(this).attr('data-value')) {
		if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
			$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
		}else{
			this.value = $(this).attr('data-value');
		}
	}
	if(this.value!=$(this).attr('data-value') && this.value!=''){
		$(this).addClass('focus');
		$(this).parent().addClass('focus');
		if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
			$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
		}
	}
	$(this).click(function() {
		if (this.value == $(this).attr('data-value')) {
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','password');
			};
			this.value = '';
		};
	});
	$(this).blur(function() {
		if (this.value == '') {
			if(!$(this).hasClass('l')){
				this.value = $(this).attr('data-value');
			}
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','text');
			};
		};
		if($(this).hasClass('vn')){
			formValidate($(this));
		}
	});
});
//VALIDATE FORMS
$('form button[type=submit]').click(function(){
	var er=0;
	var form=$(this).parents('form');
	var ms=form.data('ms');
	$.each(form.find('.req'), function(index, val) {
		er+=formValidate($(this));
	});
	if(er==0){
		removeFormError(form);
		if(ms!=null && ms!=''){
			showMessageByClass(ms);
			return false;
		}
	}else{
		return false;
	}
});
function formValidate(input){
	var er=0;
	var form=input.parents('form');
	if(input.attr('name')=='email' || input.hasClass('email')){
		if(input.val()!=input.attr('data-value')){
			var em=input.val().replace(" ","");
			input.val(em);
		}
		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val()==input.attr('data-value')){
				er++;
			addError(input);
		}else{
			removeError(input);
		}
	}else{
		if(input.val()=='' || input.val()==input.attr('data-value')){
			er++;
			addError(input);
		}else{
			removeError(input);
		}
	}
	return er;
}
function showMessageByClass(ms){
	$('.popup').hide();
	popupOpen('message.'+ms,'');
}
function addError(input){
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
	if(input.hasClass('email')){
			var error='';
		if(input.val()=='' || input.val()==input.attr('data-value')){
			error=input.data('error');
		}else{
			error=input.data('error');
		}
		if(error!=null){
			input.parent().append('<div class="form__error">'+error+'</div>');
		}
	}else{
		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
		}
	}
	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function removeFormError(form){
	form.find('.form__generalerror').hide().html('');
}
function removeError(input){
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
	}
}
$('.wrapper').addClass('loaded');

var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}

let iconMenu = document.querySelector(".header-menuu__icon");
let body = document.querySelector("body");
let menuBody = document.querySelector(".header-menuu");
if (iconMenu) {
	iconMenu.addEventListener("click", function () {
		iconMenu.classList.toggle("active");
		body.classList.toggle("lock");
		menuBody.classList.toggle("active");
	});
}

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();
});