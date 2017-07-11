$(function(){

  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="
  var callback = "&callback=?"
  var $result = $(".result");
  var mq = window.matchMedia("(max-width: 800px)");

  // Animating Question mark form -10% to 50% on page load
  function animatingSearch(){
  $(".main").animate({top: "100%"}, "slow");
  $(".main").animate({top: "30%"}, "slow");
  $(".main").animate({top: "100%"}, "slow");
  $(".main").animate({top: "50%"}, "slow");
};

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
    if($input == "" && $(".input").width() > 0) {
      window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
    } else {
      $.ajax({
        url: url + $input + callback,
        dataType: "jsonp",
        format: "jsonp",
        success: function(x){
          $(".main").animate({top: "10%"});
          $result.html("");
          for (var i = 0; i < x[1].length; i++) {
            $result.append('<li><a href="' + x[3][i] + '" target="_blank"><h4>'
            + x[1][i] + '</h4></a><p>' + x[2][i] + '</p></li>');
          }
          $(".close").click(function(){
            $result.html("");
            $(".main").animate({top: "50%"});
            init();
          });
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
  var colors = ['#fff', '#BEDB39', '#FFE11A', '#FD7400'];
  var objectArray = [];
  var movers = [];
  var gravity = 1;
  var friction = 0.9;

  //Event Listeners
  addEventListener("resize", function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    if($("ul li").val() != ""){
      init();
    };
  });

  // Utility functions
  function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
  }

  //Objects
  function SearchIcon(x, y, dx, dy, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.update = function(){
      if (this.y + this.dy + 6 > canvas.height) {
        this.dy = -this.dy * friction;
      } else {
        this.dy += gravity;
      };
      if(this.x + this.dx + 50 > canvas.width || this.x + this.dx < 0){
        this.dx = -this.dx;
      };

      this.x += this.dx;
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

  // Function to select a object from a objectArray, and return it
  function getNewMover(){
    return objectArray.splice(Math.floor(Math.random() * objectArray.length), 1)[0];
  };

  function newArray(){
    // add a random first object to be the first mover
    movers.push(getNewMover());
      // set time interval for adding new movers
    //   setInterval(function() {
    //   if (objectArray.length > 0) {
    //       movers.push(getNewMover());
    //   }
    // }, 300);
  };

  //Implementation
  function creataObject(){
    var x = randomNumber(0, canvas.width - 50);
    var y = randomNumber(0, canvas.height - 6);
    var dx = randomNumber(-3, 6);
    var dy = randomNumber(3, 6);
    var color = randomColor(colors);
    objectArray.push(new SearchIcon(x, y, dx, dy, color));
  };
  // Adding media querys with mq.matches for max-width:800px
  function init(){
    objectArray = [];
    if(mq.matches) {
      for (var i = 0; i < 100; i++) {
        creataObject();
      }
    } else {
      for (var i = 0; i < 200; i++) {
        creataObject();
      }
    }
  };

  //Animate Loop
  function animate(){
    requestID = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < objectArray.length; i++) {
      objectArray[i].update();
    }
    if($(".main").hasClass("active")){
      newArray();
    };
    if(objectArray.length == 0 && newArray.length == 200){
      cancelAnimationFrame(requestID);
    };
  };

  animatingSearch();
  init();
  animate();

});
