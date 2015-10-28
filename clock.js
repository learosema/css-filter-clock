var container, div;
var MAX_DIVS = 7;
R=Math.random

// zero-pad a number, thx to 140byt.es/users/aemkei 
function pad(a,b){return(1e15+a+"").slice(-b)}

function getEndTime(hours, mins) {
    var timeString;
    if (document.location.hash && (/^#\d{1,2}:\d{2}$/.test(document.location.hash))) {
        timeString = document.location.hash.slice(1).split(':');
        hours = parseInt(timeString[0], 10);
        mins = parseInt(timeString[1], 10);
    }
    var endTime = new Date();
    endTime.setMinutes(mins);
    endTime.setHours(hours);
    endTime.setSeconds(0);
    return endTime;
}

function update() {
	var now = new Date(), endTime = getEndTime(), deltaT, seconds, minutes, hours, output;
	seconds = now.getSeconds()
	minutes = now.getMinutes()
	hours   = now.getHours()
	output  = [pad(hours, 2), ':', 
	           pad(minutes, 2), ':', 
	           pad(seconds, 2)].join('')
	document.title = output
	requestAnimationFrame(function () {
		div = document.createElement('div');
		div.textContent = output;
		div.style.color = 'hsl('+((360*R())|0)+',100%, '+(65+(35*R())|0)+'%)';
		window.setTimeout(function() {
			div.setAttribute("class", "blur-out effect-"+(1 + ((R()*4)|0)));		
		},100);
		container.appendChild(div);
		var nodes = document.getElementsByTagName('div');
		if (nodes.length > MAX_DIVS) {
			container.removeChild(nodes[0]);
		}
	});
}

document.body.appendChild(container = document.createElement('section'));
update();
window.setInterval(update, 1000);
