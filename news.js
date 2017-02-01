$(document).on('click', "#searchButton", function() {
	console.log("Testing");
	var searchData = $("#searchTerm").val();
	console.log(searchData);
	var queryUrl = "https://webhose.io/search?token=cf277ea8-e083-4791-80a0-3e31813ea121&size=3&format=json&q=language%3A(english)" + searchData + "";

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
                title.addClass('well');
                var author = $("<div id ='author'>");
                var link = $("<div id ='url'>");
                var published = $("<div id='published'>");
                var text = $("<div id='text'>");
                title.prepend(postArray[i].title);
                author.prepend(postArray[i].author);
                published.prepend(postArray[i].published);
                var original = postArray[i].url
                link.prepend("<a href =" + postArray[i].url+">Original Article Link</a>");
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
});

	
	