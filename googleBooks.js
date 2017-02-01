// $(document).ready(function(){
// 	// doLookup('flowers');
// 	$('#searchButton').on('click', function(event) {
// 		event.preventDefault();
// 		doLookup($('#searchTerm').val().trim());
// 	});
// });

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
	booklist.empty();
	
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
	try {
		authors = book.volumeInfo.authors.join(', ');
	} catch(err) {
		console.log(err);
	}

	var image = '';
	try {
		image = book.volumeInfo.imageLinks.smallThumbnail;
	} catch(err) {
		console.log(err);
	}

	var rating = 0;
	try {
		rating = book.volumeInfo.averageRating;
	} catch(err) {
		console.log(err);
	}

	var stars = '';
	try {
		for (var i = rating; i > 0; i--) {
			stars += '<div class="glyphicon glyphicon-star"></div>';
		}
	} catch(err) {
		console.log(err);
	}
	
	var bookDiv = $('<div>').addClass('book').addClass('well');
	var outerRow = $('<div>').addClass('row');
	var col = $('<div>').addClass('col-xs-12');
	var titleRow = '<div class="row"><div class="col-xs-12"><h4>' + 
		book.volumeInfo.title + '</h4><h6>' + 
		authors + '</h6></div></div>';
	var imageRow = $('<div>').addClass('row');
	var imgDiv = '<div class="col-xs-4"><img class="book-thumb" src="' + image + '"></div>';
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