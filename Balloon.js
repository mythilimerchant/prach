class Balloon {
  constructor(x, y, w, speed, img, windowHeight) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = 2.575 * w;
    this.speed = speed;
    this.wh = windowHeight; 
    this.balloon = img;
  }

  clicked(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d < this.w) {
      return true;
    }
    return false;
  }

  move() {
    this.x += random(-0.5, 0.5);
    this.y -= this.speed;
    if (this.y <= -this.h) {
      this.y = this.wh + 20;
    }
  }

  show() {
    image(this.balloon, this.x, this.y, this.w, this.h)
  }
}