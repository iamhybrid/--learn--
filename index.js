const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  //animate:true
};

const sketch = ({ context, width, height }) => {

let x, y, w, h, lW, fill, stroke;
let angle, rx, ry;

const num = 16;
const degrees = -30;

const rects = [];

// have randomization once at reload
for(let i = 0; i < num; i++){
  x = random.range(0, width);
  y = random.range(0, height);
  w = random.range(width * .2, width * .6);
  h = random.range(height * .1, height * .3);

  lW = random.range(h * .5) + 2;

  fill = `rgba(255, 255, 255, 1)`;
  stroke = `rgba(0, ${random.range(0,255)}, 255, 1)`;

  rects.push({x, y, w, h, lW, fill, stroke});
}

  return ({ context, width, height }) => {

    rects.forEach(rect => {

      const {x, y, w, h, lW, fill, stroke} = rect;
      context.save();

      context.translate(x,y);
      

      drawSkewedRect({context, w, h, degrees, lW, stroke, fill});

      context.restore();
    });
  };
};

const drawSkewedRect = ({context, w = 600, h = 200, degrees = -45, lW = 5, fill = 'white', stroke = 'black'}) => {
  const angle = math.degToRad(degrees);
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w;

  context.save();
  context.translate(rx * -.5, (ry + h) * -.5);

  context.lineWidth = lW;
  context.strokeStyle = stroke;
  context.fillStyle = fill;

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();

  context.stroke();
  //context.fill();

  context.restore();
}

canvasSketch(sketch, settings);