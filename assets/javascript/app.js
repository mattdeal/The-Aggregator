$(document).ready(function() {
	// todo: if your JS requires something in the ready event, add it here
	newsReady();
	youtubeReady();
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

	$(document).on('click', '#searchButton', function(e) {
		e.preventDefault();

		var searchTerm = $("#searchTerm").val().trim();
		//todo: call all search functions here
		//giphy
		gifCall(searchTerm);
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


function booksReady() {

}


function gifCall(term) {
     //debugger;
    //grab container div
     var gifDiv = $('#resultsGiphy');
     //create uri with search term
     gifQueryUrl = "https://api.giphy.com/v1/gifs/random?tag=" + term + "&api_key=dc6zaTOxFJmzC";
     //empty anything in div
     $("#resultsGiphy").empty();
     //create container for gif results and create header with search term
     newDiv = $('<div class="well">');
     header = $('<h3 class="gifHead well">').html(term+ " Gifs");
     newDiv.append(header);
     imgDiv = $('<div class="gifContainer">');
     //call api for gifs and place in img elements then add to gif container
     for (i = 0; i < 4; i++) {

         $.ajax({
             url: gifQueryUrl,
             type: 'GET',
             dataType: 'jsonp',

         })
             .done(function (response) {
                 gif = response.data;
                 console.log(response);
                 
                 
                 pic = $('<img>').attr({
                     class: 'giphy-embed',
                     src: gif.image_url,
                     width: 250,
                     height: 150,
                 });
                 pic.addClass('wow rubberBand');
                 imgDiv.append(pic);
             });

     };
     newDiv.append(imgDiv);
     gifDiv.append(newDiv);
 }