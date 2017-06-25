function search(obj){
  var container = $(obj).closest(".main");
  if(!container.hasClass("active")){
    container.addClass("active");
    evt.preventDefault();
  } else if(container.hasClass("active") && $(obj).closest(".holder").length == 0){
    container.removeClass("active");
    container.find(".input").val('');

  }
};
