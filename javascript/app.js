$(document).ready(function() {
  var movies = ["Up", "Mean Girls", "The Matrix", "Clueless", "Pulp Fiction"];
  //add buttons
  function renderButtons() {
    $("#movie-buttons").empty();
    for (i = 0; i < movies.length; i++) {
      $("#movie-buttons").append(
        "<button class='btn btn-info'" +
          movies[i] +
          ">" +
          movies[i] +
          "</button>"
      );
    }
  }
  //   console.log(movies);
  renderButtons();
  //button for movie entered
  $("#add-movie").on("click", function() {
    event.preventDefault();
    var movie = $("#movie-input")
      .val()
      .trim();
    movies.push(movie);
    renderButtons();
  });
  //gifs from api
  $("button").on("click", function() {
    var movie = $(this).attr("data-movie");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      movie +
      "&api_key=RNITXX2lqBuc80qPUlhdk8vHVntTH9FD&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results);
      $("#movies").empty();
      for (var i = 0; i < results.length; i++) {
        var movieDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + results[i] + rating);
        var movieIMG = $("<img>");

        movieIMG.attr("src", results[i].images.fixed_height.url);

        movieIMG.append(p);
        movieDiv.append(movieIMG);
        $("#movies").prepend(movieDiv);
      }
    });
  });
});
