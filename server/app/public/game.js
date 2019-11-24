let $ = document.querySelector.bind(document);
var socket = io();
let width = 710;
let height = 400;
let brushColor = "white";
let buffer = [];

const pickColor = color => {
  currentColor.setAttribute("style", `background: ${color}`);
  brushColor = color;
};

const emitDraw = (x, y, px, py) => {
  line(x, y, px, py);
  buffer.push([brushColor, x, y, px, py]);
};

$("body").onmouseup = () => {
  if (buffer.length) {
    socket.emit("out", buffer);
    buffer = [];
  }
};

socket.on("in", inBuffer => {
  for (let arguments of inBuffer) {
    let [color, x, y, px, py] = arguments;
    stroke(color);
    line(x, y, px, py);
  }
});

function setup() {
  let cv = createCanvas(width, height);
  let parent = $("#container");
  cv.parent(parent);
  background(0);
  strokeWeight(2);
}

function draw() {
  // Draw only when mouse is pressed
  if (mouseIsPressed === true) {
    stroke(brushColor);
    if (mouseX < width && mouseY < height)
      emitDraw(mouseX, mouseY, pmouseX, pmouseY);
  }
}

//color picker

const container = $("#colors");
const currentColor = $("#currentColor");

container.setAttribute("style", `width:${width}px`);

for (let color of ["red", "green", "blue", "yellow", "white"]) {
  let colorBox = document.createElement("div");
  colorBox.className = "colorBox";
  colorBox.setAttribute("style", `background: ${color}`);

  colorBox.addEventListener("click", () => pickColor(color));
  container.appendChild(colorBox);
}
