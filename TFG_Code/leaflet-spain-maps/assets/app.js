var map = L.map('map', maxZoom = 12).setView([40.4558288, -3.6561813], 11);
var datos = {};
var  info = L.control();
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
$.getJSON("data/datos.json", function(data){
	data.forEach(function(district, index) {
		var name = district.nombre
		var content=data[index]
		datos[name]=content
		
		});
});

$.getJSON("assets/madrid-districts.geojson", function (data) {
   L.geoJson(data, {
        onEachFeature: onEachDistrict
    }).addTo(map);
});


function getColor(percentage, ine) {
    var palette = d3.scaleLinear()
        .domain([0.0, 0.2])
        .range(["#FFFFFF", "#FFFF00"]);
    return palette(percentage);
}

function onEachDistrict(feature, layer) {

	 var name = feature.properties.name;
	 
	  layer.setStyle({
            weight: 0.4,
            opacity: 1,
            color: getColor(datos[name].porcentaje_jazztel),
            fillColor: getColor(datos[name].porcentaje_jazztel),
            fillOpacity: 1
        });

	   layer.on("mouseover", function (event) {
            event.target.bringToFront();
            
            
            layer.setStyle({
                weight: 3,
                opacity: 1,
                fillColor: getColor((datos[name].porcentaje_jazztel), name),
                color: "#000"
            });
            info.update(event.target.feature.properties, datos[name].porcentaje_jazztel);
        });
        layer.on("mouseout", function (event) {
            event.target.bringToBack();
            var eIne = event.target.feature.properties.attributes.CPRO;
            eIne = ("0" + eIne).slice(-2);
            layer.setStyle({
                weight: 0.4,
                opacity: 1,
                color: getColor((isOneSelected) ? (dataset[eIne].percentage_acc) : (dataset[eIne].increment), eIne),
                fillColor: getColor((isOneSelected) ? (dataset[eIne].percentage_acc) : (dataset[eIne].increment), eIne),
                fillOpacity: 0.6
            });
            info.update();
        });

}



info.update = function (properties, kpi) {
	console.log(properties);
    this._div.innerHTML = (properties.name);
};
info.addTo(map);



