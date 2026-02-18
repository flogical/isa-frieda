jQuery.fn.redraw = function() {
    //performance warning (Runs once at least!) 
    // BUT could pose issue with responsive and diff viewports >> https://api.jquery.com/hide/
    return this.hide(0, function(){jQuery(this).show()});
};


jQuery(document).ready(function($){
	jQuery('body').redraw();

    console.log("TEeeeest")

});