const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const accuracyText = document.getElementById("accuracy-text");

ctx.canvas.width = canvas.offsetWidth;
ctx.canvas.height = canvas.offsetHeight;
console.log(ctx);

const canvasTop = ctx.canvas.getBoundingClientRect().top;
let lastPoint = undefined;
let shapePoints = [];
let drawing = false;
const strokeRadius = 5;


ctx.lineWidth = strokeRadius;
drawCenterCircle();
canvas.onmousedown = (e) => {drawing = true}
canvas.onmouseup = (e) => {
    drawing = false;

    //calculate shape score
    let dist = 0;
    let centerX = ctx.canvas.offsetWidth / 2;
    let centerY = ctx.canvas.offsetHeight / 2 - canvasTop;

    for(let i = 0; i  < shapePoints.length; i++){
        //calculate average distace from center
        dist += Math.sqrt(Math.pow(shapePoints[i].x - centerX, 2) + Math.pow(shapePoints[i].y - centerY, 2));
    }
    dist /= shapePoints.length;

    let diff = 0;
    for(let i = 0; i < shapePoints.length; i++){
        diff += Math.abs(Math.sqrt(Math.pow(shapePoints[i].x - centerX, 2) + Math.pow(shapePoints[i].y - centerY, 2)) - dist);
    }
    diff /= shapePoints.length;
    diff /= dist;
    accuracyText.innerText = "Accuracy: " + (1 - diff).toFixed(2) + "%";
}

addEventListener("mousemove", function(e){
    if(drawing){
        if(lastPoint == undefined){
            lastPoint = {x: e.clientX, y: e.clientY - canvasTop}
        }else{
            drawCircle(e.clientX, e.clientY - canvasTop, strokeRadius);
        }
        lastPoint = {x: e.clientX, y: e.clientY - canvasTop}
        shapePoints.push(lastPoint);
    }
 });

function drawCenterCircle(){
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(ctx.canvas.offsetWidth / 2, ctx.canvas.offsetHeight / 2 - canvasTop);
    ctx.arc(ctx.canvas.offsetWidth / 2, ctx.canvas.offsetHeight / 2 - canvasTop, strokeRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(ctx.canvas.offsetWidth / 2, ctx.canvas.offsetHeight / 2 - canvasTop, strokeRadius * 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    
}

function drawCircle(x, y){
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.arc(x, y, strokeRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    // ctx.lineTo(x, y);
    // ctx.stroke();
}