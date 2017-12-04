AFRAME.registerComponent('ball-shooter', {
  schema: {
    components: { default: ['dynamic-body', 'throwable'] },
    amount:   { default: 20, min: 0 },
    interval:   { default: 500, min: 0 }
  },
  init: function () {
    this.balls = [];
    this.timeout = setInterval(this.spawn.bind(this), this.data.interval);
  },
  spawn: function () {
    if (this.balls.length >= this.data.amount) {
      clearTimeout(this.timeout);
      return;
    }
    var data = this.data,
        ball = document.createElement('a-sphere');
    this.balls.push(ball);
    this.el.appendChild(ball);
    ball.setAttribute('radius', '0.6');
    ball.setAttribute('position', this.randomPosition());
    data.components.forEach(function (s) {
      ball.setAttribute(s, '');
    });

    setTimeout(function () {
        ball.body.velocity.set(0,0,-80);
    }, 10);
    
  },
  randomPosition: function () {
    return {x: Math.random() * 10, y: Math.random() * -15, z: 10};
  }
});