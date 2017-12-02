    function createBones ( sizing ) {
      bones = [];

      let prevBone = new THREE.Bone();
      bones.push( prevBone );
      prevBone.position.y = -sizing.height/2;

      for ( let i = 0; i < sizing.partNum; i ++ ) {

        let bone = new THREE.Bone();
        bone.position.y = sizing.height/sizing.partNum;
        bones.push( bone );
        prevBone.add( bone );
        prevBone = bone;

      }

      return bones;

    }
    function createMesh ( geometry, bones, addHelper ) {

				let material = new THREE.MeshPhongMaterial( {
					skinning : true,
					color: 'yellowgreen',
					side: THREE.DoubleSide,
					flatShading: true
				} );

				let mesh = new THREE.SkinnedMesh( geometry,	material );
				let skeleton = new THREE.Skeleton( bones );

				mesh.add( bones[ 0 ] );

				mesh.bind( skeleton );

				if (addHelper) {
          skeletonHelper = new THREE.SkeletonHelper( mesh );
          skeletonHelper.material.linewidth = 2;
          scene.add( skeletonHelper );
        }
				return mesh;

	}
    
  AFRAME.registerComponent('skinned-mesh', {
    schema : {
      partNum: { default : 3 },
      speed: { default : 400 }
    },
    init: function () {     
      var geometry = this.el.object3D;
      scene = this.el.sceneEl.object3D;

      this.data.height = geometry.height;
      
      var bones = createBones(this.data);
      
      this.mesh = createMesh( geometry, bones, true );

      this.mesh.scale.multiplyScalar( 0.08);
      
      this.el.object3D.add( this.mesh );
      this.mesh.position.z -= 2;   
    },
    tick : function (t) {
      for ( var i = 0; i < this.mesh.skeleton.bones.length; i ++ ) {
        this.mesh.skeleton.bones[ i ].rotation.z = Math.sin( t / this.data.speed ) * 10 / this.mesh.skeleton.bones.length;
        this.mesh.skeleton.bones[ i ].rotation.x = 0;
      }
    }
  })
  