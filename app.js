



var gifDiv = $('#resultsGiphy') 


var gifCall = function(term) {
gifQueryUrl = "https://api.giphy.com/v1/gifs/random?tag="+term+"&api_key=dc6zaTOxFJmzC";
for (i=0;i<3;i++) {

$.ajax({
	url: gifQueryUrl,
	type: 'GET',
	dataType: 'jsonp',
	
})
.done(function(response) {
	gif = response.data;
		
			newDiv = $('<div>');
			pic = $('<img>').attr({
				class: 'giphy-embed',
				src: gif.image_url ,
				width: 220,
				height: 150,
			});
			gifDiv.append(pic);
})

};
};

gifCall("golf");



