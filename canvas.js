var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");
var erasing;
var color;
var size = 6;
var isdrawing = false;
var pen_draw = false;
var rectangle = false;
var triangle = false;
var circle = false;
var store_sahpe = false;
var undo_flag = false;
var text = false;
var text_size = 18;
var text_font = " normal";
var init_x,init_y;
var temp_pic;
var imgData;
var input = document.createElement("input");;
var text_size_input;
var pre_pic = [];
var next_pic = [];

function erase(){
    erasing = !erasing;
    if(erasing)document.getElementById("paper").style.cursor = "url('image/eraser.png'), auto";
    else document.getElementById("paper").style.cursor = "default";
    pen_draw = false;
    rectangle = false;
    triangle = false;
    circle = false;
    text = false;
    input.remove();
}
function pen(){
    pen_draw = !pen_draw;
    if(pen_draw)document.getElementById("paper").style.cursor = "url('image/brush.png'), auto";
    else document.getElementById("paper").style.cursor = "default";
    erasing = false;
    rectangle = false;
    triangle = false;
    circle = false;
    text = false;
    input.remove();
}
function draw_rectangle(){
    rectangle = !rectangle;
    if(rectangle)document.getElementById("paper").style.cursor = "url('image/rectangle.png'), auto";
    else document.getElementById("paper").style.cursor = "default";
    pen_draw = false;
    erasing = false;
    triangle = false;
    circle = false;
    text = false;
    store_sahpe = true;
    input.remove();
}
function draw_triangle(){
    triangle = !triangle;
    if(triangle)document.getElementById("paper").style.cursor = "url('image/triangle.png'), auto";
    else document.getElementById("paper").style.cursor = "default";
    pen_draw = false;
    erasing = false;
    rectangle = false;
    circle = false;
    text = false;
    store_sahpe = true;
    input.remove();
}
function draw_circle(){
    circle = !circle;
    if(circle)document.getElementById("paper").style.cursor = "url('image/circle.png'), auto";
    else document.getElementById("paper").style.cursor = "default";
    pen_draw = false;
    erasing = false;
    rectangle = false;
    triangle = false;
    text  = false;
    store_sahpe = true;
    input.remove();
}
function undo(){
    if(pre_pic.length!=0){
        var a = pre_pic.pop();
        next_pic.push(ctx.getImageData(0,0,1000,630));
        ctx.putImageData(a,0,0);
    }
    console.log(pre_pic,next_pic);
}
function redo(){
    if(next_pic.length!=0){
        var a = next_pic.pop();
        pre_pic.push(ctx.getImageData(0,0,1000,630));
        ctx.putImageData(a,0,0);
    }
    console.log(pre_pic,next_pic);
}
function rst(){
    ctx.clearRect(0,0,1000,630);
    isdrawing = false;
    store_sahpe = false;
    pre_pic.length = next_pic.length = 0;
}
function create_txt(){
    text = !text;
    if(text)document.getElementById("paper").style.cursor = "url('image/text.png'), auto";
    else document.getElementById("paper").style.cursor = "default";
    pen_draw = false;
    erasing = false;
    rectangle = false;
    triangle = false;
    circle = false;
    if(text){
        input = document.createElement("input");
        input.setAttribute('type', 'text');
        document.getElementById("edit").appendChild(input);
    }
    else{
        input.remove();
    }
}
function select_size() {
    document.getElementById("text_size").classList.toggle("show");
}
function size_18(){
    text_size = 18;
}
function size_30(){
    text_size = 30;
}
function size_40(){
    text_size = 40;
}
function size_50(){
    text_size = 50;
}
function select_font(){
    document.getElementById("text_font").classList.toggle("show");
}
function set_font_normal(){
    text_font = " normal"
}
function set_font_Arial(){
    text_font = " Arial"
}
function set_font_Fantasy(){
    text_font = " Fantasy"
}
function set_font_Comic(){
    text_font = " Comic Sans MS"
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}
  
function download(){
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "image.png";
    link.href = image;
    link.click();
}
let fileInput = document.getElementById("upload");
fileInput.addEventListener('change', function(ev) {
   if(ev.target.files) {
      let file = ev.target.files[0];
      var reader  = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
          var image = new Image();
          image.src = e.target.result;
          image.onload = function(ev) {
            pre_pic.push(ctx.getImageData(0,0,1000,630));
            ctx.drawImage(image,0,0);
            document.getElementById("upload").value ="";
         }
      }
   }
});
window.addEventListener("change_size", resize, false);
function resize(){
    size = event.target.value;
}

window.addEventListener("change", watchColorPicker, false);
function watchColorPicker(event) {
    color = event.target.value;
}

canvas.addEventListener("mousedown",start_drawing);
canvas.addEventListener("mouseup",end_drawing);
canvas.addEventListener("mousemove",draw);
///draw
function start_drawing(mouse_position){
    if(rectangle || triangle || circle){
        init_x = mouse_position.clientX;
        init_y = mouse_position.clientY;
        store_sahpe = true;
        imgData = ctx.getImageData(0, 0, 1000, 630);
        pre_pic.push(ctx.getImageData(0,0,1000,630));
        isdrawing = true;
        ctx.beginPath();
    }
    else if(pen_draw || erasing){
        pre_pic.push(ctx.getImageData(0,0,1000,630));
        isdrawing = true;
        ctx.beginPath();
    }
    else if(text){
        ctx.globalCompositeOperation="source-over";
        pre_pic.push(ctx.getImageData(0,0,1000,630));
        ctx.font =  text_size+ "px" + text_font;
        ctx.fillStyle = color;
        ctx.fillText(input.value,mouse_position.clientX,mouse_position.clientY);
        console.log("he");
        return;
    }
}
function end_drawing(){
    isdrawing = false;
    imgData = ctx.getImageData(0, 0, 1000, 630);
    return;
}
function draw(mouse_position){
    if(!isdrawing)return;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    if(erasing == true){
        ctx.globalCompositeOperation="destination-out";
        ctx.lineWidth = size;
    }
    else{
        ctx.globalCompositeOperation="source-over";
    }

    if(!rectangle && !triangle && !circle && (pen_draw||erasing)){
        ctx.lineTo(mouse_position.clientX,mouse_position.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouse_position.clientX,mouse_position.clientY);
    }
    else if(rectangle && !triangle && !circle && !pen_draw && !erasing){
        var x = Math.min(mouse_position.clientX,init_x),
			y = Math.min(mouse_position.clientY,init_y),
			w = Math.abs(mouse_position.clientX - init_x),
            h = Math.abs(mouse_position.clientY - init_y);
        ctx.putImageData(imgData,0,0);
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.stroke();
    }
    else if(!rectangle && triangle && !circle && !pen_draw){
        var x = (init_x<mouse_position.clientX)?init_x-Math.abs(mouse_position.clientX-init_x):init_x+Math.abs(mouse_position.clientX-init_x),
            y = mouse_position.clientY;
        ctx.putImageData(imgData,0,0);
        ctx.beginPath();
        ctx.moveTo(init_x,init_y);
        ctx.lineTo(mouse_position.clientX,mouse_position.clientY);
        ctx.lineTo(x,y);
        ctx.closePath();
        ctx.stroke();
    }
    else if(!rectangle && !triangle && circle && !pen_draw){
        var squere_delta = Math.abs(init_x-mouse_position.clientX)**2 + Math.abs(init_y-mouse_position.clientY)**2;
        var radius = Math.sqrt(squere_delta)/2;
        var i_x = (init_x+mouse_position.clientX)/2;
        var i_y = (init_y+mouse_position.clientY)/2;
        ctx.putImageData(imgData,0,0);
        ctx.beginPath();
        ctx.arc(i_x,i_y,radius,0, 2*Math.PI);
        ctx.stroke();
    }
    else return;
}
