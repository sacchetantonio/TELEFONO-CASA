let easycam;
let stars = [];

let speed;
let plant;
let surface1;
let surface2;
let surface3;
let cam;

function preload() {
  plant = loadModel("./addons/Senza nome.obj");
  surface3 = loadImage("./addons/2k_mercury.jpeg");
  surface2 = loadImage("./addons/4k_ceres_fictional.jpeg");
  surface1 = loadImage("./addons/4k_eris_fictional.jpeg");
}
function setup() {
  //3D canvas WEBGL
  createCanvas(windowWidth, windowHeight, WEBGL);

  //3D camera with library EASYCAM
  easycam = createEasyCam();
  easycam = new Dw.EasyCam(this._renderer);
  // easycam = new Dw.EasyCam(this._renderer, {
  //   distance: 100,
  //   center: [100, 100, 100],
  // });
  easycam = new Dw.EasyCam(this._renderer, {
    distance: 1500,
    center: [0, 0, 0],
    rotation: [0, 0, 0, 1],
  });

  //create stars
  for (let i = 0; i < 400; i++) {
    stars[i] = new Star();
  }

  //capture video
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  //speed of the stars
  speed = 5;

  //background
  background(0, 0, 10);

  //3D point lights WEBGL
  pointLight(255, 255, 255, 1500, 1500, 0);
  pointLight(250, 255, 200, -1500, 0, -300);

  //showing and updating position STARS
  //3 planes to have 3D stars
  for (let i = 0; i < stars.length; i++) {
    //direction1
    rotateY(PI / 3);
    stars[i].update();
    stars[i].show();
    //direction2
    push();
    rotateY(PI / 4);
    stars[i].update();
    stars[i].show();
    pop();
    //direction3
    push();
    rotateX(PI / 4);
    stars[i].update();
    stars[i].show();
    pop();
  }

  //3D spoace: planets plants
  //nostroke on the objects
  noStroke();

  //planet1
  //camRecording on the surface
  push();
  texture(cam);
  scale(-1, 1);
  rotateZ(PI);
  sphere(150);
  pop();

  //planet2
  //texture "surface2" on the surface
  push();
  texture(surface2);
  translate(400, 50, -1000);
  sphere(100);
  pop();

  //planet3
  //texture "surface3" on the surface
  push();
  texture(surface3);
  translate(150, 0, 500);
  sphere(80);
  pop();

  //tree model on the central planet
  push();
  translate(0, 150, 0);
  rotateX(PI / 2);
  scale(50);
  fill(200);
  model(plant);
  pop();

  //function to move on the last message
  lastmessage();
}

//function to create Stars (THECODINGTRAIN)
function Star() {
  //position (positive and negative cause of WEBGL)
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(-width, width);
  this.pz = this.z;

  //updating position on the z position
  this.update = function () {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  };

  this.show = function () {
    fill(255);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 5, 0);
    ellipse(sx, sy, r, r);

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    //line following the star
    stroke(255);
    strokeWeight(r);
    line(px, py, sx, sy);
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//function to see always the last message
//calling box element from index.html (FROM GOOGLE)
function lastmessage() {
  const box = document.getElementById("box");
  box.scrollTop = box.scrollHeight;
}

//CHAT DESIGN SOCKET.IO
const socket = io();
//recalling elements from index.HTML
const message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  output = document.getElementById("output"),
  typing = document.getElementById("typing"),
  button = document.getElementById("button");

//send message to clients
button.addEventListener("click", () => {
  socket.emit("userMessage", {
    handle: handle.value,
    message: message.value,
  });
  document.getElementById("message").value = "";
});

//send typing message
message.addEventListener("keypress", () => {
  socket.emit("userTyping", handle.value);
});

//listen for events on the server
socket.on("userMessage", (data) => {
  typing.innerHTML = "";
  output.innerHTML +=
    "<p> <strong>" + data.handle + ":</strong>" + data.message + "</p>";
});

socket.on("userTyping", (data) => {
  typing.innerHTML = "<p><em>" + data + " is typing...</em></p>";
});
