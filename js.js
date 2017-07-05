$(function(){

  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="
  var callback = "&callback=?"
  var $result = $(".result");

  // Animating Question mark form -10% to 50% on page load
  $(".main").animate({top: "50%"}, "slow");

  // Function to animated search menu add and remove class active
  search = function(obj, evt){
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

  // Canvas - Initial Setup
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  // Variabels
  var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
  var objectArray = [];
  var gravity = 1;
  var friciton;

  //Event Listeners
  addEventListener("resize", function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  // Utility functions
  function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
  }

  //Objects
  function SearchIcon(x, y, dy, color){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.color = color;

    this.update = function(){
      if (this.y > canvas.height) {
        this.dy = -this.dy;
      }
      this.y += this.dy;
      this.draw();
    };

    this.draw = function(){
      ctx.beginPath();
      ctx.font = "50px FontAwesome"
      ctx.fillText("\uF002", this.x, this.y);
      ctx.fillStyle = this.color;
      ctx.closePath();
    };
  };

  //Implementation
  function init(){
    objectArray = [];
    for (var i = 0; i < 100; i++) {
      var x = randomNumber(0, canvas.width);
      var y = randomNumber(0, canvas.height);
      var dy = randomNumber(4, 8);
      var color = randomColor(colors);
      objectArray.push(new SearchIcon(x, y, dy, color));
    }
  };

  // Animate Loop
  function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < objectArray.length; i++) {
      objectArray[i].update();
    }
  };

  init();
  animate();

});
