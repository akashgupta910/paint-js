// Get the canvas and set its context --01
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas width and height equal to screen width and height --02
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// if this varables true you can draw on canvas 
let isDraw = false;

// Add events to the canvas --03
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mousemove', draw);

// Add events which work in phone
canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener('touchend', endDraw);
canvas.addEventListener('touchmove', draw);

// When mouse button down --04 (i)
function startDraw() {
    isDraw = true;
    event.preventDefault();
}

// when mouse button up --04 (ii)
function endDraw() {
    isDraw = false;
    ctx.beginPath();
    ctx.shadowBlur = 0;
    event.preventDefault();
}

// Variables
let pencil = true;
let brush = false;
let eraser = false;

// When mouse move and the varaible isDraw is true --05
function draw(event) {
    if (!isDraw) return;

    if (pencil) {
        let colorInput = document.getElementById('color').value;
        let lineWidth = document.getElementById('size-input').value;
        if (lineWidth <= 25)
            ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.strokeStyle = colorInput;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

    } else if (brush) {
        let colorInput = document.getElementById('color').value;
        let lineWidth = document.getElementById('size-input').value;
        if (lineWidth <= 25)
            ctx.lineWidth = lineWidth;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.strokeStyle = colorInput;
        ctx.shadowBlur = 5;
        ctx.shadowColor = colorInput;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

    } else if (eraser) {
        let lineWidth = document.getElementById('size-input').value;
        if (lineWidth <= 25)
            ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.strokeStyle = '#fff';
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
    
    event.preventDefault();
}

// Events to all tools buttons on the sidebar
let tools = document.getElementsByClassName('tools');
for (let index = 0; index < tools.length; index++) {
    tools[index].addEventListener('click', () => {
        let id = tools[index].getAttribute('id');
        switch (id) {
            case "pencil":
                pencil = true;
                brush = false;
                eraser = false;
                break;

            case "brush":
                brush = true;
                pencil = false;
                eraser = false;
                break;

            case "eraser":
                eraser = true;
                brush = false;
                pencil = false;
                break;
        }
    });
}

// When export button clicked download the canvas 
document.getElementById('export').addEventListener('click', () => {
    var dataURL = canvas.toDataURL();
    document.getElementById('mirror').src = dataURL;
    document.getElementById('export').href = dataURL;
    document.getElementById('mirror').src = "";
});

// when clear button clicked clear the canvas by reloading page
document.getElementById('clear').addEventListener('click', () => {
    location.reload();
});
