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

  //Intersecciones entre bloques
  X1: [6.230782 , -75.610538] //Interseccion entre Bloque 1 a Bloque 2
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
  
  // Corredor sur:
  C: [["I", null]],       // Laboratorios ↔ Junín
  I: [["C", null], ["B", null]], // Junín ↔ Bloque3·Bloque2
  B: [["I", null], ["A", null]], // Bloque2 ↔ Bloque1
  A: [["B", null]],       // Bloque1
  
  // Y ahora conecta sur → central:
  C: [["D", null]],       // Laboratorios ↔ Bloque4 (vertical de unión)
  D: [["C", null], ["E", null]], // Bloque4 ↔ Bloque3·Bloque5
  E: [["D", null], ["F", null]], // Bloque5 ↔ Bloque6
  F: [["E", null], ["G", null]], // Bloque6 ↔ Bloque7
  G: [["F", null], ["H", null]], // Bloque7 ↔ Cancha
  H: [["G", null]]               // Cancha
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

