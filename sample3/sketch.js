let charX = 300;
let charY = 0;
let jumping = false;
let jumpVel = 0;
let blinkTimer = 0;
let isBlinking = false;
let isScared = false;
let scaredTimer = 0;
let bgMode = 0;
let charTilt = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (bgMode === 0) {
    background(230, 240, 250);
  } else {
    background(20, 25, 50);
    noStroke();
    fill(255, 255, 180, 180);
    for (let i = 0; i < 30; i++) {
      let sx = (i * 73 + 17) % 600;
      let sy = (i * 37 + 11) % 300;
      ellipse(sx, sy, 3, 3);
    }
  }

  blinkTimer++;
  if (blinkTimer > 120) isBlinking = true;
  if (blinkTimer > 130) { isBlinking = false; blinkTimer = 0; }

  if (isScared) {
    scaredTimer++;
    if (scaredTimer > 40) { isScared = false; scaredTimer = 0; }
  }

  if (jumping) {
    charY += jumpVel;
    jumpVel += 1.5;
    if (charY >= 0) { charY = 0; jumping = false; jumpVel = 0; }
  }

  if (keyIsDown(LEFT_ARROW)) { charX -= 3; charTilt = -0.15; }
  else if (keyIsDown(RIGHT_ARROW)) { charX += 3; charTilt = 0.15; }
  else { charTilt = 0; }

  if (charX < 80) charX = 80;
  if (charX > 520) charX = 520;

  let cx = charX;
  let cy = 200 + charY;

  push();
  translate(cx, cy);
  rotate(charTilt);

  noStroke();
  fill(50, 100, 150);
  arc(0, 200, 260, 200, PI, TWO_PI);
  fill(255, 220, 180);
  rect(-20, 60, 40, 50);

  fill(255, 220, 180);
  ellipse(0, 0, 150, 180);


  fill(30, 20, 10);
  arc(0, -45, 150, 100, PI, TWO_PI);

  fill(255);
  let eyeH = isBlinking ? 4 : (isScared ? 28 : 20);
  ellipse(-35, -10, 30, eyeH);
  ellipse(35, -10, 30, eyeH);


  let dx = mouseX - cx;
  let dy = mouseY - cy;
  let d = sqrt(dx * dx + dy * dy);
  let ex = (d > 0) ? (dx / d) * 6 : 0;
  let ey = (d > 0) ? (dy / d) * 6 : 0;
  fill(0);
  if (!isBlinking) {
    ellipse(-35 + ex, -10 + ey, isScared ? 14 : 10, isScared ? 14 : 10);
    ellipse(35 + ex, -10 + ey, isScared ? 14 : 10, isScared ? 14 : 10);
  }

  noFill();
  stroke(20);
  strokeWeight(3);
  ellipse(-35, -10, 45, isScared ? 36 : 35);
  ellipse(35, -10, 45, isScared ? 36 : 35);
  line(-13, -10, 13, -10);
  line(-57, -10, -57, -10);
  line(57, -10, 57, -10);

  noFill();
  strokeWeight(2);
  stroke(20);
  if (isScared) {
    ellipse(0, 40, 30, 36);
  } else {
    arc(0, 40, 40, 20, 0, PI);
  }

  noStroke();
  fill(255, 180, 180, isScared ? 180 : 80);
  ellipse(-52, 10, 28, 18);
  ellipse(52, 10, 28, 18);

  pop();

  noStroke();
  fill(255, 220, 80, 160);
  ellipse(mouseX, mouseY, 8, 8);
  fill(255, 255, 200, 60);
  ellipse(mouseX, mouseY, 20, 20);

  noStroke();
  fill(bgMode === 0 ? 60 : 200);
  textSize(11);
  textAlign(LEFT);
  text("← → : 이동  SPACE : 점프  N : 낮/밤 전환  CLICK : 놀란 표정", 10, 390);
  text("마우스 이동: 눈동자 추적", 10, 15);
}

function mouseClicked() {
  isScared = true;
  scaredTimer = 0;
}

function keyPressed() {
  if (key === ' ' && !jumping) {
    jumping = true;
    jumpVel = -18;
  }
  if (key === 'n' || key === 'N') {
    bgMode = 1 - bgMode;
  }
}
