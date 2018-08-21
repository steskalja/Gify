$(document).ready(function() {
  
  var gButtons = ['Bugs Bunny','Daffy Duck','Porky Pig','Road Runner'];

  function buildButtons()
  {
    for(i=0; i < gButtons.length; i++)
    {
      var bVal = gButtons[i];
      var bContain = $("#sButtons");
      var nButton = $('<button type="button" class="btn btn-info ibutton">')
      nButton.text(bVal);
      nButton.attr("data-item",bVal);
      bContain.append(nButton);
    }
  }

  buildButtons();

  $("#add-cartoon").on("click",function()
  {
    event.preventDefault();
    var nBTN = $("#cartoon-input").val().trim();
    if($.inArray(nBTN,gButtons) === -1)
    {
      gButtons.push(nBTN);
      $("#sButtons").empty();
      buildButtons();
    }
    nBTN.val = "";

  });

  $(document).on("click", ".ibutton", function() {
    var itm = $(this).attr("data-item");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      itm + "&api_key=MME8oUodXQJjCvrsGgkCWi4065NmjKu7&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        $("#sImages").empty();
        for (var i = 0; i < results.length; i++) {
          var rating = results[i].rating;

          var iDiv = $("<div class='imgContainer'>");
          var txt = $("<p>");
          var itmImage = $("<img class='gif img-responsive'>");
          itmImage.attr("src", results[i].images.fixed_height.url);
          itmImage.attr("data-still", results[i].images.fixed_height_still.url);
          itmImage.attr("data-animate", results[i].images.fixed_height.url);
          itmImage.attr("data-state", "animate");
          txt.text("Rating: " + rating);
          iDiv.append(itmImage);
          iDiv.append(txt);
          $("#sImages").append(iDiv);
        }
      });
  });



  $(document).on("click",".gif" , function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


});