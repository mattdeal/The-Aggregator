function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }

$(function () {
    $("form").on("submit", function (e) {
        e.preventDefault();
        // prepare the request
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
                    $("#results").append(tplawesome(data, [{ "title": item.snippet.title, "videoid": item.id.videoId }]));
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