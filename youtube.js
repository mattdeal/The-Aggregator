
function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }
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

 $(document).ready(function () {

     $("#searchButton").attr("disabled", true);
     $("#searchTerm").keyup(function() {
         if ($(this).val().length > 0)
             $("#searchButton").attr("disabled", false);
         else
             $("#searchButton").attr("disabled", true);
     });
     
     $("#searchButton").on("click", function (e) {
         e.preventDefault();
         $("#logo").addClass("imgAnimate");
         $("#searchArea").addClass("searchAnimate");
         $("#pageHeader").addClass("page-headerAnimate");
         $("#headerRow").addClass("pageRow");
         //var elem = document.getElementById("searchArea");
         //var elemImage = document.getElementById("logo");
         //var posH = 0;
         //var posV = 0;
         //var imgHeight = 0;
         //var imgWidth = 0;
         //var idSearch = setInterval(frame, 1);
         //var idImg = setInterval(frame, 1);
         //function frame() {
         //    if (posV === -330) {
         //        clearInterval(idSearch);
         //    } else {                 
         //        posV--; 
         //        elem.style.top = posV + "px";         
         //    }
         //    if (posH === 350) {
         //        clearInterval(idSearch);
         //    } else {
         //        posH++;             
         //        elem.style.left = posH + "px";
         //    }

         //}
         
         searchTerm = $("#searchTerm").val();
         
             gifCall(searchTerm);


       
         //doLookup($("#searchTerm").val().trim());
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










