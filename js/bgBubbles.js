class Bubble {
    constructor(pageWidth, pageHeight) {
        this.xPos = Math.floor(Math.random() * pageWidth);
        this.x = 'left: ' + this.xPos + 'px;';
        this.yPos = pageHeight + Math.floor(Math.random() * 200);
        this.y = 'top: ' + this.yPos + 'px;';
        this.size = Math.floor(Math.random() * 7) + 4;
        this.sizePlus = this.size - 1;
        this.width = 'width: ' + this.size + 'px;';
        this.height = 'height: ' + this.sizePlus + 'px;';
        this.background = 'background: rgba(255, 255, 200, .13);';
        this.border = 'border-top: 1px solid #fff;';
        this.radius = 'border-radius: 50%;';
        this.speed = this.size * .2;
        this.dir = Math.floor(Math.random() * 2);
        this.ocillation = Math.floor(Math.random() * 7) + 2;
        this.count = 0;
    }  // constructor

    Move() {
        this.yPos -= this.speed;
        this.y = 'top: ' + this.yPos + 'px;';
        // back to back motion - off for now
        if(this.count > this.ocillation) {
            if(this.dir == 0) { // left
                if(this.size > 6) {
                    this.xPos -= this.speed * .4;
                    this.x = 'left: ' + this.xPos + 'px;'; 
                }
                this.count++;
            }
            else { // right
                if(this.size > 6) {
                    this.xPos += this.speed * .4;
                    this.x = 'left: ' + this.xPos + 'px;'; 
                }
                this.count++;
            }
        }
        else {
            if(this.dir == 0)
                this.dir = 1
            else
                this.dir = 0
            this.count = 0; 
        }
    } // Move()

    // called when bubble goes above screen
    Reset() {
        this.xPos = Math.floor(Math.random() * pageWidth);
        this.x = 'left: ' + this.xPos + 'px;';
        this.yPos = pageHeight + Math.floor(Math.random() * 200);
        this.y = 'top: ' + this.yPos + 'px;';
        this.size = Math.floor(Math.random() * 7) + 4;
        this.sizePlus = this.size - 1;
        this.width = 'width: ' + this.size + 'px;';
        this.height = 'height: ' + this.sizePlus + 'px;';
        this.speed = this.size * .2;
        this.ocillation = Math.floor(Math.random() * 7) + 2;
    } // Reset()
} // class

// site.js code begins here //
(function () {
  var requestAnimationFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

let pageHeight = window.innerHeight;
let pageWidth = window.innerWidth;

let main = document.querySelector('main');
main.setAttribute('style', 'height: ' + pageHeight + 'px;');

let bubble;
let bubbles = [];
const MAX_BUBBLES = 90;

// creates max bubbles
for(let i = 0; i < MAX_BUBBLES; i++) {
  bubble = new Bubble(pageWidth, pageHeight);
  bubbles.push(bubble);
  let bubb = document.createElement('div');
  bubb.setAttribute('class', 'bubble');
  bubb.setAttribute('style', bubble.x + bubble.y + bubble.radius + bubble.background +
    bubble.width + bubble.height + bubble.border);
  main.appendChild(bubb);
}

// grabs the bubbles from the DOM after! they are created!
let theBubbles = document.querySelectorAll('.bubble');
  
// called from Update()
function MoveBubbles() {
  for(let i = 0; i < MAX_BUBBLES; i++) {
    bubbles[i].Move();
    if(bubbles[i].yPos < -10)
      bubbles[i].Reset();
    theBubbles[i].setAttribute('style', bubbles[i].x + bubbles[i].y + bubbles[i].radius + bubbles[i].background +
      bubbles[i].width + bubbles[i].height + bubbles[i].border);
  }
} // MoveBubbles()

function Update() {
    MoveBubbles();
    requestAnimationFrame(Update); // recalls Update
} // Update()

//--------------------> ONLOAD EVENT LISTENER <---------------------//
window.addEventListener("load", function () {
    Update();
});