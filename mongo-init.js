db = db.getSiblingDB('taxi24');

db.createCollection('drivers');
db.createCollection('passengers');
db.createCollection('rides');

db.drivers.insertMany([
  { name: "John Doe", location: { lat: 18.4834, lng: -69.9396 }, available: true },
  { name: "Jane Smith", location: { lat: 18.4861, lng: -69.9312 }, available: true },
  { name: "Carlos Santana", location: { lat: 18.4700, lng: -69.8900 }, available: false },
  { name: "Luis Gomez", location: { lat: 18.4500, lng: -69.9100 }, available: true },
  { name: "Ana Martinez", location: { lat: 18.4900, lng: -69.9300 }, available: false }
]);

db.passengers.insertMany([
  { name: "Carlos Perez", location: { lat: 18.4715, lng: -69.8923 } },
  { name: "Maria Lopez", location: { lat: 18.4684, lng: -69.9403 } },
  { name: "Pedro Fernandez", location: { lat: 18.4505, lng: -69.9002 } },
  { name: "Laura Jimenez", location: { lat: 18.4806, lng: -69.9153 } },
  { name: "Jose Ramirez", location: { lat: 18.4923, lng: -69.9205 } }
]);

db.rides.insertMany([
  { driver_id: ObjectId(), passenger_id: ObjectId(), status: "completed" },
  { driver_id: ObjectId(), passenger_id: ObjectId(), status: "pending" },
  { driver_id: ObjectId(), passenger_id: ObjectId(), status: "canceled" },
  { driver_id: ObjectId(), passenger_id: ObjectId(), status: "in_progress" },
  { driver_id: ObjectId(), passenger_id: ObjectId(), status: "scheduled" }
]);
