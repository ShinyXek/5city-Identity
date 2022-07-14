let New = false
var myFirstName = document.getElementById('firstname');
var myLastName = document.getElementById('lastname');
var myDOB = document.getElementById('dateofbirth');
var myCitizenship = document.getElementById('citizenship');

function isNumber(e) {
	var key=e.which || e.KeyCode;
	if ( key >=48 && key <= 57) {
		return true; 
	}
	else {
		return false;
	}
}

function TriggeredKey(e) {
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	if (window.event.keyCode == 13 || window.event.keyCode == 27) return false;
}

$(function() {
	window.addEventListener('message', function(event) {
		if (event.data.type == "enableui") {
			New = event.data.new
			document.body.style.display = event.data.enable ? "block" : "none";
			$("input[type=text]").each(function() {
				$(this).val('');
			});
		}
	});

	document.onkeyup = function (data) {
		if (data.which == 27) { // Escape key
			$.post('https://esx_identity/escape', JSON.stringify({}));
		}
	};

	$('input').focus(function(){
		$(this).parents('.form-group').addClass('focused');
	});

	$('input').blur(function(){
		var inputValue = $(this).val();
		if ( inputValue == "" ) {
			$(this).removeClass('filled');
			$(this).parents('.form-group').removeClass('focused');	
		} else {
			$(this).addClass('filled');
		}
	});

	$("#register").submit(function(e) {
		e.preventDefault(); // Prevent form from submitting

		var date = $("#dateofbirth").val();
		if (new Date(date) == "Invalid Date") {
			date == "invalid";
		}
		$.post('https://esx_identity/register', JSON.stringify({
			firstname: $("#firstname").val(),
			lastname: $("#lastname").val(),
			dateofbirth: date,
			sex: $("input[type='radio'][name='sex']:checked").val(),
			citizenship: $("#citizenship").val(),
			isNew: New
		}));
	});
});
