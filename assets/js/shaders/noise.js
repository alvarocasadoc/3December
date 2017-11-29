AFRAME.registerComponent('noise', {
      dependencies: [ ],
      schema: { },
      init () {
        this.el.addEventListener('draw-render', this.render.bind(this))
      },
      update () { },
      remove () { },
      pause () { },
      play () { },
      render (e) {
        var ctx = e.detail.ctx,
            texture = e.detail.texture,
            w = ctx.canvas.width,
            h = ctx.canvas.height,
            idata = ctx.createImageData(w, h),
            buffer32 = new Uint32Array(idata.data.buffer),
            len = buffer32.length,
            i = 0
        for(; i < len;)
            buffer32[i++] = ((255 * Math.random())|0) << 24
        ctx.putImageData(idata, 0, 0)
        // texture upate
        texture.needsUpdate = true
      }
    })