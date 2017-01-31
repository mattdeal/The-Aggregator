// URL - replace everything after q= with the query 
// https://www.googleapis.com/books/v1/volumes?q=flowers

// pull out title, author, thumbnail, price and preview?



$(document).ready(function(){

	// doLookup('flowers');
	$('#searchButton').on('click', function(event) {
		event.preventDefault();
		searchTerm = $('#searchTerm').val();
		if (searchTerm.length > 2) {
        doLookup(searchTerm);
		gifCall(searchTerm);
		newsCall(searchTerm);
	}
	//handler for if the search box is blank or short
	 else {
		


	}
	});
});

 

function newsCall(searchData) {

	var queryUrl = "https://webhose.io/search?token=cf277ea8-e083-4791-80a0-3e31813ea121&size=3&format=json&q=" + searchData + "";

    $.ajax({
        url: queryUrl,

        success: function(data) {
            var postData = (data);
            var postArray = postData.posts;
            console.log(postData);
            //console.log(postArray[i].text)
            //console.log(postArray[0]);

            //variables to set up news div

            $("#resultsNews").empty();

            console.log("array length" + postArray.length);
            for (var i = 0; i < postArray.length; i++) {
                var newDiv = $("<div></div>");
                var title = $("<div id ='title'>");
                var author = $("<div id ='author'>");
                var link = $("<div id ='url'>");
                var published = $("<div id='published'>");
                var text = $("<div id='text'>");
                title.prepend(postArray[i].title);
                author.prepend(postArray[i].author);
                published.prepend(postArray[i].published);
                link.prepend(postArray[i].url);
                //var subStringed = postArray[i].text.substring(0,200)
                text.prepend(postArray[i].text.substring(0, 200));


                newDiv.prepend(text);
                newDiv.prepend(link);
                newDiv.prepend(published);
                newDiv.prepend(author);
                newDiv.prepend(title);


                $("#resultsNews").prepend(newDiv);
            };

        }

    });
};


 function gifCall(term) {
     //debugger;
   
     var gifDiv = $('#resultsGiphy');
     gifQueryUrl = "https://api.giphy.com/v1/gifs/random?tag=" + term + "&api_key=dc6zaTOxFJmzC";
     $("#resultsGiphy").empty();
     newDiv = $('<div class="well">');
     header = $('<h3 class="gifHead well">').html(term+ " Gifs");
     newDiv.append(header);
     imgDiv = $('<div class="gifContainer">');
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
                     width: 220,
                     height: 150,
                 });
                 imgDiv.append(pic);
             });

     };
     newDiv.append(imgDiv);
     gifDiv.append(newDiv);
 }


function doLookup(query) {
	$.ajax({
	    url: 'https://www.googleapis.com/books/v1/volumes?q=' + query + "&maxResults=4",
		type: 'GET',
		success: function(response) {
			console.log(response);
			var books = response.items;
			showBooks(books);
			// this works, but we're trying something new
			// var bookList = $('#resultsGoogleBooks');
			// bookList.empty();

			// for (var i = 0; i < books.length; i++) {
			// 	var book = makeBook(books[i]);
			// 	bookList.append(book);
			// }
		},
		error: function(error) {
			console.log(error);
		}
	});
}

function showBooks(books) {
	var bookList = $('#resultsGoogleBooks');
	var bookRow;

	for (var i = 0; i < books.length; i++) {
		if (i % 2 === 0) {
			// start new book row
			bookRow = $('<div>').addClass('row');

			// create book column
			var bookCol = $('<div>').addClass('col-xs-6');

			// add book to column
			bookCol.append(makeBook(books[i]));

			// add column to bookrow
			bookRow.append(bookCol);

			// if this is the last book, append the row
			if (i === books.length - 1) {
				// add bookrow to booklist
				bookList.append(bookRow);
			}
		} else {
			// create book column
			var bookCol = $('<div>').addClass('col-xs-6');

			// add book to column
			bookCol.append(makeBook(books[i]));

			// add column to bookrow
			bookRow.append(bookCol);
			
			// add bookrow to booklist
			bookList.append(bookRow);
		}
	}
}

function makeBook(book) {
	var authors = '';
	if (book.volumeInfo.authors) {
		authors = book.volumeInfo.authors.join(', ');
	}

	var image = '';
	if (book.volumeInfo.imageLinks.smallThumbnail) {
		image = book.volumeInfo.imageLinks.smallThumbnail;
	}

	var rating = 0;
	if (book.volumeInfo.averageRating) {
		rating = book.volumeInfo.averageRating;
	}
	var stars = '';
	for (var i = rating; i > 0; i--) {
		stars += '<div class="glyphicon glyphicon-star"></div>';
	}

	var bookDiv = $('<div>').addClass('book').addClass('well');
	var outerRow = $('<div>').addClass('row');
	var col = $('<div>').addClass('col-xs-12');
	var titleRow = '<div class="row"><div class="col-xs-12"><h2>' + 
		book.volumeInfo.title + '</h2><h4>' + 
		authors + '</h4></div></div>';
	var imageRow = $('<div>').addClass('row');
	var imgDiv = '<div class="col-xs-4"><img src="' + image + '"></div>';
	var ratingRow = $('<div>').addClass('row');
	var ratingDiv = '<div class="col-xs-8">' + stars + '</div>';
	var buttonRow = '';

	try {
		buttonRow = '<div class="row"><div class="col-xs-12"><a class="btn btn-info btn-block" href="' +
		book.saleInfo.buyLink + '" target="_blank">Buy $' + 
		book.saleInfo.listPrice.amount + '</a></div></div>';
	} catch (err) {
		buttonRow = '<div class="row"><div class="col-xs-12"><a class="btn btn-info btn-block" href="' +
		book.volumeInfo.canonicalVolumeLink + '" target="_blank">Information</a></div></div>';
	}

	imageRow.append(imgDiv);
	ratingRow.append(ratingDiv)
	col.append(titleRow)
		.append(imageRow)
		.append(ratingRow)
		.append(buttonRow);
	outerRow.append(col);
	bookDiv.append(outerRow);

	return bookDiv;
}