//Script by donmccurdy taken from https://github.com/openleap/aframe-leap-hands
AFRAME.registerComponent('holdable', {
    schema: {activeColor: {default: 'orange'}},
    init: function () {
        this.physics =    /** @type {AFRAME.System}     */ this.el.sceneEl.systems.physics;
        this.constraint = /** @type {CANNON.Constraint} */ null;
        this.handID =     /** @type {number} */            null;
        this.el.addEventListener('leap-holdstart', this.onHoldStart.bind(this));
        this.el.addEventListener('leap-holdstop', this.onHoldStop.bind(this));
    },
    onHoldStart: function (e) {
        if (this.handID) return;
        this.originalColor = this.el.getAttribute('material').color;
        this.el.setAttribute('material', 'color', this.data.activeColor);
        this.constraint = new CANNON.LockConstraint(this.el.body, e.detail.body);
        this.physics.world.addConstraint(this.constraint);
        this.handID = e.detail.handID;
    },
    onHoldStop: function (e) {
        if (e.detail.handID !== this.handID) return;
        this.el.setAttribute('material', 'color', this.originalColor);
        this.physics.world.removeConstraint(this.constraint);
        this.constraint = null;
        this.handID = null;
    }});