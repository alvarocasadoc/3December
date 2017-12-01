AFRAME.registerGeometry('plumbob', {
    schema: {
      depth: {default: 1, min: 0},
      height: {default: 1, min: 0},
      width: {default: 1, min: 0},
      segmentsHeight: {default: 1, min: 1, max: 20, type: 'int'},
      segmentsWidth: {default: 1, min: 1, max: 20, type: 'int'},
      segmentsDepth: {default: 1, min: 1, max: 20, type: 'int'}
    },
    init: function (data) {
      var geometry = new THREE.Geometry();
      geometry.vertices = [
          new THREE.Vector3( -data.width/2, 0, -data.depth/2 ),
          new THREE.Vector3( -data.width/2, 0, data.depth/2 ),
          new THREE.Vector3( data.width/2, 0, data.depth/2 ),
          new THREE.Vector3( data.width/2, 0, -data.depth/2 ),
          new THREE.Vector3( 0, data.height/2, 0 ),
          new THREE.Vector3( 0, -data.height/2, 0 )
      ];
      geometry.computeBoundingBox();
      geometry.faces = [
          new THREE.Face3( 0, 1, 2 ),
          new THREE.Face3( 0, 2, 3 ),
          new THREE.Face3( 1, 0, 4 ),
          new THREE.Face3( 2, 1, 4 ),
          new THREE.Face3( 3, 2, 4 ),
          new THREE.Face3( 0, 3, 4 ),
          new THREE.Face3( 1, 0, 5 ),
          new THREE.Face3( 2, 1, 5 ),
          new THREE.Face3( 3, 2, 5 ),
          new THREE.Face3( 0, 3, 5 )
      ];    
      geometry.mergeVertices();
      geometry.computeFaceNormals();
      geometry.computeVertexNormals();
      this.geometry = geometry;
    }
  });