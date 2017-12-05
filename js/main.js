$(document).ready(function() {
	Init();
	console.log("ready!");
});

window.onresize = function(event) {
	CheckScreenSize();
}

function CheckScreenSize() {
	var shop = false;
	var about = false;
	var account = false;
	var social = false;
	if ($(window).width() <= 765) {
		$(".lighter").slideUp(500);
		$("#shop-button").click(function( event ) {
			if (shop) {
				event.preventDefault($("#shop").slideUp(500));
				event.preventDefault($("#shop-arrow").text("+"));
				shop = false;
			}
			else {
				event.preventDefault($("#shop").slideDown(500));
				event.preventDefault($("#shop-arrow").text("-"));
				shop = true;
			}
		}); 
		$("#social-button").click(function( event ) {
			if (social) {
				event.preventDefault($("#social").slideUp(500));
				event.preventDefault($("#social-arrow").text("+"));
				social = false;
			}
			else {
				event.preventDefault($("#social").slideDown(500));
				event.preventDefault($("#social-arrow").text("-"));
				social = true;
			}		
		});
		$("#account-button").click(function( event ) {
			if (social) {
				event.preventDefault($("#account").slideUp(500));
				event.preventDefault($("#account-arrow").text("+"));
				social = false;
			}
			else {
				event.preventDefault($("#account").slideDown(500));
				event.preventDefault($("#account-arrow").text("-"));
				social = true;
			}
		});
	}
	else {
		$(".lighter").slideDown();
	}
}	

function Init() {
	CheckScreenSize();
}

