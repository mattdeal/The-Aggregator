$(document).ready(function() {
	// todo: if your JS requires something in the ready event, add it here
	newsReady();
	youtubeReady();
	giphyReady();
	booksReady();

	// validation
	// todo: un-comment this after the code is removed from youtube.js
	// $("#searchButton").attr("disabled", true);
 //    $("#searchTerm").keyup(function() {
 //    	if ($(this).val().length > 0) {
 //        	$("#searchButton").attr("disabled", false);
 //    	} else {
 //    		$("#searchButton").attr("disabled", true);
 //    	}
 //     });

	$('#searchButton').on('click', function(e) {
		e.preventDefault();

		var searchTerm = $("#searchTerm").val().trim();
		//todo: call all search functions here

		//googleBooks
		doLookup(searchTerm);
	});
});

// todo: If you need a ready function, put the code that needs to run here
// todo: If you don't need it, delete the function
function newsReady() {

}

function youtubeReady() {

}

function giphyReady() {

}

function booksReady() {

}