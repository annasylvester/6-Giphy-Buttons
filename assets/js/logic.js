let interests = ["Grumpy Cat", "Kermit Sips Tea", "Honey Badger", "Spongebob"];


// Display Gifs function
function handleSuccess() {
    $(".gifs").empty();

    var search = $(this).attr("data-name");
    console.log(search);

    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=i2UzHrAawKZQ8if08gTKifooFMPnXXCD&q=' + search + '&limit=10';

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var gifs = response.data;
        console.log(gifs);
        for (var i = 0; i < gifs.length; i++) {

            var showDiv = $("<div class='col-md-4'>");
            var rating = gifs[i].rating;
            var defaultAnimatedSrc = gifs[i].images.fixed_height.url;
            var staticSrc = gifs[i].images.fixed_height_still.url;
            var showImage = $("<img>");
            var p = $("<p>").text("Rating: " + rating);

            showImage.attr("src", staticSrc);
            showImage.addClass("giphyGif");
            showImage.attr("data-state", "still");
            showImage.attr("data-still", staticSrc);
            showImage.attr("data-animate", defaultAnimatedSrc);
            showDiv.append(p);
            showDiv.append(showImage);
            $(".gifs").prepend(showDiv);
        }


    });
}

// When an Error happens
function handleError(error) {
    $('.gifs').html('Oops! Something went wrong.')
};



// When Submit is clicked
$('#submitBtn').on("click", function (event) {
    event.preventDefault();

    const newInterest = $('#input').val().trim();
    interests.push(newInterest);
    console.log(interests)

    $('#input').val('');
    renderButtons();

});


// Creates Buttons
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
// When a button is clicked
$(document).on("click", ".interest", handleSuccess);

// Pause and play Gifs
$(document).on("click", ".giphyGif", pausePlayGifs);

function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

// Show original buttons
renderButtons();