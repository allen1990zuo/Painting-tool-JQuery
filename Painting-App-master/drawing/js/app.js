// Drawing Application
var color = $(".selected").css("background-color");
var strokeWidth;
var $canvas = $("canvas");
$canvas.addClass("penCurse");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;


$(".controls").on("click", "li", function(){
  $(this).siblings().removeClass("selected");
  $(this).addClass("selected");
  color = $(this).css("background-color");
});

$("#chooseStrokeWidth").on("click", function(){
  strokeWidth = $("#inputStroke").val();
});
function removeAllClass(){
  $canvas.removeClass("penCurse");
  $canvas.removeClass("eraserCurse");
  $canvas.removeClass("crayonCurse");
}

$(".tools").on("click", "li", function(){
  $(this).siblings().removeClass("choosed");
  $(this).addClass("choosed");

  if ($(this).hasClass("pen")){
    removeAllClass();
    $canvas.addClass("penCurse");
  } else if($(this).hasClass("eraser")){
    removeAllClass();
    $canvas.addClass("eraserCurse");
  } else if ($(this).hasClass("crayon")){
    removeAllClass();
    $canvas.addClass("crayonCurse");
  }
});
  
$("#revealColorSelect").click(function(){
  changeColor();
  $("#colorSelect").toggle();
});

function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
}

$("input[type=range]").change(changeColor);

$("#addNewColor").click(function(){
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  $newColor.click();
});

$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  if(mouseDown) {
    if($canvas.hasClass("penCurse")){
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.lineWidth = strokeWidth;
      context.stroke();
      lastEvent = e;
    } else if($canvas.hasClass("eraserCurse")){
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = "#ffffff";
      context.lineWidth = strokeWidth;
      context.stroke();
      lastEvent = e;
    }
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});



  







