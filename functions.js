
/* dont change anything below this line unless you know what you are doing :-) */

var d = new Date();
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();

var acc_x, acc_y;
var deg = 0;
var deg_new = 0;
var deg_set = 0;
var deg_time = 0;
var state = 'default';


function initiate() {
	
	if (hours > 12) hours360 = hours - 12;
	else hours360 = hours; 
	
	minutesDeg = 6 * minutes;
	hoursDeg   = 30 * hours360;
	secondsDeg = 6 * (seconds + 2);
	
	if (hours < 10) hours = '0' + hours;
	if (minutes < 10) minutes = '0' + minutes;
	
	
	//circles
	document.getElementById("minutes-c").childNodes[1].style.webkitTransform = 'rotate(' + minutesDeg + 'deg) translate3d( 0, 0, 0)';
	document.getElementById("hours-c").childNodes[1].style.webkitTransform = 'rotate(' + hoursDeg + 'deg) translate3d( 0, 0, 0)';
	document.getElementById("seconds-c").childNodes[1].style.webkitTransform = 'rotate(' + secondsDeg + 'deg) translate3d( 0, 0, 0)';	
	

	//center
	document.getElementById("am_pm").innerHTML = hours + ':' + minutes;
	document.getElementById("day").innerHTML = Day();
	
	date = d.getDate();
	month = d.getMonth() + 1;
	year = new String(d.getFullYear());
	
	//if (date < 10) date = '0' + date; 
	if (month < 10) month = '0' + month; 
	year = year.substr(2, 2);
	
	document.getElementById("date").innerHTML = Month() + ' ' + date + ', 20' + year;	
	
	setTimeout(no_animation_delay, 2200); // removes animation delay and lowers current clock animations from 2 seconds to 1
}

function no_animation_delay() {
	document.getElementById("main-wrapper").style.webkitTransitionDelay = '0s';
	document.getElementById("main-wrapper").style.webkitTransition = 'all 1s ease-in-out';
	
	//console.log(document.getElementById("circles").getElementsByTagName("img").style);
	
	var circles = document.getElementById("circles").getElementsByTagName('img');
	for (var i = 0; i < circles.length; i++) {
		circles[i].style.webkitTransitionDelay = '0s';
		circles[i].style.webkitTransition = 'all 1s ease-in-out';
	}
	
	document.getElementById("seconds-c").childNodes[1].style.webkitTransition = 'all 0.3s linear';
	
	setTimeout(update, 500); // starts normal clock updating process
}

function update() {	
	d = new Date();
	hours = d.getHours();
	minutes = d.getMinutes();
	seconds = d.getSeconds();	

	if (hours > 12) hours360 = hours - 12;
	else hours360 = hours; 	
	
	minutesDeg = 6 * minutes;
	hoursDeg   = 30 * hours360;
	secondsDeg = 6 * seconds;	

	if (hours < 10) hours = '0' + hours;
	if (minutes < 10) minutes = '0' + minutes;
	
	//circles
	document.getElementById("minutes-c").childNodes[1].style.webkitTransform = 'rotate(' + minutesDeg + 'deg) translate3d( 0, 0, 0)';
	document.getElementById("hours-c").childNodes[1].style.webkitTransform = 'rotate(' + hoursDeg + 'deg) translate3d( 0, 0, 0)';
	
	if (seconds == 0) {
		document.getElementById("seconds-c").childNodes[1].style.webkitTransition = 'all 1s ease-in-out';
	} else if (seconds == 1) {
		document.getElementById("seconds-c").childNodes[1].style.webkitTransition = 'all 0.3s linear';
	}
	
	document.getElementById("seconds-c").childNodes[1].style.webkitTransform = 'rotate(' + secondsDeg + 'deg) translate3d( 0, 0, 0)';	
	
	//center
	document.getElementById("am_pm").innerHTML = hours + ':' + minutes;
	document.getElementById("day").innerHTML = Day();
	
	date = d.getDate();
	month = d.getMonth() + 1;
	year = new String(d.getFullYear());
	
	if (date < 10) date = '0' + date; 
	if (month < 10) month = '0' + month; 
	year = year.substr(2, 2);
	
	document.getElementById("date").innerHTML = Month() + ' ' + date + ', 20' + year;		

	//tilt
	document.getElementById("main-wrapper").style.webkitTransform = 'rotate(' + rotate() + 'deg) translate3d( 0, 0, 0)';	
	//tilt
	
	
	setTimeout(update, 1000);
}	

function Day () {
    day = new Array("sunday","monday","tuesday","wednesday","thursday","friday","saturday");
    return day[d.getDay()];
}

function Month () {
    month = new Array("january","february","march","april","may","jun","july","august","september","october","november","december");
    return month[d.getMonth()];
}


function rotate (accelerationx, accelerationy) {
	deg_time++;
	// all the numbers down below represent the sensitivity used for rotation triggers
	if (acc_y < 3 && acc_x > -7 && acc_x < 7) {
		//normal
		deg_new = 0;
		state = 'normal';
	} else if (acc_x < -6) {
		//left
		deg_new = 90;
		state = 'left';
	} else if (acc_x > 6) {
		//right
		deg_new = -90;
		state = 'right';
	} else if (acc_y > 4) {
		//upside
		deg_new = -180;
		state = 'upside';
	}
	
	if (deg != deg_new) {
		difference = deg_time - deg_set;
		
		if (difference >= 2 || deg_set == 0) {
			deg_set = deg_time;
			deg = deg_new;
		} else {
			//animation postponed
		}
	}
	
	//if decision wasnt made, default or previous deg value will be returned
	//console.log(acc_y + ' ' + acc_x + ' ' + state); // used for debugging 
 	return deg;
}


// orientation begin


if (window.DeviceMotionEvent) {
	window.addEventListener('devicemotion', deviceMotionHandler, false);
}

function deviceMotionHandler(eventData) {
	var acceleration = eventData.accelerationIncludingGravity;

	acc_x = acceleration.x;
	acc_y = acceleration.y;
}


// orientation end