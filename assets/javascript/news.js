$(document).on('click', "#searchButton", function() {
	console.log("Testing");
	var searchData = $("#searchTerm").val();
	console.log(searchData);
	var queryUrl = "https://webhose.io/search?token=cf277ea8-e083-4791-80a0-3e31813ea121&format=json&q=" + searchData + "";
	
	$.ajax({
		url: queryUrl,

		success: function (data) {
			var postData = (data);
			var postArray = postData.posts
			console.log(postData);
			//console.log(postArray[0]);

			//variables to set up news div
			var newDiv = $("<div></div>");
			var title = $("<div id ='title'>");
			var author = $("<div id ='author'>");
			var link = $("<div id ='url'>");
			var published = $("<div id='published'>");
			var text = $("<div id='text'>");


			for (var i = 0; i < 1; i++) { 
			title.prepend(postArray[i].title);
			author.prepend(postArray[i].author);
			published.prepend(postArray[i].published);
			link.prepend(postArray[i].url);
			
			
			
			
			newDiv.prepend(link);
			newDiv.prepend(published);
			newDiv.prepend(author);
			newDiv.prepend(title);


			$("#resultsNews").prepend(newDiv)
			};

				}
							
								  })
			});

	
	

