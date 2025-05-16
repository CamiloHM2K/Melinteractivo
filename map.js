// Centro de Melipeuco
const melipeucoCenter = { lat: -38.853464, lon: -71.694892 };

// Inicializar mapa
const map = L.map('map').setView([melipeucoCenter.lat, melipeucoCenter.lon], 11);

// Ajustar el zoom del mapa según el tamaño de la pantalla
function adjustMapZoom() {
    if (window.innerWidth <= 768) {
        map.setZoom(10); // Zoom más alejado para móviles
    } else {
        map.setZoom(11); // Zoom normal para escritorio
    }
}

// Ajustar zoom inicial
adjustMapZoom();

// Volver a ajustar cuando cambie el tamaño de la ventana
window.addEventListener('resize', function() {
    adjustMapZoom();
    // Invalidar el tamaño del mapa para forzar su redibujado
    map.invalidateSize();
});

// Añadir capa de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Mapa Turístico Melipeuco',
    maxZoom: 18
}).addTo(map);

// Añadir el control de capas al mapa
const baseMaps = {
    "Mapa": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Mapa Turístico Melipeuco',
        maxZoom: 18
    }),
    "Satélite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18
    })
};

L.control.layers(baseMaps).addTo(map);

// Marcar el centro de Melipeuco
L.marker([melipeucoCenter.lat, melipeucoCenter.lon])
    .addTo(map)
    .bindPopup("<strong>Centro de Melipeuco</strong><br>Punto de referencia para cálculo de rutas")
    .openPopup();

// Definir las atracciones turísticas
const attractions = [
    { number: 1, name: "Salto Truful Truful", lat: -38.827077, lon: -71.650446, category: "waterfall", description: "Hermosa cascada ubicada en el Parque Nacional Conguillío. Su nombre en mapudungún significa 'de salto en salto'." },
    { number: 2, name: "Mirador de Lava 1751", lat: -38.83794235720895, lon: -71.64999264359584, category: "viewpoint", description: "Mirador que permite observar las huellas de la erupción volcánica ocurrida en 1751." },
    { number: 3, name: "Salto Chico y Cañadón del Truful Truful", lat: -38.82680460297484, lon: -71.65039367775377, category: "waterfall", description: "Conjunto de saltos de agua y paisaje escénico en el cauce del río Truful Truful." },
    { number: 4, name: "Sendero Ensenada", lat: -38.6849213016515, lon: -71.62192296261966, category: "trail", description: "Ruta de senderismo que recorre bosques nativos con vistas al volcán Llaima." },
    { number: 5, name: "Laguna Arcoiris", lat: -38.67190536062033, lon: -71.62185220285419, category: "lake", description: "Laguna de origen volcánico con aguas de colores variables según la temporada." },
    { number: 6, name: "Laguna Verde / Esmeralda", lat: -38.69727509018992, lon: -71.62014908895712, category: "lake", description: "Hermosa laguna de aguas color verde esmeralda rodeada de bosque nativo y vistas al volcán Llaima." },
    { number: 7, name: "Laguna Conguillío", lat: -38.63410640003126, lon: -71.6406357074142, category: "lake", description: "Impresionante laguna ubicada en el corazón del Parque Nacional Conguillío, con aguas cristalinas y vistas panorámicas a los volcanes de la zona." },
    { number: 8, name: "Playa Linda / Acceso Sierra Nevada", lat: -38.64804561388748, lon: -71.61692037091343, category: "trail", description: "Punto de acceso al popular sendero Sierra Nevada, con hermosa playa junto al lago." },
    { number: 9, name: "Sendero Pastos Blancos", lat: -38.64075390612727, lon: -71.70099355704018, category: "trail", description: "Ruta de senderismo que atraviesa praderas y bosques de araucarias." },
    { number: 10, name: "Araucaria Madre", lat: -38.642736638294956, lon: -71.67217310992126, category: "other", description: "Ejemplar centenario de araucaria, símbolo de la resistencia y cultura mapuche." },
    { number: 11, name: "Cascada Escondida", lat: -38.63073391558447, lon: -71.66705213792181, category: "waterfall", description: "Bella caída de agua rodeada de vegetación nativa." },
    { number: 12, name: "Islas de Vegetación", lat: -38.735911374112426, lon: -71.62678060541215, category: "other", description: "Formaciones vegetales aisladas en medio de campos de lava solidificada, creando un paisaje único." },
    { number: 13, name: "Lavas Cordadas", lat: -38.748051499956425, lon: -71.6985284591045, category: "other", description: "Formaciones geológicas producto de flujos de lava que se solidificaron creando patrones ondulados." },
    { number: 14, name: "Sendero Huella del Puma", lat: -38.740854497174674, lon: -71.51441466050466, category: "trail", description: "Ruta de trekking que recorre el hábitat del puma, con posibilidad de observar fauna nativa." },
    { number: 15, name: "Cerro Cabeza de Indio", lat: -38.756829615905225, lon: -71.47166600166251, category: "viewpoint", description: "Formación rocosa con forma de perfil humano, punto panorámico con vistas a los valles circundantes." },
    { number: 16, name: "Truful Foye - Salto El Canelo", lat: -38.831435399573216, lon: -71.76008759788441, category: "waterfall", description: "Cascada rodeada de canelos, árbol sagrado para la cultura mapuche." },
    { number: 17, name: "Termas Naturales de Alpehue", lat: -38.98815529152736, lon: -71.60024644111435, category: "hotspring", description: "Pozas termales naturales con propiedades medicinales, ideales para relajarse." },
    { number: 18, name: "Mirador Legnay", lat: -38.86450622143945, lon: -71.58205355282008, category: "viewpoint", description: "Punto panorámico con vistas al valle y cordillera circundante." },
    { number: 19, name: "Parque Ecológico El Baleneario", lat: -38.85230282179773, lon: -71.7033323786248, category: "park", description: "Área recreativa con senderos, zonas de picnic y acceso al río para baño en verano." },
    { number: 20, name: "Sendero y Saltos Doña Laura", lat: -38.89420223644979, lon: -71.52308642011617, category: "waterfall", description: "Conjunto de cascadas accesibles a través de un sendero de baja dificultad." },
    { number: 21, name: "Reserva saltos de Quillen", lat: -38.88202284895828, lon: -71.50599812574794, category: "park", description: "Área protegida con cascadas y bosque nativo preservado." },
    { number: 22, name: "Salto Chufquén Palomo / San Sebastián", lat: -38.83809183024753, lon: -71.55585874887407, category: "waterfall", description: "Impresionante caída de agua en medio de un cañón rocoso." },
    { number: 23, name: "Mirador Solipulli", lat: -38.94772498047333, lon: -71.49627279229394, category: "viewpoint", description: "Punto panorámico con vistas al volcán Sollipulli y su cráter glaciar." },
    { number: 24, name: "Mirador Salto Carilafquén (El velo de la novia)", lat: -38.917890431397666, lon: -71.49096813246419, category: "viewpoint", description: "Mirador que permite observar una cascada que semeja un velo nupcial." },
    { number: 25, name: "Nevados de Sollipulli Parque Natural", lat: -38.921991723384785, lon: -71.4847360713165, category: "park", description: "Parque con glaciares y paisajes de alta montaña, ideal para trekking avanzado." },
    { number: 26, name: "Sendero Casablanca", lat: -38.94943268755017, lon: -71.59300180519594, category: "trail", description: "Ruta de senderismo en medio de bosques nativos y arroyos de montaña." }
];

// Crear marcadores personalizados por categoría
function createCustomMarker(category) {
    // Definir icono según la categoría
    let iconClass = '';
    switch(category) {
        case 'waterfall':
            iconClass = 'fas fa-water';
            break;
        case 'lake':
            iconClass = 'fas fa-water';
            break;
        case 'trail':
            iconClass = 'fas fa-hiking';
            break;
        case 'viewpoint':
            iconClass = 'fas fa-mountain';
            break;
        case 'park':
            iconClass = 'fas fa-tree';
            break;
        case 'hotspring':
            iconClass = 'fas fa-hot-tub';
            break;
        case 'volcano':
            iconClass = 'fas fa-fire';
            break;
        default:
            iconClass = 'fas fa-map-marker-alt';
            break;
    }

    return L.divIcon({
        className: `custom-div-icon`,
        html: `<div class="custom-marker marker-${category}"><i class="${iconClass}"></i></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

// Crear capas de grupos por categoría
const layers = {
    all: L.layerGroup(),
    waterfall: L.layerGroup(),
    trail: L.layerGroup(),
    viewpoint: L.layerGroup(),
    park: L.layerGroup(),
    lake: L.layerGroup(),
    hotspring: L.layerGroup(),
    other: L.layerGroup()
};

// Añadir marcadores al mapa
attractions.forEach(attraction => {
    const marker = L.marker([attraction.lat, attraction.lon], {
        icon: createCustomMarker(attraction.category),
        title: attraction.name
    });

    // Crear enlace a Google Maps
    const googleMapsUrl = `https://www.google.com/maps/dir/${melipeucoCenter.lat},${melipeucoCenter.lon}/${attraction.lat},${attraction.lon}`;

    // Contenido del popup
    const popupContent = `
        <div class="attraction-title">${attraction.number}. ${attraction.name}</div>
        <div class="attraction-info">${attraction.description}</div>
        <a href="${googleMapsUrl}" target="_blank" class="btn-google-maps">
            <i class="fas fa-map-marked-alt mr-1"></i> Ver en Google Maps
        </a>
    `;

    marker.bindPopup(popupContent);

    // Añadir evento para mostrar información detallada debajo del mapa
    marker.on('click', function() {
        // En dispositivos móviles, hacer scroll hasta la información
        if (window.innerWidth <= 768) {
            setTimeout(function() {
                document.querySelector('.info-section').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }

        // Calcular distancia desde el centro de Melipeuco (en km)
        const distance = calculateDistance(
            melipeucoCenter.lat, melipeucoCenter.lon,
            attraction.lat, attraction.lon
        ).toFixed(1);

        // Determinar tipo de terreno basado en la categoría
        let terrainInfo = '';
        let difficultyLevel = '';
        let bestSeason = '';
        let estimatedTime = '';

        switch(attraction.category) {
            case 'waterfall':
                terrainInfo = 'Terreno generalmente húmedo y rocoso. Se recomienda calzado impermeable con buen agarre.';
                difficultyLevel = 'Baja a media, dependiendo del acceso.';
                bestSeason = 'Primavera y otoño para mayor caudal de agua.';
                estimatedTime = '1-2 horas para visita completa.';
                break;
            case 'trail':
                terrainInfo = 'Sendero de montaña con tramos de tierra y roca. Puede incluir desniveles importantes.';
                difficultyLevel = 'Media a alta, dependiendo de la extensión y desnivel.';
                bestSeason = 'Primavera y verano, cuando los senderos están secos y despejados.';
                estimatedTime = '3-5 horas para recorrido completo.';
                break;
            case 'viewpoint':
                terrainInfo = 'Generalmente accesible por sendero corto. Puede incluir plataformas o miradores construidos.';
                difficultyLevel = 'Baja a media, dependiendo de la ubicación.';
                bestSeason = 'Días despejados en cualquier época del año para mejor visibilidad.';
                estimatedTime = '30 minutos a 1 hora para disfrutar de las vistas.';
                break;
            case 'park':
                terrainInfo = 'Variado, desde senderos bien mantenidos hasta zonas más silvestres.';
                difficultyLevel = 'Variable según la zona que se visite.';
                bestSeason = 'Primavera y verano para mayor biodiversidad visible.';
                estimatedTime = 'Medio día a día completo para explorar las principales atracciones.';
                break;
            case 'hotspring':
                terrainInfo = 'Acceso generalmente acondicionado. Zonas húmedas y resbaladizas cerca de las pozas.';
                difficultyLevel = 'Baja, instalaciones preparadas para visitantes.';
                bestSeason = 'Otoño e invierno para mayor contraste térmico.';
                estimatedTime = '2-3 horas para disfrutar de las aguas termales.';
                break;
            default:
                terrainInfo = 'Terreno variado, consultar condiciones específicas antes de visitar.';
                difficultyLevel = 'Variable según las condiciones.';
                bestSeason = 'Consultar localmente para mejor experiencia.';
                estimatedTime = 'Variable según la actividad.';
        }

        // Actualizar el div de información con datos más detallados
        document.getElementById('attraction-details').innerHTML = `
            <div class="text-left">
                <h3 class="text-lg font-bold mb-2 text-center">${attraction.number}. ${attraction.name}</h3>

                <div class="mb-4">
                    <h4 class="font-semibold mb-1">Descripción:</h4>
                    <p>${attraction.description}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <h4 class="font-semibold mb-1">Ubicación:</h4>
                        <p>Coordenadas: ${attraction.lat.toFixed(5)}, ${attraction.lon.toFixed(5)}</p>
                        <p>Distancia desde Melipeuco: ${distance} km</p>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-1">Categoría:</h4>
                        <p>${getCategoryName(attraction.category)}</p>
                    </div>
                </div>

                <div class="mb-4">
                    <h4 class="font-semibold mb-1">Información del terreno:</h4>
                    <p>${terrainInfo}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <h4 class="font-semibold mb-1">Dificultad:</h4>
                        <p>${difficultyLevel}</p>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-1">Mejor temporada:</h4>
                        <p>${bestSeason}</p>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-1">Tiempo estimado:</h4>
                        <p>${estimatedTime}</p>
                    </div>
                </div>

                <div class="text-center mt-4">
                    <a href="${googleMapsUrl}" target="_blank" class="btn-google-maps inline-block">
                        <i class="fas fa-map-marked-alt mr-1"></i> Ver ruta en Google Maps
                    </a>
                </div>
            </div>
        `;
    });

    // Añadir marcador a todas las capas correspondientes
    marker.addTo(layers.all);
    marker.addTo(layers[attraction.category]);
});

// Añadir la capa de todos los marcadores al mapa por defecto
layers.all.addTo(map);

// Generar la lista de atracciones por categoría
function generateAttractionsList() {
    // Definir el orden de las categorías según aparecen en el filtro
    const categoryOrder = ['waterfall', 'lake', 'trail', 'viewpoint', 'park', 'hotspring', 'other'];

    // Ordenar atracciones primero por el orden definido de categorías y luego por nombre
    const sortedAttractions = [...attractions].sort((a, b) => {
        if (a.category !== b.category) {
            return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
        }
        return a.name.localeCompare(b.name);
    });

    let currentCategory = '';
    let html = '';

    sortedAttractions.forEach(attraction => {
        // Si cambiamos de categoría, añadir un encabezado
        if (attraction.category !== currentCategory) {
            currentCategory = attraction.category;
            let categoryIcon = '';
            let categoryColor = '';
            let categoryName = getCategoryName(currentCategory);

            switch(currentCategory) {
                case 'waterfall':
                    categoryIcon = 'fa-water';
                    categoryColor = 'text-blue-600';
                    break;
                case 'lake':
                    categoryIcon = 'fa-water';
                    categoryColor = 'text-cyan-600';
                    break;
                case 'trail':
                    categoryIcon = 'fa-hiking';
                    categoryColor = 'text-green-600';
                    break;
                case 'viewpoint':
                    categoryIcon = 'fa-mountain';
                    categoryColor = 'text-yellow-600';
                    break;
                case 'park':
                    categoryIcon = 'fa-tree';
                    categoryColor = 'text-green-700';
                    break;
                case 'hotspring':
                    categoryIcon = 'fa-hot-tub';
                    categoryColor = 'text-orange-500';
                    break;
                case 'volcano':
                    categoryIcon = 'fa-fire';
                    categoryColor = 'text-red-600';
                    break;
                default:
                    categoryIcon = 'fa-map-marker-alt';
                    categoryColor = 'text-purple-600';
            }

            html += `
                <div class="mt-2 mb-1">
                    <p class="font-semibold ${categoryColor}">
                        <i class="fas ${categoryIcon} mr-1"></i> ${categoryName}
                    </p>
                </div>
            `;
        }

        // Añadir el elemento de la atracción
        html += `
            <div class="pl-5 mb-1">
                <a href="#" class="text-sm hover:text-blue-600 attraction-link"
                   data-lat="${attraction.lat}" data-lon="${attraction.lon}" data-id="${attraction.number}">
                    ${attraction.number}. ${attraction.name}
                </a>
            </div>
        `;
    });

    document.getElementById('attractions-list').innerHTML = html;

    // Añadir event listeners a los enlaces
    document.querySelectorAll('.attraction-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lon = parseFloat(this.getAttribute('data-lon'));
            const id = parseInt(this.getAttribute('data-id'));

            // Centrar el mapa en la ubicación
            map.setView([lat, lon], 14);

            // Buscar el marcador correspondiente y activar su clic
            const attractionObj = attractions.find(a => a.number === id);
            if (attractionObj) {
                // En dispositivos móviles, hacer scroll hasta la información
                if (window.innerWidth <= 768) {
                    setTimeout(function() {
                        document.querySelector('.info-section').scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
                // Buscar el marcador en la capa correspondiente
                layers[attractionObj.category].eachLayer(layer => {
                    if (layer.getLatLng().lat === lat && layer.getLatLng().lng === lon) {
                        layer.fire('click');
                    }
                });

                // Si no está en la capa visible, cambiar a la capa correcta
                if (!map.hasLayer(layers[attractionObj.category]) && !map.hasLayer(layers.all)) {
                    // Encontrar y hacer clic en el botón de categoría correspondiente
                    document.querySelector(`.category-btn[data-category="${attractionObj.category}"]`).click();
                }
            }
        });
    });
}

// Generar la lista inicial
generateAttractionsList();

// Función para calcular la distancia entre dos puntos (fórmula haversine)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distancia en km
}

// Función para obtener el nombre completo de la categoría
function getCategoryName(category) {
    switch(category) {
        case 'waterfall':
            return 'Cascadas y saltos';
        case 'lake':
            return 'Lagos y lagunas';
        case 'trail':
            return 'Senderos y rutas';
        case 'viewpoint':
            return 'Miradores';
        case 'park':
            return 'Parques y reservas';
        case 'hotspring':
            return 'Termas';
        case 'volcano':
            return 'Volcanes';
        case 'other':
            return 'Otros atractivos';
        default:
            return 'No especificada';
    }
}

// Función para cambiar entre categorías
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');

        // Remover la clase activa de todos los botones
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Añadir clase activa al botón seleccionado
        this.classList.add('active');

        // Remover todas las capas
        Object.values(layers).forEach(layer => {
            map.removeLayer(layer);
        });

        // Añadir la capa seleccionada
        map.addLayer(layers[category]);
    });
});
