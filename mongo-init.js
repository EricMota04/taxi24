db = db.getSiblingDB('taxi24');

db.createCollection('drivers');
db.createCollection('passengers');
db.createCollection('rides');

// Poblar conductores con ubicación en formato GeoJSON
db.drivers.insertMany([
  { name: "John Doe", location: { type: "Point", coordinates: [-69.9396, 18.4834] }, available: true },
  { name: "Jane Smith", location: { type: "Point", coordinates: [-69.9312, 18.4861] }, available: true },
  { name: "Carlos Santana", location: { type: "Point", coordinates: [-69.89, 18.47] }, available: false },
  { name: "Luis Gomez", location: { type: "Point", coordinates: [-69.91, 18.45] }, available: true },
  { name: "Ana Martinez", location: { type: "Point", coordinates: [-69.93, 18.49] }, available: false }
]);

// Poblar pasajeros con ubicación en formato GeoJSON
db.passengers.insertMany([
  { name: "Carlos Perez", location: { type: "Point", coordinates: [-69.8923, 18.4715] } },
  { name: "Maria Lopez", location: { type: "Point", coordinates: [-69.9403, 18.4684] } },
  { name: "Pedro Fernandez", location: { type: "Point", coordinates: [-69.9002, 18.4505] } },
  { name: "Laura Jimenez", location: { type: "Point", coordinates: [-69.9153, 18.4806] } },
  { name: "Jose Ramirez", location: { type: "Point", coordinates: [-69.9205, 18.4923] } }
]);

// Crear índices geoespaciales
db.drivers.createIndex({ location: "2dsphere" });
db.passengers.createIndex({ location: "2dsphere" });
