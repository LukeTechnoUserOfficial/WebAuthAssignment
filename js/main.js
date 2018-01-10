// A function that is declared when the window is ready | Jquery

var canvas,my_context;
var count = 1;
var x = 0;
var backwards = false;
var data = {"total":0,"rows":[]};
var Item = "Phone1"
localStorage.getItem('Item');
if (localStorage && localStorage.getItem('cart')) {
	data = localStorage.getItem('cart');
}
else {
	localStorage.setItem("cart", JSON.stringify(data));
}

var totalCost = 0;

var Phone_Templates = {
	Phone1: {
		GB16: {
			price: 325,
			VAT: 44
		},
		GB32: {
			price: 349,
			VAT: 59,
		},
		GB64: {
			price: 374,
			VAT: 75
		},
	},
	Phone2: {
		GB16: {
			price: 349,
			VAT: 58
		},
		GB32: {
			price: 449,
			VAT: 75
		},
		GB64: {
			price: 549,
			VAT: 92
		}
	},
	Phone3: {
		GB16: {
			price: 449,
			VAT: 75
		},
		GB32: {
			price: 549,
			VAT: 92
		},
		GB64: {
			price: 649,
			VAT: 109
		}
	},
	Phone4: {
		GB16: {
			price: 549,
			VAT: 87
		},
		GB32: {
			price: 699,
			VAT: 117
		},
		GB64: {
			price: 849,
			VAT: 142
		}
	},
	Phone5: {
		GB16: {
			price: 849,
			VAT: 142
		},
		GB32: {
			price: 999,
			VAT: 167,
		},
		GB64: {
			price: 1149,
			VAT: 192
		},
	}
}	

var PC_Templates = {
	PC1: {
		GB250: {
			price: 325,
			VAT: 44
		},
		GB500: {
			price: 349,
			VAT: 59,
		},
		TB1: {
			price: 374,
			VAT: 75
		},
	},
	PC2: {
		GB250: {
			price: 349,
			VAT: 58
		},
		GB500: {
			price: 449,
			VAT: 75
		},
		TB1: {
			price: 549,
			VAT: 92
		},
	},
	PC3: {
		GB250: {
			price: 449,
			VAT: 75
		},
		GB500: {
			price: 549,
			VAT: 92,
		},
		TB1: {
			price: 649,
			VAT: 109
		},
	},
	PC4: {
		GB250: {
			price: 549,
			VAT: 87
		},
		GB500: {
			price: 699,
			VAT: 117,
		},
		TB1: {
			price: 849,
			VAT: 142
		},
	},
	PC5: {
		GB250: {
			price: 849,
			VAT: 142
		},
		GB500: {
			price: 999,
			VAT: 167,
		},
		TB1: {
			price: 1149,
			VAT: 192
		},
	}
}

$(document).ready(function() {
	Init();
	console.log("ready!");
});

// When the window resizes, fire the function | JS

window.onresize = function(event) {
	CheckScreenSize();
}

// A function that changes java depending on the size of the screen | Jquery & JS

function CheckScreenSize() {
	var shop = false;
	var about = false;
	var account = false;
	var social = false;
	if ($(window).width() <= 1024) {
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
		$("#about-button").click(function( event ) {
			if (about) {
				event.preventDefault($("#about").slideUp(500));
				event.preventDefault($("#about-arrow").text("+"));
				about = false;
			}
			else {
				event.preventDefault($("#about").slideDown(500));
				event.preventDefault($("#about-arrow").text("-"));
				about = true;
			}
		});
	}
	else {
		$(".lighter").slideDown();
	}
}	

// Init Function when the window has fully loaded | Jquery & JS

function Init() {
	// Shopping Cart Functionality
	// Template {"total":0,"rows":[]}
	$(function(){
		$('#cartcontent').datagrid({
			singleSelect:true
		});
			
		if(localStorage && localStorage.getItem('cart')){
			console.log("data loaded: "+localStorage.getItem('cart'));
			data = localStorage.getItem('cart');
			data = JSON.parse(data);
			for(var i=0; i < data.total; i++) {
				var row = data.rows[i];
				if (row.price) {
					totalCost += (row.price * row.quantity);
				}
			}
				
			$('#Cost').html('Total: £'+totalCost);
				console.log(data);
				$('#cartcontent').datagrid('loadData', data);
				localStorage.setItem("cart", JSON.stringify(data));
			}
			
			if(totalCost == 0) {
				$("#NoItems").show();
			}
			else {
				$("#NoItems").hide();
			}
		});
		
		function addProduct(name,features,price,vat){
			function add(){
				data = localStorage.getItem('cart');
				data = JSON.parse(data);
				for(var i=0; i<data.total; i++){
					var row = data.rows[i];
					if (row.name == name){
						row.quantity += 1;
						return;
					}
				}
				data.total += 1;
				data.rows.push({
					name:name,
					features:features,
					quantity:1,
					price:price,
					vat:vat
				});
			}
			add();
			totalCost += price;
			//load data grid from jquery ui
			$('#cartcontent').datagrid('loadData', data);
			//update totals in the html
			$('#Cost').html('Total: £'+totalCost);
			
			data = JSON.stringify(data);
			localStorage.setItem('cart', data);
			console.log(data);
		}
	
	// Hiding the Evidence!!!
	
	$("#CheckoutForm").fadeOut();
	$("#categories").fadeOut();
	$("#overlay").fadeOut();
	$("#bg").fadeOut();
	$("#LogTitle").fadeOut();
	$("#SignTitle").fadeOut();
	$("#innerbgLogIn").fadeOut();
	$("#innerbgSignUp").fadeOut();
	$("#canvas").hide();
	$("#paymentoverlay").hide();
	
	// Login Data 
	
	var loggedin = false;
	if (loggedin == true) {
		$(".signup").hide();
		$(".login").hide();
		$("#welcometext").show();
	}
	else {
		$(".login").show();
		$(".signup").show();
		$("#welcometext").hide();
	}
	
	// Buttons 
	
	$(".login").click(function( event ) {
		event.preventDefault($("#overlay").fadeIn());
		event.preventDefault($("#bg").fadeIn());
		event.preventDefault($("#innerbgLogIn").fadeIn());
		event.preventDefault($("#LogTitle").fadeIn());
	}); 
	
	$(".signup").click(function( event ) {
		event.preventDefault($("#overlay").fadeIn());
		event.preventDefault($("#bg").fadeIn());
		event.preventDefault($("#innerbgSignUp").fadeIn());
		event.preventDefault($("#SignTitle").fadeIn());
	}); 
	
	$("#Close").click(function( event ) {
		event.preventDefault($("#overlay").fadeOut());
		event.preventDefault($("#bg").fadeOut());
		event.preventDefault($("#LogTitle").fadeOut());
		event.preventDefault($("#SignTitle").fadeOut());
		event.preventDefault($("#innerbgLogIn").fadeOut());
		event.preventDefault($("#innerbgSignUp").fadeOut());
	}); 
	
	$("#productbutton").click(function( event ) {
		event.preventDefault($("#categories").hide());
		event.preventDefault($("#categories").fadeOut());
		event.preventDefault($("#product").fadeIn(1000));
		event.preventDefault($("#productbutton").css("border-bottom", "1px solid rgba(0,0,0,1)"));
		event.preventDefault($("#categorybutton").css("border-bottom", "1px solid rgba(45,45,45,0.5)"));
	});
	
	$("#categorybutton").click(function( event ) {
		event.preventDefault($("#product").hide());
		event.preventDefault($("#product").fadeOut());
		event.preventDefault($("#categories").fadeIn(1000));
		event.preventDefault($("#categorybutton").css("border-bottom", "1px solid rgba(0,0,0,1)"));
		event.preventDefault($("#productbutton").css("border-bottom", "1px solid rgba(45,45,45,0.5)"));
	});
	
	$("#OrderButton").click(function( event ) {
		canvas = document.getElementById("canvas");
		my_context = canvas.getContext('2d');
		my_context.font = "12px Arial";
		my_context.fillText("Your Payment", 110, 30);
		my_context.fillText("is being processed", 100, 50);
		my_context.fillText("Your Payment", 110, 30);
		my_context.fillText("is being processed", 100, 50);
		my_context.fillText("Please wait...", 115, 85);
		my_context.strokeRect(5,10,290,120);
		my_context.strokeRect(10,95,280,20);
		$("#paymentoverlay").fadeIn().delay(5000).queue(function(n) {
			$(this).fadeOut(); n();
		});
		$("#canvas").fadeIn().delay(5000).queue(function(n) {
			$(this).fadeOut(); n();
			var data = {"total":0,"rows":[]};
			localStorage.setItem("cart", JSON.stringify(data));
			window.location.replace("Home.html")
		});
		
		setInterval(loading,90);
	});
	
	$("#CancelButton").click(function( event ) {
		window.location.replace("Home.html")
	});
	
	$("#Phone1").click(function( event ) {
		localStorage.setItem("Item", "Phone1");
		console.log("Item saved: Phone1");
	});
	
	$("#Phone2").click(function( event ) {
		localStorage.setItem("Item", "Phone2");
		console.log("Item saved: Phone2");
	});
	
	$("#Phone3").click(function( event ) {
		localStorage.setItem("Item", "Phone3");
		console.log("Item saved: Phone3");
	});
	
	$("#Phone4").click(function( event ) {
		localStorage.setItem("Item", "Phone4");
		console.log("Item saved: Phone4");
	});
	
	$("#Phone5").click(function( event ) {
		localStorage.setItem("Item", "Phone5");
		console.log("Item saved: Phone5");
	});
	
	$("#PC1").click(function( event ) {
		localStorage.setItem("Item", "PC1");
		console.log("Item saved: PC1");
	});
	
	$("#PC2").click(function( event ) {
		localStorage.setItem("Item", "PC2");
		console.log("Item saved: PC2");
	});
	
	$("#PC3").click(function( event ) {
		localStorage.setItem("Item", "PC3");
		console.log("Item saved: PC3");
	});
	
	$("#PC4").click(function( event ) {
		localStorage.setItem("Item", "PC4");
		console.log("Item saved: PC4");
	});
	
	$("#PC5").click(function( event ) {
		localStorage.setItem("Item", "PC5");
		console.log("Item saved: PC5");
	});
	
	$("#PurchaseButton").click(function( event ) {
		$("#Basket").hide();
		$("#CheckoutForm").fadeIn();
	});
	
	$("#PhoneIndex").click(function( event ) {
		window.location.replace("Phones.html")
	});
	
	$("#LaptopIndex").click(function( event ) {
		window.location.replace("PCs.html")
	});
	
	$("#PCIndex").click(function( event ) {
		window.location.replace("PCs.html")
	});
	
	$("#AccessoriesIndex").click(function( event ) {
		window.location.replace("Accessories.html")
	});
	
	$("#SignIndex").click(function( event ) {
		window.location.replace("Account.html")
	});
	
	$("#LogIndex").click(function( event ) {
		window.location.replace("Account.html")
	});
	
	$("#PasswordIndex").click(function( event ) {
		window.location.replace("Account.html")
	});
	
	$("#AccountIndex").click(function( event ) {
		window.location.replace("Account.html")
	});
	
	$("#FBIndex").click(function( event ) {
		window.location.replace("https://www.facebook.com/technocorps")
	});
	
	$("#TwitterIndex").click(function( event ) {
		window.location.replace("https://www.twitter.com/OfficialTechnoCorps")
	});
	
	function loading() {
		count = count + 1;
		if (backwards == false) {
			x = x + 1;
			my_context.fillStyle = "rgba(0, 0, 0, 0.2)";
			my_context.fillRect(15*x,100,10,10);
		}
		else {
			my_context.fillStyle = "rgba(0, 0, 0, 0.2)";
			my_context.clearRect(15,100,15*18,10);
			x = 19;
		}
		
		
		if (count >= 19) {
			count = 1;
			
			if (backwards == false) {
				backwards = true;
			}
			else {
				backwards = false;
				x = 0;
			}
		}
	}
	
	// Screen Function
	
	CheckScreenSize();
	
	// Selecting Things
	
	if (localStorage && localStorage.getItem("Item")) {
		var TheProduct = localStorage.getItem('Item');
		Item = TheProduct;
	}
	
	var ChosenPC = Item;
	var colour = "N/A";
	var capacity = "N/A";
	var carrier = "N/A";
	var screen = "N/A";
	var price = 0;
	var VAT = 0;
	
	$("#ChosenPhone").text("Phone: "+ChosenPC)
	$("#BuyTitle h1").text(ChosenPC)
	$("#ChosenPC").text("PC: "+ChosenPC)
	
	$("#colour1").click(function( event ) {
		event.preventDefault($("#colour1").css("border", "5px solid red"));
		event.preventDefault($("#colour2").css("border", "0px"));
		event.preventDefault($("#colour3").css("border", "0px"));
		$("#ChosenColour").text("Colour: Black");
		colour = "Black";
	});
	
	$("#colour2").click(function( event ) {
		event.preventDefault($("#colour2").css("border", "5px solid red"));
		event.preventDefault($("#colour1").css("border", "0px"));
		event.preventDefault($("#colour3").css("border", "0px"));
		$("#ChosenColour").text("Colour: Grey");
		colour = "Grey";
	});
	
	$("#colour3").click(function( event ) {
		event.preventDefault($("#colour3").css("border", "5px solid red"));
		event.preventDefault($("#colour2").css("border", "0px"));
		event.preventDefault($("#colour1").css("border", "0px"));
		$("#ChosenColour").text("Colour: Gold");
		colour = "Gold";
	});
	
	$("#GB250").click(function( event ) {
		event.preventDefault($("#GB250").css("border", "5px solid red"));
		event.preventDefault($("#GB500").css("border", "1px solid black"));
		event.preventDefault($("#TB1").css("border", "1px solid black"));
		$("#ChosenCapacity").text("Capacity: 250GB");
		capacity = "250GB";
		if (ChosenPC == "Phone1") {
			VAT = PC_Templates.PC1.GB250.VAT;
			price = PC_Templates.PC1.GB250.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone2") {
			VAT = PC_Templates.PC2.GB250.VAT;
			price = PC_Templates.PC2.GB250.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone3") {
			VAT = PC_Templates.PC3.GB250.VAT;
			price = PC_Templates.PC3.GB250.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone4") {
			VAT = PC_Templates.PC4.GB250.VAT;
			price = PC_Templates.PC4.GB250.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone5") {
			VAT = PC_Templates.PC5.GB250.VAT;
			price = PC_Templates.PC5.GB250.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
	});
	
	$("#GB500").click(function( event ) {
		event.preventDefault($("#GB500").css("border", "5px solid red"));
		event.preventDefault($("#GB250").css("border", "1px solid black"));
		event.preventDefault($("#TB1").css("border", "1px solid black"));
		$("#ChosenCapacity").text("Capacity: 500GB");
		capacity = "500GB";
		if (ChosenPC == "PC1") {
			VAT = PC_Templates.PC1.GB500.VAT;
			price = PC_Templates.PC1.GB500.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "PC2") {
			VAT = PC_Templates.PC2.GB500.VAT;
			price = PC_Templates.PC2.GB500.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "PC3") {
			VAT = PC_Templates.PC3.GB500.VAT;
			price = PC_Templates.PC3.GB500.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "PC4") {
			VAT = PC_Templates.PC4.GB500.VAT;
			price = PC_Templates.PC4.GB500.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "PC5") {
			VAT = PC_Templates.PC5.GB500.VAT;
			price = PC_Templates.PC5.GB500.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
	});
	
	$("#TB1").click(function( event ) {
		event.preventDefault($("#TB1").css("border", "5px solid red"));
		event.preventDefault($("#GB500").css("border", "1px solid black"));
		event.preventDefault($("#GB250").css("border", "1px solid black"));
		$("#ChosenCapacity").text("Capacity: 1TB");
		capacity = "1TB";
		if (ChosenPC == "PC1") {
			VAT = PC_Templates.PC1.TB1.VAT;
			price = PC_Templates.PC1.TB1.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "PC2") {
			VAT = PC_Templates.PC2.TB1.VAT;
			price = PC_Templates.PC2.TB1.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "PC3") {
			VAT = PC_Templates.PC3.TB1.VAT;
			price = PC_Templates.PC3.TB1.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "PC4") {
			VAT = PC_Templates.PC4.TB1.VAT;
			price = PC_Templates.PC4.TB1.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "PC5") {
			VAT = PC_Templates.PC5.TB1.VAT;
			price = PC_Templates.PC5.TB1.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
	});
	
	$("#GB16").click(function( event ) {
		event.preventDefault($("#GB16").css("border", "5px solid red"));
		event.preventDefault($("#GB32").css("border", "1px solid black"));
		event.preventDefault($("#GB64").css("border", "1px solid black"));
		$("#ChosenCapacity").text("Capacity: 16GB");
		capacity = "16GB";
		if (ChosenPC == "Phone1") {
			VAT = Phone_Templates.Phone1.GB16.VAT;
			price = Phone_Templates.Phone1.GB16.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone2") {
			VAT = Phone_Templates.Phone2.GB16.VAT;
			price = Phone_Templates.Phone2.GB16.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone3") {
			VAT = Phone_Templates.Phone3.GB16.VAT;
			price = Phone_Templates.Phone3.GB16.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone4") {
			VAT = Phone_Templates.Phone4.GB16.VAT;
			price = Phone_Templates.Phone4.GB16.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone5") {
			VAT = Phone_Templates.Phone5.GB16.VAT;
			price = Phone_Templates.Phone5.GB16.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
	});
	
	$("#GB32").click(function( event ) {
		event.preventDefault($("#GB32").css("border", "5px solid red"));
		event.preventDefault($("#GB16").css("border", "1px solid black"));
		event.preventDefault($("#GB64").css("border", "1px solid black"));
		$("#ChosenCapacity").text("Capacity: 32GB");
		capacity = "32GB";
		if (ChosenPC == "Phone1") {
			VAT = Phone_Templates.Phone1.GB32.VAT;
			price = Phone_Templates.Phone1.GB32.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone2") {
			VAT = Phone_Templates.Phone2.GB32.VAT;
			price = Phone_Templates.Phone2.GB32.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone3") {
			VAT = Phone_Templates.Phone3.GB32.VAT;
			price = Phone_Templates.Phone3.GB32.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone4") {
			VAT = Phone_Templates.Phone4.GB32.VAT;
			price = Phone_Templates.Phone4.GB32.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone5") {
			VAT = Phone_Templates.Phone5.GB32.VAT;
			price = Phone_Templates.Phone5.GB32.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
	});
	
	$("#GB64").click(function( event ) {
		event.preventDefault($("#GB64").css("border", "5px solid red"));
		event.preventDefault($("#GB16").css("border", "1px solid black"));
		event.preventDefault($("#GB32").css("border", "1px solid black"));
		$("#ChosenCapacity").text("Capacity: 64GB");
		capacity = "64GB";
		if (ChosenPC == "Phone1") {
			VAT = Phone_Templates.Phone1.GB64.VAT;
			price = Phone_Templates.Phone1.GB64.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone2") {
			VAT = Phone_Templates.Phone2.GB64.VAT;
			price = Phone_Templates.Phone2.GB64.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone3") {
			VAT = Phone_Templates.Phone3.GB64.VAT;
			price = Phone_Templates.Phone3.GB64.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone4") {
			VAT = Phone_Templates.Phone4.GB64.VAT;
			price = Phone_Templates.Phone4.GB64.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
		else if (ChosenPC == "Phone5") {
			VAT = Phone_Templates.Phone5.GB64.VAT;
			price = Phone_Templates.Phone5.GB64.price;
			$("#TotalPrice").text("Total Price: £"+price+".00");
			$("#VAT").text("VAT: £"+VAT+".00");
		}
	});
	
	$("#Inch13").click(function( event ) {
		event.preventDefault($("#Inch13").css("border", "5px solid red"));
		event.preventDefault($("#Inch15").css("border", "1px solid black"));
		$("#ChosenPC").text("PC: 13 Inch "+ChosenPC);
		screen = "13 Inch";
	});
	
	$("#Inch15").click(function( event ) {
		event.preventDefault($("#Inch15").css("border", "5px solid red"));
		event.preventDefault($("#Inch13").css("border", "1px solid black"));
		$("#ChosenPC").text("PC: 15 Inch "+ChosenPC);
		screen = "15 Inch";
	});
	
	$("#EE").click(function( event ) {
		event.preventDefault($("#EE").css("border", "5px solid red"));
		event.preventDefault($("#Three").css("border", "1px solid black"));
		event.preventDefault($("#Vodafone").css("border", "1px solid black"));
		event.preventDefault($("#O2").css("border", "1px solid black"));
		event.preventDefault($("#SimFree").css("border", "1px solid black"));
		$("#ChosenCarrier").text("Carrier: EE");
		carrier = "EE";
	});
	
	$("#Three").click(function( event ) {
		event.preventDefault($("#Three").css("border", "5px solid red"));
		event.preventDefault($("#EE").css("border", "1px solid black"));
		event.preventDefault($("#Vodafone").css("border", "1px solid black"));
		event.preventDefault($("#O2").css("border", "1px solid black"));
		event.preventDefault($("#SimFree").css("border", "1px solid black"));
		$("#ChosenCarrier").text("Carrier: Three");
		carrier = "Three";
	});
	
	$("#Vodafone").click(function( event ) {
		event.preventDefault($("#Vodafone").css("border", "5px solid red"));
		event.preventDefault($("#EE").css("border", "1px solid black"));
		event.preventDefault($("#Three").css("border", "1px solid black"));
		event.preventDefault($("#O2").css("border", "1px solid black"));
		event.preventDefault($("#SimFree").css("border", "1px solid black"));
		$("#ChosenCarrier").text("Carrier: Vodafone");
		carrier = "Vodafone";
	});
	
	$("#O2").click(function( event ) {
		event.preventDefault($("#O2").css("border", "5px solid red"));
		event.preventDefault($("#EE").css("border", "1px solid black"));
		event.preventDefault($("#Three").css("border", "1px solid black"));
		event.preventDefault($("#Vodafone").css("border", "1px solid black"));
		event.preventDefault($("#SimFree").css("border", "1px solid black"));
		$("#ChosenCarrier").text("Carrier: O2");
		carrier = "O2";
	});
	
	$("#SimFree").click(function( event ) {
		event.preventDefault($("#SimFree").css("border", "5px solid red"));
		event.preventDefault($("#EE").css("border", "1px solid black"));
		event.preventDefault($("#Three").css("border", "1px solid black"));
		event.preventDefault($("#Vodafone").css("border", "1px solid black"));
		event.preventDefault($("#O2").css("border", "1px solid black"));
		$("#ChosenCarrier").text("Carrier: Sim Unlocked");
		carrier = "Sim Unlocked";
	});
	
	$("#CheckoutButton").click(function( event ) {
		if (ChosenPC == "PC1" || ChosenPC == "PC2" || ChosenPC == "PC3" || ChosenPC == "PC4" || ChosenPC == "PC5") {
			addProduct(ChosenPC,colour+" / "+capacity+" / "+screen,price,VAT)
		}
		else {
			addProduct(ChosenPC,colour+" / "+capacity+" / "+carrier,price,VAT)
		}
		window.location.replace("Checkout.html")
	});
}

