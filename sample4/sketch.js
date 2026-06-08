function setup() {
  createCanvas(600, 400);
}

function draw() {
  let t = frameCount * 0.02;

  // 0. 배경 색상 변화: 따뜻한 우주 ↔ 차가운 우주 (lerpColor + sin)
  let bgWarm = color(245, 240, 235);
  let bgCool = color(225, 230, 245);
  background(lerpColor(bgWarm, bgCool, (sin(t * 0.3) + 1) / 2));

  noStroke();

  // 크기 변화용 pulse (sin으로 각 행성마다 다른 위상)
  let p1 = sin(t) * 12;
  let p2 = sin(t + 1.0) * 18;
  let p3 = sin(t + 2.0) * 8;
  let p4 = sin(t + 0.5) * 10;

  // 1. 거대한 행성들 — 색상 및 크기 변화
  fill(lerpColor(color(210, 150, 130), color(240, 175, 155), (sin(t * 0.5) + 1) / 2));
  ellipse(180, 150, 200 + p1, 200 + p1);

  fill(lerpColor(color(160, 190, 200), color(130, 165, 210), (sin(t * 0.4 + 1.0) + 1) / 2));
  ellipse(420, 220, 280 + p2, 280 + p2);

  fill(lerpColor(color(235, 205, 120), color(255, 230, 150), (sin(t * 0.6) + 1) / 2));
  ellipse(320, 100, 150 + p3, 150 + p3);

  fill(lerpColor(color(180, 200, 180), color(155, 220, 160), (sin(t * 0.7 + 2.0) + 1) / 2));
  ellipse(120, 320, 180 + p4, 180 + p4);

  // 2. 미지의 우주선들 — 색상 변화
  fill(lerpColor(color(40, 40, 45), color(65, 65, 75), (sin(t * 0.8) + 1) / 2));
  triangle(50, 380, 200, 250, 280, 390);

  fill(lerpColor(color(220, 100, 80), color(245, 130, 105), (sin(t + 1.5) + 1) / 2));
  triangle(450, 50, 580, 120, 400, 180);

  // 3. 인공위성 및 정거장 — 크기 및 색상 변화
  rectMode(CENTER);
  let sp = sin(t * 0.8) * 7;
  fill(lerpColor(color(50, 90, 140), color(70, 115, 170), (sin(t * 0.5 + 0.5) + 1) / 2));
  rect(300, 190, 140 + sp, 140 + sp);

  let ss = sin(t * 1.5) * 5;
  fill(lerpColor(color(230, 200, 80), color(255, 225, 105), (sin(t * 1.2) + 1) / 2));
  rect(130, 90, 80 + ss, 80 + ss);

  // 4. 궤도 선 (고정)
  stroke(40, 40, 45);
  strokeWeight(5); line(30, 30, 570, 370);
  strokeWeight(3); line(100, 380, 520, 60);
  stroke(220, 100, 80);
  strokeWeight(2); line(20, 200, 580, 180);
  stroke(50, 90, 140);
  strokeWeight(4); line(350, 20, 300, 390);

  // 5. 빛나는 조각들 — 크기 변화 (반짝임)
  noStroke();
  let s1 = 25 + sin(t * 2.0) * 8;
  let s2 = 18 + sin(t * 2.5 + 0.5) * 6;
  let s3 = 30 + sin(t * 1.8 + 1.0) * 10;
  let s4 = 20 + sin(t * 2.2 + 1.5) * 7;

  fill(40, 40, 45);
  ellipse(320, 100, s1, s1); ellipse(200, 250, s2, s2);
  ellipse(520, 60, s3, s3);  ellipse(100, 380, s4, s4);

  fill(250, 250, 250);
  ellipse(320, 100, s1 * 0.4, s1 * 0.4); ellipse(200, 250, s2 * 0.35, s2 * 0.35);
  ellipse(520, 60, s3 * 0.4, s3 * 0.4);  ellipse(100, 380, s4 * 0.4,  s4 * 0.4);

  // 6. 붉은 혜성 — sin/cos 궤도 이동 + 크기 변화 (주요 애니메이션)
  let cometX = 400 + sin(t * 0.5) * 90;
  let cometY = 300 + cos(t * 0.35) * 55;
  let cometR = 40 + sin(t * 1.5) * 10;
  fill(lerpColor(color(220, 100, 80), color(245, 140, 110), (sin(t * 0.9) + 1) / 2));
  ellipse(cometX, cometY, cometR, cometR);
  fill(245, 240, 235);
  ellipse(cometX, cometY, cometR * 0.375, cometR * 0.375);
}
