var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="
var callback = "&callback=?"
var $result = $(".result");

// Animating Question mark form -10% to 50% on page load
$(".main").animate({top: "50%"}, "slow");

// Function to animated search menu add and remove class active
function search(obj, evt){
  var container = $(obj).closest(".main");
  if(!container.hasClass("active")){
    container.addClass("active");
    evt.preventDefault();
  } else if(container.hasClass("active") && $(obj).closest(".holder").length == 0){
    container.removeClass("active");
    container.find("input").val('');
  }
};

// Click function to triger the wikipedia search
$(".icon").click(function(){
  var $input = $(".input").val();
  if($input == "") {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
  } else {
    $.ajax({
      url: url + $input + callback,
      dataType: "jsonp",
      format: "jsonp",
      success: function(x){
        $(".main").animate({top: "10%"}, "slow");
        $result.html("");
        for (var i = 0; i < x[1].length; i++) {
          $result.append('<li><a href="' + x[3][i] + '" target="_blank"><h4>'
          + x[1][i] + '</h4></a><p>' + x[2][i] + '</p></li>');
        }
      }
    })
  }
});

// Function to triger a event by pressing enter in input field
$(".input").keypress(function(e){
  if(e.which == 13){
    $(".icon").click();
  }
});
