let body = document.querySelector("body");
let canvasBoard = document.querySelector("canvas");
let rectTool = document.querySelector(".fa-square");
let circTool = document.querySelector(".fa-circle");
let lineTool = document.querySelector(".fa-grip-lines-vertical");
let penTool = document.querySelector(".fa-pen");
let eraser = document.querySelector(".fa-eraser");
let options = document.querySelectorAll(".size-box");
let cTool = null;
// default height width is smaller
canvasBoard.height = window.innerHeight;
canvasBoard.width = window.innerWidth;
// this line gives tool to draw on canvas
let tool = canvasBoard.getContext("2d");
// default width
tool.lineWidth = 2;

// tool manipulation logic
rectTool.addEventListener("click", function () {
  if (cTool == "rectTool") {
    options[0].style.display = "flex";
  } else {
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }
    cTool = "rectTool";
    tool.lineWidth = rectSize;
    if (rectSize == 2)
      options[0].getElementsByClassName("size1")[0].style.border =
        "1px solid black";
  }
});
circTool.addEventListener("click", function () {
  if (cTool == "circTool") {
    options[1].style.display = "flex";
  } else {
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }
    cTool = "circTool";
    tool.lineWidth = circSize;
    if (circSize == 2)
      options[1].getElementsByClassName("size1")[0].style.border =
        "1px solid black";
  }
});
lineTool.addEventListener("click", function () {
  if (cTool == "lineTool") {
    options[2].style.display = "flex";
  } else {
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }
    cTool = "lineTool";
    tool.lineWidth = lineSize;
    if (lineSize == 2)
      options[2].getElementsByClassName("size1")[0].style.border =
        "1px solid black";
  }
});
penTool.addEventListener("click", function () {
  if (cTool == "penTool") {
    options[3].style.display = "flex";
  } else {
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }
    cTool = "penTool";
    tool.lineWidth = penSize;
    if (penSize == 2)
      options[3].getElementsByClassName("size1")[0].style.border =
        "1px solid black";
  }
});
eraser.addEventListener("click", function () {
  if (cTool == "eraser") {
    options[4].style.display = "flex";
  } else {
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }
    cTool = "eraser";
    tool.lineWidth = eraserSize;
    if (eraserSize == 2)
      options[4].getElementsByClassName("size1")[0].style.border =
        "1px solid black";
  }
});

let boardTop = canvasBoard.getBoundingClientRect().top;
let boardLeft = canvasBoard.getBoundingClientRect().left;
let iX, iY, fX, fY;
let drawingMode = false;
body.addEventListener("mousedown", function (e) {
  if (cTool == "penTool" || cTool == "eraser") drawingMode = true;
  if (cTool == "eraser") tool.strokeStyle = "white";
  else tool.strokeStyle = currentColor;
  tool.beginPath();
  iX = e.clientX - boardLeft;
  iY = e.clientY - boardTop;
  tool.moveTo(iX, iY);
});
body.addEventListener("mouseup", function (e) {
  drawingMode = false;
  fX = e.clientX - boardLeft;
  fY = e.clientY - boardTop;
  let height = fY - iY;
  let width = fX - iX;
  if (cTool == "rectTool") {
    tool.strokeRect(iX, iY, width, height);
  } else if (cTool == "lineTool") {
    tool.beginPath();
    tool.moveTo(iX, iY);
    tool.lineTo(fX, fY);
    tool.stroke();
  } else if (cTool == "circTool") {
    tool.beginPath();
    let radius = Math.max(Math.abs(fX - iX), Math.abs(fY - iY)) / 2;
    let centreX = (fX < iX ? fX : iX) + radius;
    let centreY = (fY < iY ? fY : iY) + radius;
    tool.arc(centreX, centreY, radius, 0, 2 * Math.PI);
    tool.stroke();
  }
});
body.addEventListener("mousemove", function (e) {
  if (drawingMode == false) return;
  fX = e.clientX - boardLeft;
  fY = e.clientY - boardTop;
  tool.lineTo(fX, fY);
  tool.stroke();
  iX = fX;
  iY = fY;
});

// color change logic
let redColor = document.querySelector(".red");
let greenColor = document.querySelector(".green");
let blueColor = document.querySelector(".blue");
let blackColor = document.querySelector(".black");
let currentColor = "black";
redColor.addEventListener("click", function () {
  currentColor = "lightpink";
});
greenColor.addEventListener("click", function () {
  currentColor = "lightgreen";
});
blueColor.addEventListener("click", function () {
  currentColor = "lightblue";
});
blackColor.addEventListener("click", function () {
  currentColor = "black";
});

// size change logic
let penSize = 2;
let eraserSize = 2;
let lineSize = 2;
let rectSize = 2;
let circSize = 2;

options[0].addEventListener("click", function (e) {
  let elems = ["size1", "size2", "size3", "size4"];
  let allClasses = e.target.classList;
  let firstClass = allClasses[0];
  let test = elems.includes(firstClass);

  if (test) {
    if (firstClass == "size1") {
      rectSize = 2;
    } else if (firstClass == "size2") {
      rectSize = 6;
    } else if (firstClass == "size3") {
      rectSize = 10;
    } else if (firstClass == "size4") {
      rectSize = 14;
    }
    tool.lineWidth = rectSize;

    for (let i = 0; i < elems.length; i++) {
      options[0].getElementsByClassName(elems[i])[0].style.border = "none";
    }
    options[0].getElementsByClassName(firstClass)[0].style.border =
      "1px solid black";
  }
});
options[1].addEventListener("click", function (e) {
  let elems = ["size1", "size2", "size3", "size4"];
  let allClasses = e.target.classList;
  let firstClass = allClasses[0];
  let test = elems.includes(firstClass);

  if (test) {
    if (firstClass == "size1") {
      circSize = 2;
    } else if (firstClass == "size2") {
      circSize = 6;
    } else if (firstClass == "size3") {
      circSize = 10;
    } else if (firstClass == "size4") {
      circSize = 14;
    }
    tool.lineWidth = circSize;
    for (let i = 0; i < elems.length; i++) {
      options[1].getElementsByClassName(elems[i])[0].style.border = "none";
    }
    options[1].getElementsByClassName(firstClass)[0].style.border =
      "1px solid black";
  }
});
options[2].addEventListener("click", function (e) {
  let elems = ["size1", "size2", "size3", "size4"];
  let allClasses = e.target.classList;
  let firstClass = allClasses[0];
  let test = elems.includes(firstClass);

  if (test) {
    if (firstClass == "size1") {
      lineSize = 2;
    } else if (firstClass == "size2") {
      lineSize = 6;
    } else if (firstClass == "size3") {
      lineSize = 10;
    } else if (firstClass == "size4") {
      lineSize = 14;
    }
    tool.lineWidth = lineSize;
    for (let i = 0; i < elems.length; i++) {
      options[2].getElementsByClassName(elems[i])[0].style.border = "none";
    }
    options[2].getElementsByClassName(firstClass)[0].style.border =
      "1px solid black";
  }
});
options[3].addEventListener("click", function (e) {
  let elems = ["size1", "size2", "size3", "size4"];
  let allClasses = e.target.classList;
  let firstClass = allClasses[0];
  let test = elems.includes(firstClass);

  if (test) {
    if (firstClass == "size1") {
      penSize = 2;
    } else if (firstClass == "size2") {
      penSize = 6;
    } else if (firstClass == "size3") {
      penSize = 10;
    } else if (firstClass == "size4") {
      penSize = 14;
    }
    tool.lineWidth = penSize;
    for (let i = 0; i < elems.length; i++) {
      options[3].getElementsByClassName(elems[i])[0].style.border = "none";
    }
    options[3].getElementsByClassName(firstClass)[0].style.border =
      "1px solid black";
  }
});
options[4].addEventListener("click", function (e) {
  let elems = ["size1", "size2", "size3", "size4"];
  let allClasses = e.target.classList;
  let firstClass = allClasses[0];
  let test = elems.includes(firstClass);

  if (test) {
    if (firstClass == "size1") {
      eraserSize = 2;
    } else if (firstClass == "size2") {
      eraserSize = 6;
    } else if (firstClass == "size3") {
      eraserSize = 10;
    } else if (firstClass == "size4") {
      eraserSize = 14;
    }
    tool.lineWidth = eraserSize;
    for (let i = 0; i < elems.length; i++) {
      options[4].getElementsByClassName(elems[i])[0].style.border = "none";
    }
    options[4].getElementsByClassName(firstClass)[0].style.border =
      "1px solid black";
  }
});
