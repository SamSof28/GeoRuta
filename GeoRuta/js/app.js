// Coordenadas del campus UdeM
const CAMPUS_COORD = [6.2311, -75.6115];

// Inicialización del mapa de Leaflet
const map = L.map('map', {
    center: CAMPUS_COORD,
    zoom: 16,
    zoomControl: false,
    attributionControl: false
  });

L.control.zoom({ position: 'topright' }).addTo(map);
L.control.scale({ position: 'bottomleft', metric: true, imperial: false }).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

// Mostrar latitud y longitud al hacer clic en el mapa
map.on("click", e => console.log(e.latlng));

// Puntos del campus con coordenadas [lat, lng]
const puntos = {
  "Coliseo - Bloque 1": [6.230708 , -75.610330],
  "Bienestar - Bloque 2": [6.230690 , -75.610671],
  "Centro de laboratorios - Bloque 3": [6.230239 , -75.611631],
  "Bloque de Ingenierias - Bloque 4": [6.230281 , -75.611974],
  "Bloque Ciencias Basicas - Bloque 5": [6.230601 , -75.612170],
  "Bloque  - Bloque 6": [6.230953 , -75.612145],
  "Bloque Negocios Internacioles y Contaduria Publica - Bloque 7": [6.231311 , -75.612105],
  "Cancha - Bloque 8": [6.231431 , -75.611662],
  "Junin": [6.230953 , -75.611960],
  "Centro de producción de television - Bloque 9": [6.231548 , -75.612454],
  "Bloque - Bloque 10": [6.232020 , -75.612508],
  "Bloque - Bloque 11": [6.231983 , -75.612065],
  "Bloque Posgrados - Bloque 12": [6.231927 , -75.611609],
  "Kiosco": [6.231690 , -75.611707],
  "Prometeo": [6.231493 , -75.611132],
  "Biblioteca - Bloque 14": [6.231940 , -75.610634],
  "Bloque de Derecho - Bloque 15": [6.232065 , -75.610240],
  "Bloque de Derecho - Bloque 16": [6.232436 , -75.610331],
  "Teatro - Bloque 17": [6.232804 , -75.610387],
  "Bloque Administrativo - Bloque 18": [6.232695 , -75.611168],
};

const nodos = {
  A: [6.230708 , -75.610330],  // Coliseo - Bloque 1
  B: [6.230690 , -75.610671],  // Bienestar - Bloque 2
  X1: [6.230773616363773, -75.61053872108461], // Intersección 1
  X2: [6.23080294637473, -75.6106460094452],  // Intersección 2
  C: [6.230239 , -75.611631],  // Centro de laboratorios - Bloque 3
  D: [6.230281 , -75.611974],  // Bloque de Ingenierías - Bloque 4
  E: [6.230601 , -75.612170],  // Ciencias Básicas - Bloque 5
  F: [6.230953 , -75.612145],  // Bloque 6
  G: [6.231311 , -75.612105],  // Bloque 7
  H: [6.231431 , -75.611662],  // Cancha
  I: [6.230953 , -75.611960],  // Junín
  J: [6.231548 , -75.612454],  // Bloque 9
  K: [6.232020 , -75.612508],  // Bloque 10
  L: [6.231983 , -75.612065],  // Bloque 11
  M: [6.231927 , -75.611609],  // Posgrados - Bloque 12
  N: [6.231690 , -75.611707],  // Kiosco
  O: [6.231493 , -75.611132],  // Prometeo
  P: [6.231940 , -75.610634],  // Biblioteca - Bloque 14
  Q: [6.232065 , -75.610240],  // Derecho - Bloque 15
  R: [6.232436 , -75.610331],  // Derecho - Bloque 16
  S: [6.232804 , -75.610387],  // Teatro - Bloque 17
  T: [6.232695 , -75.611168],  // Administrativo - Bloque 18
  X3: [6.23078161545783, -75.61054140329362],
  X4: [6.230440320669506, -75.61059504747392],
  X5: [6.230373661505254, -75.61063259840013],
  X6: [6.230536309851165, -75.61183154582979],
  X7: [6.23027767229385, -75.61188519001009],
  X8: [6.23024834225353, -75.61166793107988],
  Y1: [6.230805612739288, -75.6106460094452],
  Y2: [6.230786948187138, -75.61054408550264],
  Y3: [6.230456318867658, -75.61058968305589],
  Y4: [6.230376327871988, -75.61063259840013],
  Y5: [6.230536309851165, -75.61183691024782],
  Y6: [6.230272339559377, -75.61187982559204],
  Z1: [6.23078161545783, -75.61054140329362],
  Z2: [6.230442987035909, -75.61059772968294],
  Z3: [6.230376327871988, -75.61063528060915],
  Z4: [6.230528310753355, -75.61184227466585],
  Z5: [6.230283005028272, -75.6118878722191],
  W1: [6.230805612739288, -75.61064332723619],
  W2: [6.230786948187138, -75.61054408550264],
  W3: [6.230442987035909, -75.61060309410097],
  W4: [6.230370995138507, -75.6106299161911],
  W5: [6.2305336434852325, -75.61183959245683],
  W6: [6.23027500592662, -75.61187982559204],
  U1: [6.230301669598349, -75.61209976673128],
  U2: [6.23059230353235, -75.61205416917802],
  V1: [6.23027500592662, -75.61188250780107],
  V2: [6.2303070023325295, -75.61209708452226],
  V3: [6.230586970801057, -75.61205416917802],
  W7: [6.230309668699607, -75.61209708452226],
  W8: [6.23058963716671, -75.61205416917802],
  Q1: [6.23059230353235, -75.61205953359605],
  Q2: [6.230570972606888, -75.61205685138702],
  Q3: [6.230370995138507, -75.61063796281816],
  Q4: [6.230429655203792, -75.6105923652649],
  Q5: [6.23078428182249, -75.61053872108461],
  P1: [6.230598954156448, -75.61205811266895],
  P2: [6.230572290499821, -75.61206079487793],
  P3: [6.230369646665203, -75.61064190630908],
  P4: [6.230422973997693, -75.61058826212877],
  P5: [6.230785599714902, -75.61053998236652],
  P6: [6.23080426426709, -75.6106472707271],
};
  
  // 2. Aristas: para cada nodo, lista de [nodoVecino, distancia_meters]
const grafo = {
  // Corredor norte:
  Q: [["R", null], ["P", null]],       // 15 ↔ 16, ↔ Biblioteca
  R: [["Q", null], ["S", null]],       // 16 ↔ 17
  S: [["R", null]],                    // 17

  // Vertical norte → plaza:
  Q: [["O", null]],                    // 15 ↔ Prometeo
  P: [["O", null], ["N", null]],       // Biblioteca ↔ Prometeo ↔ Kiosco
 
  // Corredor central:
  O: [["P", null], ["N", null], ["M", null]],  // Prometeo ↔ Biblioteca·Kiosco·Posgrados
  N: [["O", null], ["M", null], ["L", null]],  // Kiosco ↔ Posgrados ↔ Bloque11
  M: [["N", null], ["L", null]],               // Posgrados ↔ Bloque11
  L: [["M", null], ["J", null]],               // Bloque11 ↔ Bloque9
  J: [["L", null], ["K", null]],               // Bloque9 ↔ Bloque10
  K: [["J", null]],                            // Bloque10
  
  // Corredor sur actualizado:
  A: [["X1", null], ["X3", null], ["Z1", null], ["Q5", null]],       // Coliseo → Intersección 1, Intersección 3, Z1, Q5
  X1: [["A", null], ["X2", null]], // Intersección 1 ↔ Coliseo, Intersección 2
  X2: [["X1", null], ["B", null]], // Intersección 2 ↔ Intersección 1, Bienestar
  B: [["X2", null], ["I", null], ["Y1", null], ["W1", null], ["P6", null]], // Bienestar ↔ Intersección 2, Junín, Y1, W1
  // Camino peatonal de A a C:
  X3: [["A", null], ["X4", null]],
  X4: [["X3", null], ["X5", null]],
  X5: [["X4", null], ["X6", null]],
  X6: [["X5", null], ["X7", null]],
  X7: [["X6", null], ["X8", null]],
  X8: [["X7", null], ["C", null]],
  C: [["X8", null], ["I", null], ["D", null], ["Y6", null], ["V1", null]], // Laboratorios ↔ X8, Junín, Bloque4, Y6, V1
  D: [["C", null], ["Z5", null], ["W6", null], ["U1", null], ["W7", null]], // Bloque4 ↔ Laboratorios, Z5, W6, U1, W7
  E: [["F", null], ["U2", null], ["V3", null], ["W8", null], ["Q1", null], ["P1", null]], // Bloque5 ↔ Bloque4, Bloque6, U2, C, V3, W8, Q1
  F: [["E", null], ["G", null]], // Bloque6 ↔ Bloque7
  G: [["F", null], ["H", null]], // Bloque7 ↔ Cancha
  H: [["G", null]],               // Cancha
  // Camino peatonal exclusivo de B a C:
  Y1: [["B", null], ["Y2", null]],
  Y2: [["Y1", null], ["Y3", null]],
  Y3: [["Y2", null], ["Y4", null]],
  Y4: [["Y3", null], ["Y5", null]],
  Y5: [["Y4", null], ["Y6", null]],
  Y6: [["Y5", null], ["C", null]],
  // Camino peatonal exclusivo de A a D:
  Z1: [["A", null], ["Z2", null]],
  Z2: [["Z1", null], ["Z3", null]],
  Z3: [["Z2", null], ["Z4", null]],
  Z4: [["Z3", null], ["Z5", null]],
  Z5: [["Z4", null], ["D", null]],
  // Camino peatonal exclusivo de B a D:
  W1: [["B", null], ["W2", null]],
  W2: [["W1", null], ["W3", null]],
  W3: [["W2", null], ["W4", null]],
  W4: [["W3", null], ["W5", null]],
  W5: [["W4", null], ["W6", null]],
  W6: [["W5", null], ["D", null]],
  // Camino peatonal exclusivo de D a E y de C a E:
  U1: [["D", null], ["U2", null]],
  U2: [["U1", null], ["E", null]],
  // Camino peatonal exclusivo de C a E:
  V1: [["C", null], ["V2", null]],
  V2: [["V1", null], ["V3", null]],
  V3: [["V2", null], ["E", null]],
  W7: [["D", null], ["W8", null]],
  W8: [["W7", null], ["E", null]],
  // Camino peatonal exclusivo de E a A:
  Q1: [["E", null], ["Q2", null]],
  Q2: [["Q1", null], ["Q3", null]],
  Q3: [["Q2", null], ["Q4", null]],
  Q4: [["Q3", null], ["Q5", null]],
  Q5: [["Q4", null], ["A", null]],
  // Camino peatonal exclusivo de E a B:
  P1: [["E", null], ["P2", null]],
  P2: [["P1", null], ["P3", null]],
  P3: [["P2", null], ["P4", null]],
  P4: [["P3", null], ["P5", null]],
  P5: [["P4", null], ["P6", null]],
  P6: [["P5", null], ["B", null]],
};
  
// 3. Calcular y rellenar distancias automáticamente
function inicializarGrafo() {
    for (const origen in grafo) {
      for (let i = 0; i < grafo[origen].length; i++) {
        const vecino = grafo[origen][i][0];
        const [lat1, lng1] = nodos[origen];
        const [lat2, lng2] = nodos[vecino];
        const dx = (lng2 - lng1) * 111320 * Math.cos(lat1 * Math.PI/180);
        const dy = (lat2 - lat1) * 110574;
        const d = Math.sqrt(dx*dx + dy*dy);
        grafo[origen][i][1] = d;
      }
    }
}
inicializarGrafo();

function dijkstra(grafo, start, goal) {
    const dist = {};           // distancias tentativas
    const prev = {};           // predecesores
    const Q = new Set(Object.keys(grafo)); // nodos por visitar
  
    // Inicialización
    for (const v of Q) {
      dist[v] = Infinity;
      prev[v] = null;
    }
    dist[start] = 0;
  
    while (Q.size) {
      // 1. Extraer nodo u con menor dist[u]
      let u = null;
      let minDist = Infinity;
      for (const v of Q) {
        if (dist[v] < minDist) { minDist = dist[v]; u = v; }
      }
      Q.delete(u);
      if (u === goal) break;
  
      // 2. Relajación de vecinos
      for (const [v, w] of grafo[u]) {
        if (!Q.has(v)) continue;
        const alt = dist[u] + w;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    }
  
    // 3. Reconstruir camino
    const path = [];
    let u = goal;
    if (prev[u] || u === start) {
      while (u) {
        path.unshift(u);
        u = prev[u];
      }
    }
    return path;  // e.g. ["A","B","C","D"]
  }

  const nameToKey = {
    "Coliseo - Bloque 1": "A",
    "Bienestar - Bloque 2": "B",
    "Centro de laboratorios - Bloque 3": "C",
    "Bloque de Ingenierias - Bloque 4": "D",
    "Bloque Ciencias Basicas - Bloque 5": "E",
    "Bloque  - Bloque 6": "F",
    "Bloque Negocios Internacioles y Contaduria Publica - Bloque 7": "G",
    "Cancha - Bloque 8": "H",
    "Junin": "I",
    "Centro de producción de television - Bloque 9": "J",
    "Bloque - Bloque 10": "K",
    "Bloque - Bloque 11": "L",
    "Bloque Posgrados - Bloque 12": "M",
    "Kiosco": "N",
    "Prometeo": "O",
    "Biblioteca - Bloque 14": "P",
    "Bloque de Derecho - Bloque 15": "Q",
    "Bloque de Derecho - Bloque 16": "R",
    "Teatro - Bloque 17": "S",
    "Bloque Administrativo - Bloque 18": "T"
  };
  

// Referencias a selects y botón
const origenSelect = document.getElementById('origen');
const destinoSelect = document.getElementById('destino');
const btnCalcular = document.getElementById('btnCalcular');

// Poblar dropdowns y agregar marcadores al mapa
for (const nombre in puntos) {
  const opt1 = document.createElement('option');
  opt1.value = nameToKey[nombre];
  opt1.textContent = nombre;
  origenSelect.appendChild(opt1);

  const opt2 = document.createElement('option');
  opt2.value = nameToKey[nombre];
  opt2.textContent = nombre;
  destinoSelect.appendChild(opt2);

  L.marker(puntos[nombre])
    .addTo(map)
    .bindPopup(nombre);
}

// Evento click para calcular y animar ruta
btnCalcular.addEventListener('click', calcularYAnimar);

function calcularYAnimar() {
  // Obtener selecciones
  const origen = origenSelect.value;
  const destino = destinoSelect.value;
  // 1) Lee las claves de nodo
  const startKey = origenSelect.value;
  const goalKey  = destinoSelect.value;

  // 2) Calcula la ruta de claves
  const pathKeys = dijkstra(grafo, startKey, goalKey);

  // 3) Tradúcelas a coordenadas
  const pathCoords = pathKeys.map(k => nodos[k]);

  // 4) Dibuja la polyline de todos los tramos
  if (window.ruta) map.removeLayer(window.ruta);
  window.ruta = L.polyline(pathCoords, { color:'green', weight:4 }).addTo(map);

  // 5) Anima a lo largo de toda la ruta
  animarMarcadorMultiple(pathCoords, 4000);

  // 6) Distancia total sumando el grafo
  let total = 0;
  pathKeys.slice(1).forEach((k,i) => {
    const prev = pathKeys[i];
    total += grafo[prev].find(([v]) => v===k)[1];
  });
  document.getElementById('distancia').textContent = `Distancia: ${total.toFixed(2)} m`;

}

/**
 * Anima un marcador de Leaflet entre dos puntos
 * @param {Array} start [lat, lng]
 * @param {Array} end [lat, lng]
 * @param {number} duration Duración en milisegundos
 */
function animarMarcador(start, end, duration) {
  if (window.markerAnimado) {
    map.removeLayer(window.markerAnimado);
  }

  window.markerAnimado = L.circleMarker(start, {
    radius: 6,
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.7
  }).addTo(map);

  const steps = 200;
  const delay = duration / steps;
  const latDiff = (end[0] - start[0]) / steps;
  const lngDiff = (end[1] - start[1]) / steps;
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep >= steps) {
      clearInterval(interval);
      return;
    }
    const lat = start[0] + latDiff * currentStep;
    const lng = start[1] + lngDiff * currentStep;
    window.markerAnimado.setLatLng([lat, lng]);
    currentStep++;
  }, delay);
}

function animarMarcadorMultiple(path, duration) {
  if (window.markerAnimado) map.removeLayer(window.markerAnimado);
  window.markerAnimado = L.circleMarker(path[0],{ radius:6, color:'red' }).addTo(map);

  // Calcula longitudes y tiempos proporcionales
  const segLens = [], totalLen = path.slice(1).reduce((s,_,i) => {
    const [lat1,lng1]=path[i], [lat2,lng2]=path[i+1];
    const dx=(lng2-lng1)*111320*Math.cos(lat1*Math.PI/180),
          dy=(lat2-lat1)*110574,
          d=Math.hypot(dx,dy);
    segLens.push(d);
    return s + d;
  }, 0);
  const segTimes = segLens.map(d=>duration*(d/totalLen));

  let idx=0;
  function next() {
    if (idx>=path.length-1) return;
    const [sLat,sLng]=path[idx], [eLat,eLng]=path[idx+1];
    const dur=segTimes[idx], steps=100, dt=dur/steps;
    const dLat=(eLat-sLat)/steps, dLng=(eLng-sLng)/steps;
    let st=0;
    const iv = setInterval(() => {
      if (st>=steps) { clearInterval(iv); idx++; next(); }
      else {
        window.markerAnimado.setLatLng([sLat+dLat*st, sLng+dLng*st]);
        st++;
      }
    }, dt);
  }
  next();
}

