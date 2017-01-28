// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
    var q = $('#searchTerm').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });

    request.execute(function (response) {
        var str = JSON.stringify(response.result);
        $('#resultsYouTube').html('<span>' + str + '</span>');
    });
}
