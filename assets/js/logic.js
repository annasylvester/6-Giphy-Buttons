let interests = [];

//////////// SEARCH GIPHY ////////////////
function searchGiphy(value) {
    const endpoint = 'https://api.giphy.com/v1/gifs/search?';
    const params = 'api_key=i2UzHrAawKZQ8if08gTKifooFMPnXXCD&q=' + value + '&limit=10';
    const url = endpoint + params;
    $.ajax(url)
        .then(handleSuccess)
        .catch(handleError);
}


//////////// DISPLAY GIFS FUNCTION //////////////
function handleSuccess(data) {

    const gifs = data.data;

    for (var i = 0; i < gifs.length; i++) {

        var showDiv = $("<div class='col-md-4'>");
        var rating = gifs[i].rating;
        var defaultAnimatedSrc = gifs[i].images.fixed_height.url;
        var staticSrc = gifs[i].images.fixed_height_still.url;
        var showImage = $("<img>");
        var p = $("<p>").text("Rating: " + rating);

        showImage.attr("src", staticSrc);
        showImage.addClass("netflixGiphy");
        showImage.attr("data-state", "still");
        showImage.attr("data-still", staticSrc);
        showImage.attr("data-animate", defaultAnimatedSrc);
        showDiv.append(p);
        showDiv.append(showImage);
        $(".gifs").prepend(showDiv);
    }

    console.log('Data: ', gifs);
}

//////// WHEN ERROR HAPPENS ///////////////
function handleError(error) {
    $('.gifs').html('Oops! Something went wrong.')
}



///////// WHEN SUBMIT IS CLICKED //////////////
$('#submitBtn').on("click", function (event) {
    event.preventDefault();

    const newInterest = $('input[name="search"]').val().trim();
    interests.push(newInterest);
    console.log(interests)
    searchGiphy(newInterest);

    $('input[name="search"]').val('');
    renderButtons();

});


///////// CREATE BUTTONS ////////////////
function renderButtons() {
    $("#button-bar").empty();

    for (let i = 0; i < interests.length; i++) {
        let b = $("<button>");
        b.addClass("interest");
        b.attr("data-name", interests[i]);
        b.text(interests[i]);
        $("#button-bar").append(b);
    }
}
///////// WHEN BUTTON CLICKED ///////////////


