jQuery.fn.redraw = function() {
    //performance warning (Runs once at least!) 
    // BUT could pose issue with responsive and diff viewports >> https://api.jquery.com/hide/
    return this.hide(0, function(){jQuery(this).show()});
};


jQuery(document).ready(function($){
	jQuery('body').redraw();

    //console.log("TEeeeest")

	//Use jquery instead of document.getElementById? >>meh
	function doReset(){
		//document.getElementById("loader").style.display = "none";
		document.getElementById("submit").style.display = "inline-block";
		$('#form')[0].reset(); //just in case
	}

	function doShowLoader(){
		//document.getElementById("loader").style.display = "inline-block";
  		document.getElementById("submit").style.display = "none";
	}

	function clearReturn(){
		var return_message = document.getElementById("returnmessage");
		return_message.innerHTML = '';
		return_message.style.backgroundColor = 'transparent';//or empty?
	}

	$('#btn').click(function() {
		var name = $('#name').val();
        var email = $('#email').val();
        var object = $('#object').val();
		var message = $('#message').val();
        var ajaxurl = "https://formspree.io/f/xbdaajwj";
		var gotcha = document.getElementsByName("gotcha");//filtering spam so that dont reach limit(50 per month)

		//console.log('click= '+email,gotcha.length,JSON.stringify(gotcha),JSON.stringify(gotcha[0]),gotcha[0].innerHTML); 
        data =  {'email': email, 'name':name, 'object':object, 'message':message,'_gotcha': gotcha[0].innerHTML};
        
		var return_message = $('#returnmessage');

		doShowLoader();

		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: data,
			dataType: "json",
			xhrFields: {
				withCredentials: true
			},
			success: function(result){
				//$('#cava').text(result);
				console.log('RESULT= '+result);
				return_message[0].innerHTML = "Thank you for your request!";
				return_message[0].style.backgroundColor = '#68d99c';
				doReset();
				setTimeout(clearReturn, 2000);
				
				//setTimeout(function(){
				//	return_message[0].innerHTML = '';
				//	return_message[0].style.backgroundColor = 'transparent'; //or empty?
				//}, 2000)
			},
			error: function (xhr, status) {
				// handle errors
				console.log('ERROR= '+status + " ;; "+ JSON.stringify(xhr));
				//ERROR= error ;; {"readyState":0,"status":0,"statusText":"error"}
				if(xhr.status == 0 && xhr.readyState == 0){ //bon in testing this is a false error
					return_message[0].innerHTML = "Thank you for your submission!";
					return_message[0].style.backgroundColor = '#68d99c';
					doReset();
					//alert("Sent"); //or also set innerHTML as below instead of alert?!?
					setTimeout(clearReturn, 2000);
					return;
				}

				return_message[0].innerHTML = "Oops! There was a problem submitting your form"; //this works...
				return_message[0].style.backgroundColor = '#FF0000';
				//alert("euuuh");	
				setTimeout(clearReturn, 2000);
				//setTimeout(function(){
				//	return_message[0].innerHTML = '';
				//	return_message[0].style.backgroundColor = 'transparent'; //or empty?
				//}, 2000)
			},
			//headers: {  //doesnt work when this is not commented out
			//	"accept": "application/json",
			//	"Access-Control-Allow-Origin":"*"
			//}
			//dataType: 'json',
		})

		$('#form')[0].reset();
	});

});