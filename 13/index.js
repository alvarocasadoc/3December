AFRAME.registerComponent('collider-check', {
    dependencies: ['raycaster'],
  
    init: function () {
      this.el.addEventListener('raycaster-intersected', function () {
        console.log('Player hit something!');
      });
    }
  });