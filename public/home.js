const urlString = window.location.href;
let url = new URL(urlString);
console.log(url);


//enter button
let enterButton;

//instruction string
let instructions = "WRITE YOUR NAME";
let textBar;

//enter string
let enter = "PRESS ENTER";


//username
let username;



function setup() {
  //canvas
  createCanvas(windowWidth, windowHeight);
  background("black");
textAlign(CENTER)

  //create Enter button
  enterButton = createElement("button", "enter");
enterButton.position(windowWidth / 2-enterButton.width/2, windowHeight/2 +40);
enterButton.class("enterButton");
enterButton.mousePressed(pressEnter);




  //input text name
  textBar = createInput("");
textBar.position(windowWidth / 2-textBar.width/2, windowHeight/2);
  textBar.class("textBar");

}
function draw() {
  background("black");
textAlign(CENTER)
  //heading
  push();
  textFont("Roboto Mono");
  textStyle(BOLD);
  textSize(20);
  fill("white");
  text("TYPE HERE", windowWidth/2, windowHeight/2-20);
  pop();
}




// function press entrer
function keyPressed(myInputEvent) {
  if (keyCode == ENTER) {
   username = textBar.value();
    salvaFrase()
    setTimeout(banner,100)
    setTimeout(refresh,2500)
  }
}

function pressEnter() {
  username = textBar.value();
  salvaFrase()
  setTimeout(banner,100)
  setTimeout(refresh,2500)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function salvaFrase() {
  let thisFrase = null;

  thisFrase = {
    text:username
  };
  addFrase(thisFrase);
  thisFrase = null;
  // prevent default
  return false;
}
function banner(){
  document.getElementById("planted").style.width = "100%";
  document.getElementById("planted").style.transition = "0.5s";
}
function refresh(){
  window.open(url, "_self");
}
