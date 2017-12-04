var sceneEl = document.querySelector('a-scene');
var n = 15, m = 10;
for (let row = 0; row < n; row++) {
  for(let col = 0; col < m; col++) {
    var ball = document.createElement('a-sphere');
    ball.setAttribute('id', row + '-' + col);
    ball.setAttribute('radius', '0.4');
    ball.setAttribute('material', 'color: red');
    ball.setAttribute('position', col*1.1 + ' ' + -row*1.1 + '-5');
    
    if (row == 0) {
        ball.setAttribute('static-body', '');
    } else {
        ball.setAttribute('dynamic-body', 'mass: 1;');
        ball.setAttribute('constraint','collideConnected: false; target: #' + (row - 1) + '-' + col);
    }

    //styling
    if(row < 3) {
      ball.setAttribute('color', '#5b2c6f');
    } else if (row < 6) {
      ball.setAttribute('color', '#e74c3c');
    } else if (row < 9) {
      ball.setAttribute('color', '#f39c12');
    } else if (row < 12) {
      ball.setAttribute('color', '#f5b041');
    } else {
      ball.setAttribute('color', '#f7dc6f');
    }

    sceneEl.appendChild(ball);
  }
}