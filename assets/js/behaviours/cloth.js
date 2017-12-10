AFRAME.registerComponent('cloth', {
  schema: {
    xPoints: {default: 16},
    yPoints: {default: 16},
    width: {default: 1},
    height: {default: 1},
    map: {type: 'asset'},
    mass: {default: 0.2},
    velocity: {default: 0.1},
    hanging: {default: true}
  },
  init: function () {
    var width     = this.width   = this.data.width;
    var height    = this.height  = this.data.height;
    var xPoints   = this.xPoints = this.data.xPoints;
    var yPoints   = this.yPoints = this.data.yPoints;
    var mass      = this.mass    = this.data.mass; 
    var xD        = this.xD      = width / xPoints;
    var yD        = this.yD      = height / yPoints;
    var pointMass = mass / (xPoints*yPoints);

    var velocity  = this.velocity = this.data.velocity;
    
    var clothPlane = this.clothPlane = planeF(xD * xPoints, yD * yPoints);

    var texture = new THREE.TextureLoader().load(this.data.map);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 16;

    var material = new THREE.MeshPhongMaterial( {
        alphaTest: 0.5,
        color: 0xffffff,
        specular: 0x333333,
        emissive: 0x222222,
        map: texture,
        side: THREE.DoubleSide
    } );
    
    var geometry = new THREE.ParametricGeometry(clothPlane, xPoints, yPoints, true);
    geometry.computeFaceNormals();
    geometry.dynamic = true;

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.castShadow = true;
    this.el.setObject3D('mesh', mesh);
    mesh.receiveShadow = true;
    
    if (this.el.sceneEl.hasLoaded) {
        this.instantiate();
      } else {
        this.el.sceneEl.addEventListener('loaded', this.instantiate.bind(this));}
  },
  tick: function () {
    if (!this.instantiated) { return }
    var geometry = this.el.getObject3D('mesh').geometry;
    var position = new THREE.Vector3().copy(this.el.getAttribute('position'));
    var xPoints = this.xPoints;
    var yPoints = this.yPoints;
    var particles = this.particles;
    
    for ( var x = 0; x !== xPoints+1; x++ ) {
        for ( var y = 0; y !== yPoints+1; y++ ) {
            var v = y*(xPoints+1) + x;
            geometry.vertices[v].copy(particles[x][y].position).sub(position);
        }
    }
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    geometry.normalsNeedUpdate = true;
    geometry.verticesNeedUpdate = true;
  },
  instantiate: function () {
    var world     = this.el.sceneEl.systems.physics.driver.world;
    var particles = this.particles = [];

    var clothPlane = this.clothPlane;
    var xPoints    = this.xPoints;
    var yPoints    = this.yPoints;
    var xD         = this.xD;
    var yD         = this.yD;

    var fabricMaterial = new CANNON.Material();
    var particleMaterial = new CANNON.Material();

    var position = new CANNON.Vec3().copy(this.el.getAttribute('position'));
    var material = new CANNON.ContactMaterial(fabricMaterial, particleMaterial, 0.0,  0.0);
    
    material.contactEquationStiffness = 1e9;
    material.contactEquationRelaxation = 3;
    
    world.addContactMaterial(material);

    // particles
    for (var x = 0; x < xPoints+1; x++) {
        particles.push([]);
        for (var y = 0; y < yPoints+1; y++) {
            var plane = clothPlane(x/(xPoints+1), y/(yPoints+1));
            var particle = new CANNON.Body({
              mass: y == yPoints && this.data.hanging ? 0 : this.mass
            });
            particle.addShape(new CANNON.Particle());
            
            particle.linearDamping = 0.5;

            particle.position.set(
                plane.x,
                plane.y-yPoints * 0.9 * yD,
                plane.z
            );

            particle.position.vadd(position, particle.position);
            particles[x].push(particle);
            world.addBody(particle);
            particle.velocity.set(0,0,-this.velocity*(yPoints - y));
            var el = this.el.appendChild(document.createElement('a-entity'));
            el.body = particle;
            particle.el = el;
            el.setAttribute('grabbable', 'usePhysics: only');
        }
    }

    for(var x=0; x<xPoints+1; x++){
        for(var y=0; y<yPoints+1; y++){
            if(x<xPoints)  {
                c = new CANNON.DistanceConstraint(particles[x][y],particles[x+1][y],xD);
                world.addConstraint(c);
            }
            if(y<yPoints) {
                c = new CANNON.DistanceConstraint(particles[x][y],particles[x][y+1],yD);
                world.addConstraint(c);
            }
        }
    }
    this.instantiated = true;
  }
});

function planeF(w, h) {
    return function(u, v) {
        var x = (u-0.5) * w;
        var y = (v+0.5) * h;
        var z = 0;
        return new THREE.Vector3(x, y, z);
    };
}