AFRAME.registerComponent('wireframe', {
   dependencies: ['material'],
   init: function () {
     this.el.components.material.material.wireframe = true;
   }
 });