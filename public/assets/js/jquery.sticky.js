/*! Sticky Nav - v0.6.3-wip - 2013-12-17*/
(function($){var defaults={topSpacing:0,bottomSpacing:0,className:'is-sticky',wrapperClassName:'sticky-wrapper',center:false,getWidthFrom:''},$window=$(window),$document=$(document),sticked=[],windowHeight=$window.height(),scroller=function(){var scrollTop=$window.scrollTop(),documentHeight=$document.height(),dwh=documentHeight-windowHeight,extra=(scrollTop>dwh)?dwh-scrollTop:0;for(var i=0;i<sticked.length;i++){var s=sticked[i],elementTop=s.stickyWrapper.offset().top,etse=elementTop-s.topSpacing-extra;if(scrollTop<=etse){if(s.currentTop!==null){s.stickyElement.css('position','').css('top','');s.stickyElement.parent().removeClass(s.className);s.currentTop=null;}}else{var newTop=documentHeight-s.stickyElement.outerHeight()-s.topSpacing-s.bottomSpacing-scrollTop-extra;if(newTop<0){newTop=newTop+s.topSpacing;}else{newTop=s.topSpacing;}if(s.currentTop!=newTop){s.stickyElement.css('position','fixed').css('top',newTop);if(typeof s.getWidthFrom!=='undefined'){s.stickyElement.css('width',$(s.getWidthFrom).width());}s.stickyElement.parent().addClass(s.className);s.currentTop=newTop;}}}},resizer=function(){windowHeight=$window.height();},methods={init:function(options){var o=$.extend(defaults,options);return this.each(function(){var stickyElement=$(this);var stickyId=stickyElement.attr('id');var wrapper=$('<div></div>').attr('id',stickyId+'-sticky-wrapper').addClass(o.wrapperClassName);stickyElement.wrapAll(wrapper);if(o.center){stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});}if(stickyElement.css("float")=="right"){stickyElement.css({"float":"none"}).parent().css({"float":"right"});}var stickyWrapper=stickyElement.parent();stickyWrapper.css('height',stickyElement.outerHeight());sticked.push({topSpacing:o.topSpacing,bottomSpacing:o.bottomSpacing,stickyElement:stickyElement,currentTop:null,stickyWrapper:stickyWrapper,className:o.className,getWidthFrom:o.getWidthFrom});});},update:scroller};if(window.addEventListener){window.addEventListener('scroll',scroller,false);window.addEventListener('resize',resizer,false);}else if(window.attachEvent){window.attachEvent('onscroll',scroller);window.attachEvent('onresize',resizer);}$.fn.sticky=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.sticky');}};$(function(){setTimeout(scroller,0);});})(jQuery);

/*-----------------------------------------------------------------------------------*/
/*	LEFT MENU
/*-----------------------------------------------------------------------------------*/
$(document).ready(function($){
	let $lateral_menu_trigger = $('#cd-menu-trigger'),
		$content_wrapper = $('.cd-main-content'),
		$navigation = $('header');

	//open-close lateral menu clicking on the menu icon
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();
		
		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
		
		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('click', function(event){
		if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$navigation.removeClass('lateral-menu-is-open');
			$content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('#cd-lateral-nav').removeClass('lateral-menu-is-open');
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}}
	});
	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});
});
/*-----------------------------------------------------------------------------------*/
/*	Go TO TOP
/*-----------------------------------------------------------------------------------*/
let offset = 300,
	//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
	offset_opacity = 1200,
	//duration of the top scrolling animation (in ms)
	scroll_top_duration = 700,
	//grab the "back to top" link
	$back_to_top = $('.cd-top');

//hide or show the "back to top" link
$(window).scroll(function(){
	( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
	if( $(this).scrollTop() > offset_opacity ) { 
		$back_to_top.addClass('cd-fade-out');
	}
});
//smooth scroll to top
$back_to_top.on('click', function(event){
	event.preventDefault();
	$('body,html').animate({
		scrollTop: 0 ,
	 	}, scroll_top_duration
);
});

/*-----------------------------------------------------------------------------------*/
/* 		Active Menu Item on Page Scroll
/*-----------------------------------------------------------------------------------*/
$(window).scroll(function() {
		Scroll();
});	
$('.scroll a').click(function() {  
	$('html, body').animate({scrollTop: $(this.hash).offset().top -0}, 800);
		return false;
});
// User define function
function Scroll() {
let contentTop      =   [];
let winTop      =   $(window).scrollTop();
let rangeTop    =   5;

$.each( contentTop, function(i){
if ( winTop > contentTop[i] - rangeTop ){
	$('nav li.scroll')
	  .removeClass('active')
		.eq(i).addClass('active');			
}}  
)}


//Toggle Menu on click in Header
$(".menu-shows").on('click', function(){
	$(".menu-shows, .menu-shows-inner, .menu").toggleClass("active");
});
//Togle Menu on click in Header
$('#toggle').on('click', function() {
    $(this).toggleClass('toggle-active');
    $('#overlay').toggleClass('nav-active');
});


/*-----------------------------------------------------------------------------------*/
/*    CONTACT FORM
/*-----------------------------------------------------------------------------------*/
function checkmail(input){
  let pattern1=/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  	return pattern1.test(input);}
    function proceed(){
    	let name = document.getElementById("name");
		let email = document.getElementById("email");
		let company = document.getElementById("company");
		let web = document.getElementById("website");
		let msg = document.getElementById("message");
		let error = "";
		if(name.value === ""){
		name.className = 'error';
	  	  return false;}    
		  else if(email.value === ""){
		  email.className = 'error';
		  return false;}
		    else if(checkmail(email.value)===false){
		        alert('Please provide a valid email address.');
		        return false;}
		    else if(company.value === ""){
		        company.className = 'error';
		        return false;}
		   else if(web.value === ""){
		        web.className = 'error';
		        return false;}
		   else if(msg.value === ""){
		        msg.className = 'error';
		        return false;}
		   else 
		  {
	$.ajax({
		type: "POST",
		url: "php/submit.php",
		data: $("#contact_form").serialize(),
		success: function(msg){
		//alert(msg);
		if(msg){
			$('#contact_form').fadeOut(1000);
			$('#contact_message').fadeIn(1000);
				document.getElementById("contact_message");
			 return true;
		}}
	});
}}


