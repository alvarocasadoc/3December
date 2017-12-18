d3.json('./data/aparcaments.json', function(error, data) {

    var maxPlazas = d3.max(data, function(d) { return d.properties.plazas; });
    var totPlazas = d3.sum(data, function(d) { return d.properties.plazas; });
    var longExt = d3.extent(data, function(d) { return d.geometry.coordinates[0]; });
    var latExt = d3.extent(data, function(d) { return d.geometry.coordinates[1]; });

    document.getElementById('plazas').innerHTML = totPlazas;

    var scale_long = d3.scale.linear()
        .domain(longExt)
        .range([-10, 10]);

    var scale_lat = d3.scale.linear()
        .domain(latExt)
        .range([-10, 10]);

    var y_scale = d3.scale.linear()
        .domain([0, maxPlazas])
        .range([0, 5]);

    data.forEach(function(d, i) {
      var scene = d3.select('a-scene');
      var color = d3.scale.linear().domain([0,maxPlazas])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#26324c"), d3.rgb('#00b3e3')]);
      var points = scene.selectAll('a-cylinder.point')
        .data(data)
        .enter()
        .append('a-cylinder')
          .classed('point', true)
          .attr('position', function(d, i) {
            var x = scale_long(d.geometry.coordinates[0]);
            var z = -scale_lat(d.geometry.coordinates[1]);
            var y = y_scale(d.properties.plazas)/2;

            return x + " " + y + " " + z;
          })
          .attr('height', function(d, i) {
            return y_scale(d.properties.plazas);
          })
          .attr('scale', '1 0.01 1')
          .attr('radius', 0.2)
          .attr('material', function(d) {
            return 'color: ' + color(d.properties.plazas);
          })
          .append('a-animation')
            .attr('attribute', 'scale')
            .attr('duration', 3000)
            .attr('delay', 1500)
            .attr('to', '1 1 1');  
});
});