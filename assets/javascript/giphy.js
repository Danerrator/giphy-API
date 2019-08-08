$(document).ready(function() {
  let heroes = ["Iron Man", "Hulk", "Spider-Man", "Captain Marvel", "Spider-Man"];

  //function to make the buttons and add them to the page

  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (let i = 0; i < arrayToUse.length; i++) {

      let a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).appen(a);

    }
  }

  //create function that will populate the images from the giphy api

  $(documen).on("click", ".button", function() {
    $("#images").empty();

    $(".button").removeClass("active");

    
    let queryURL = "http://api.giphy.com/v1/gifs/search?api_key=Lg1x3G64vioUTxbq7hLWNXrrp1nkXIds"

    //ajax call

    $.ajax({
      url:queryURL,
      method: "GET"
    })

    .then(function(response) {
      let results = response.data;

      for (var i = 0; i < results.length; i++) {
        let heroDiv = $("<div class=\"hero-item\">");

        let rating = results[i].rating;

        let p = $("<p>").text("Rating: " + rating);

        let animated = results[i].images.fixed_height.url;

        let still = results[i].images.fixed_height_still.url;

        let heroImages = $("<img>");
        heroImages.attr("src", still);
        heroImages.attr("data-still", still);
        heroImages.attr("data-animate", animated);
        heroImages.attr("data-state", "still");
        heroImages.addClass("hero-images");

        heroDiv.append(p);
        heroDiv.append(heroImages);

        $("#imgaes").append(heroDiv);
      }
    });
  });

  // when clicked animate gifs

  $(document).on("click", ".hero-image", function(){
    let state = $(this).attr("data-state");

    if (state === "still"){
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-hero").on("click", function(event){
    event.preventDefautl();
    let newHero = $("input").eq(0).val();

    if (newHero.length > 2) {
      heroes.push(newHero);
    }

    populateButtons(heroes, "button", "#button");
  });
  populateButtons(heroes, "button", "#button");
});