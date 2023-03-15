"use strict";

// *** General Variables *** //
var $window = $(window),
	$document = $(document),
	$this = $(this),
	$html = $("html"),
	$body = $("body");


// *** On ready *** //
$document.on("ready", function () {
	responsiveClasses();
	fullscreenSection();
	imageBG();
	fitVideos();
	BGVideoYTPlayer();
	lightboxImage();
	lightboxGallery();
	lightboxIframe();
	bannerParallaxImageBG();
	sectionParallaxImageBG();
	formCTASubscribe1();
	scrollToAnchor();
	counterStats();
	sliderClients();
	sliderTestimonials();
});


// *** On load *** //
$window.on("load", function () {
	parallaxStellar();
})

	// *** On resize *** //
	.on("resize", function () {
		responsiveClasses();
		fullscreenSection();
		parallaxStellar();
	})

	// *** On scroll *** //
	.on("scroll", function () {
		scrollTopIcon();
	});



// *** Responsive Classes *** //
function responsiveClasses() {
	var jRes = jRespond([
		{
			label: "smallest",
			enter: 0,
			exit: 479
		}, {
			label: "handheld",
			enter: 480,
			exit: 767
		}, {
			label: "tablet",
			enter: 768,
			exit: 991
		}, {
			label: "laptop",
			enter: 992,
			exit: 1199
		}, {
			label: "desktop",
			enter: 1200,
			exit: 10000
		}
	]);
	jRes.addFunc([
		{
			breakpoint: "desktop",
			enter: function () { $body.addClass("device-lg"); },
			exit: function () { $body.removeClass("device-lg"); }
		}, {
			breakpoint: "laptop",
			enter: function () { $body.addClass("device-md"); },
			exit: function () { $body.removeClass("device-md"); }
		}, {
			breakpoint: "tablet",
			enter: function () { $body.addClass("device-sm"); },
			exit: function () { $body.removeClass("device-sm"); }
		}, {
			breakpoint: "handheld",
			enter: function () { $body.addClass("device-xs"); },
			exit: function () { $body.removeClass("device-xs"); }
		}, {
			breakpoint: "smallest",
			enter: function () { $body.addClass("device-xxs"); },
			exit: function () { $body.removeClass("device-xxs"); }
		}
	]);
}


// *** Fullscreen Section *** //
function fullscreenSection() {
	$(".fullscreen").css("height", $(window).height());
}


// *** RTL Case *** //
var HTMLDir = $("html").css("direction"),
	carouselRtl,
	selectRtl,
	slickDirection;

// If page is RTL
if (HTMLDir == "rtl") {
	$("body").addClass("direction-rtl");
	
	carouselRtl = true;
	selectRtl = "rtl";
	slickDirection = true;
} else {
	carouselRtl = false;
	selectRtl = false;
	slickDirection = false;
}


// *** Image Background *** //
function imageBG() {
	$(".img-bg").each(function () {
		var $this = $(this),
			imgSrc = $this.find("img").attr("src");

		if ($this.parent(".section-image").length) {
			$this.css("background-image", "url('" + imgSrc + "')");
		} else {
			$this.prepend("<div class='bg-element'></div>");
			var bgElement = $this.find(".bg-element");
			bgElement.css("background-image", "url('" + imgSrc + "')");
		}
		$this.find("img").css({ "opacity": 0, "visibility": "hidden" });
	});
}


// *** Fit Videos *** //
function fitVideos() {
	$("#full-container").fitVids();
}


// *** Background Videos *** //
function BGVideoYTPlayer() {
	$(".video-background").each( function() {
		$( this ).YTPlayer({
			mute: false,
			autoPlay: true,
			opacity: 1,
			containment: ".video-background",
			showControls: false,
			startAt: 0,
			addRaster: true,
			showYTLogo: false,
			stopMovieOnBlur: false
		});
	});
}


// *** Stellar Parallax *** //
function parallaxStellar() {
	$(function () {
		if ($body.hasClass("device-lg") || $body.hasClass("device-md") || $body.hasClass("device-sm")) {
			$.stellar({
				horizontalScrolling: false, // don't change this option
				// verticalScrolling: false,
				verticalOffset: 0,
				responsive: true, // false
			});
		}
	});
}


// *** Lightbox Iframe *** //
function lightboxIframe() {
	$(".lightbox-iframe").magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
}


// *** Lightbox Image *** //
function lightboxImage() {
	$(".lightbox-img").magnificPopup({
		type: 'image',
		gallery: {
			enabled: false
		},
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
}


// *** Lightbox Gallery *** //
function lightboxGallery() {
	$(".lightbox-gallery").magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		},
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
}


// *** Scroll Top Icon *** //
function scrollTopIcon() {
	var windowScroll = $(window).scrollTop();
	if (windowScroll > 800) {
		$(".scroll-top-icon").addClass("show");
	} else {
		$(".scroll-top-icon").removeClass("show");
	}
}

$(".scroll-top").on("click", function (e) {
	e.preventDefault();
	$("html, body").animate({
		scrollTop: 0
	}, 1200); //1200 easeInOutExpo
});


// *** Banner Parallax Image BG *** //
function bannerParallaxImageBG() {
	var bannerParallax = $(".banner-parallax"),
		imgSrc = bannerParallax.children("img:first-child").attr("src");

	bannerParallax.prepend("<div class='bg-element'></div>");
	var bgElement = bannerParallax.find("> .bg-element");
	bgElement.css("background-image", "url('" + imgSrc + "')").attr("data-stellar-background-ratio", 0.2);
}



// *** Scroll To Anchor *** //
function scrollToAnchor() {
	var stickyBar = $(".header-bar.sticky"),
		stickyBarHeight = stickyBar.height(),
		offsetDifference = (!stickyBar) ? 0 : stickyBarHeight;

	$(".scroll-to").on("click", function (e) {
		e.preventDefault();
		var $anchor = $(this);

		// scroll to specific anchor
		$("html, body").stop().animate({
			scrollTop: $($anchor.attr("href")).offset().top - offsetDifference
		}, 800 );
	});
}


// Custom banner height
$(".banner-parallax").each(function () {
	var customBannerHeight = $(this).data("banner-height"),
		boxContent = $(this).find(".row > [class*='col-']");
	$(this).css("min-height", customBannerHeight);
	$(boxContent).css("min-height", customBannerHeight);
});

// *** Section Parallax Image BG *** //
function sectionParallaxImageBG() {
	$(".section-parallax").each(function () {
		var parallaxSection = $(this),
			imgSrc = parallaxSection.children("img:first-child").attr("src");

		parallaxSection.prepend("<div class='bg-element'></div>");
		var bgElement = parallaxSection.find("> .bg-element");
		bgElement.css("background-image", "url('" + imgSrc + "')").attr("data-stellar-background-ratio", 0.1);
	});
}


// *** Form CTA Subscribe 1 *** //
var csNotifications = $(".cs-notifications");

function formCTASubscribe1() {
	$("#form-cta-subscribe-1").validate({
		// rules
		rules: {
			cs1Name: {
				required: true,
				minlength: 3
			},
			cs1Email: {
				required: true,
				email: true
			},
			cs1PhoneNum: {
				required: true,
				number: true,
				minlength: 12,
				maxlength: 12
			}
		}
	});

	var errorMsgData = csNotifications.data("error-msg"),
		errorMsgDefault = 'Please Follow Error Messages and Complete as Required',
		errorMsg = (errorMsgData) ? (errorMsgData) : errorMsgDefault;

	// Submit event
	$("#form-cta-subscribe-1").on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			var errorContent = '<i class="cs-error-icon fas fa-times"></i>' +
				errorMsg;
			cs1SubmitMSG(false, errorContent);
			cs1Error();
		} else {
			event.preventDefault();
			cs1SubmitForm();
		}
	});
}

function cs1SubmitForm() { var s = $("#cs1Name").val(), i = $("#cs1Email").val(), c = $("#cs1PhoneNum").val(); $.ajax({ type: "POST", url: "./php/cs1-process.php", data: "cs1Name=" + s + "&cs1Email=" + i + "&cs1PhoneNum=" + c, success: function (s) { "success" == s ? cs1Success() : (cs1Error(), cs1SubmitMSG(!1, s)) } }) } function cs1Success() { var s = csNotifications.data("success-msg"), i = s || "Thank you for your submission :)"; $("#form-cta-subscribe-1")[0].reset(), cs1SubmitMSG(!0, '<i class="cs-success-icon fas fa-check"></i>' + i), $(".cs-notifications-content").addClass("sent"), csNotifications.css("opacity", 0), csNotifications.slideDown(300).animate({ opacity: 1 }, 300).delay(5e3).slideUp(400), $("#form-cta-subscribe-1").hasClass("redirected") && setTimeout(function () { window.location.href = "page-thank-you.html" }, 3e3) } function cs1Error() { csNotifications.css("opacity", 0), csNotifications.slideDown(300).animate({ opacity: 1 }, 300), $(".cs-notifications-content").removeClass("sent") } function cs1SubmitMSG(s, i) { var c; c = "shake animated", csNotifications.delay(300).addClass(c).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () { $(this).removeClass("shake bounce animated") }), csNotifications.children(".cs-notifications-content").html(i) }


// *** Counter Stats *** //
function counterStats() { $(".counter-stats").each(function () { var t = $(this), i = t.text(), a = i.toString().replace(/(\d)/g, "<span class='digit'><span class='digit-value'>$1</span></span>"); t.html(a + "<div class='main'>" + i + "</span>"), t.find(".digit").each(function () { var t = $(this), i = t.find(".digit-value").text(); t.append("<div class='counter-animator' data-value='" + i + "'><ul><li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li></ul></div>") }) }), $(".counter-stats").each(function (i) { var a = $(this); new Waypoint({ element: a, handler: function (t) { setTimeout(function () { setTimeout(function () { 1 < $(window).width() && a.find(".counter-animator").each(function () { var t = $(this), i = 10 * t.data("value"); t.find("ul").css({ transform: "translateY(-" + i + "%)", "-webkit-transform": "translateY(-" + i + "%)", "-moz-transform": "translateY(-" + i + "%)", "-ms-transform": "translateY(-" + i + "%)", "-o-transform": "translateY(-" + i + "%)" }) }) }, 0 * i) }, 0) }, offset: "100%" }) }) }


// *** Slider Clients *** //
function sliderClients() {
	var sliderClients = $('.slider-clients > .slick-slider');
	sliderClients.slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		dots: false,
		infinite: true,
		rtl: slickDirection,
		arrows: false,
		autoplay: true,
		touchThreshold: 20,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});
}


// *** Slider Testimonials *** //
function sliderTestimonials() {
	var sliderTestimonials = $('.slider-testimonials > .slick-slider');
	sliderTestimonials.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		infinite: false,
		rtl: slickDirection,
		arrows: false,
		touchThreshold: 20,
		// centerMode: true,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
}


$("body").waitForImages({ finished: function () { setTimeout(function () { $(".lp-content, #loading-progress .logo").css({ opacity: 0 }), $("#loading-progress").addClass("hide-it"), setTimeout(function () { $(".banner-parallax > .bg-element, .banner-parallax > .overlay-pattern").addClass("appeared") }, 1500) }, 0) }, each: function (a, t, e) { var n = Math.floor((a + 1) / t * 100); $("#lp-counter").animate({ $this: n }, { duration: 150, easing: "", queue: !1, step: function (a) { var t = Math.round(a); $("#lp-counter").text(t + "%") } }), $("#lp-bar").animate({ width: n + "%" }, 0) }, waitForAll: !0 });


// *** Scroll To *** //
$(".scroll-to").on("click", function (e) {
	e.preventDefault();
	var $anchor = $(this);

	// scroll to specific anchor
	$("html, body").stop().animate({
		scrollTop: $($anchor.attr("href")).offset().top
	}, 1200);
});


