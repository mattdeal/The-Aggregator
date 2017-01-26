// URL - replace everything after q= with the query 
// https://www.googleapis.com/books/v1/volumes?q=flowers

// pull out title, author, thumbnail, price and preview?

$(document).ready(function(){
	doLookup('flowers');
});

function doLookup(query) {
	$.ajax({
		url: 'https://www.googleapis.com/books/v1/volumes?q=' + query,
		type: 'GET',
		success: function(response) {
			console.log(response);
			var books = response.items;
			var bookList = $('#resultsGoogleBooks');
			bookList.empty();

			for (var i = 0; i < books.length; i++) {
				var book = makeBook(books[i]);
				bookList.append(book);
			}
		},
		error: function(error) {
			console.log(error);
		}
	});
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