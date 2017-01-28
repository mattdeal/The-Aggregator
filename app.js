 function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }
 function gifCall(term) {
     //debugger;
   
     var gifDiv = $('#resultsGiphy');
     gifQueryUrl = "https://api.giphy.com/v1/gifs/random?tag=" + term + "&api_key=dc6zaTOxFJmzC";
     $("#resultsGiphy").empty();
     for (i = 0; i < 4; i++) {

         $.ajax({
             url: gifQueryUrl,
             type: 'GET',
             dataType: 'jsonp',

         })
             .done(function (response) {
                 gif = response.data;
                 console.log(response);
                 
                 newDiv = $('<div>');
                 pic = $('<img>').attr({
                     class: 'giphy-embed',
                     src: gif.image_url,
                     width: 220,
                     height: 150,
                 });
                 gifDiv.append(pic);
             });

     };
 }

 $(document).ready(function () {
     $("#searchButton").on("click", function (e) {
         e.preventDefault();
         
         searchTerm = $('#searchTerm').val();
         
             gifCall(searchTerm);


       
         //doLookup($('#searchTerm').val().trim());
         // prepare the request
         console.log("it works!");
         var request = gapi.client.youtube.search.list({
             part: "snippet",
             type: "video",
             q: encodeURIComponent($("#searchTerm").val()).replace(/%20/g, "+"),
             maxResults: 3,
             order: "viewCount",
             publishedAfter: "2015-01-01T00:00:00Z"
         });
         // execute the request
         request.execute(function (response) {
             var results = response.result;
             $(".item").css("display", "block");
             
             $("#results").html("");
             $.each(results.items, function (index, item) {
                
                 $.get("item.html", function (data) {
                     $("#results").append("<div class='col-md-4'>" + tplawesome(data, [{ "title": item.snippet.title, "videoid": item.id.videoId }])+"</div>");
                 });
             });
             resetVideoHeight();
         });
     });

     $(window).on("resize", resetVideoHeight);
     
 });

 function resetVideoHeight() {

     $(".video").css("height", $("#results").width() * 9 / 16);
    
 }

 function init() {
     gapi.client.setApiKey("AIzaSyC3r62rUu6y7DkA7ILT7zoXgVPZ83l1P7Y");
     gapi.client.load("youtube", "v3", function () {
         // yt api is ready
     });
 }










