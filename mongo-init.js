db = db.getSiblingDB('taxi24');

db.createCollection('drivers');
db.createCollection('passengers');
db.createCollection('rides');
db.createCollection('invoices');

const drivers = [
  { _id: ObjectId(), name: "John Doe", location: { type: "Point", coordinates: [-69.9396, 18.4834] }, available: true },
  { _id: ObjectId(), name: "Jane Smith", location: { type: "Point", coordinates: [-69.9312, 18.4861] }, available: true },
  { _id: ObjectId(), name: "Carlos Santana", location: { type: "Point", coordinates: [-69.89, 18.47] }, available: false },
  { _id: ObjectId(), name: "Luis Gomez", location: { type: "Point", coordinates: [-69.91, 18.45] }, available: true },
  { _id: ObjectId(), name: "Ana Martinez", location: { type: "Point", coordinates: [-69.93, 18.49] }, available: false }
];
db.drivers.insertMany(drivers);

const passengers = [
  { _id: ObjectId(), name: "Carlos Perez", location: { type: "Point", coordinates: [-69.8923, 18.4715] } },
  { _id: ObjectId(), name: "Maria Lopez", location: { type: "Point", coordinates: [-69.9403, 18.4684] } },
  { _id: ObjectId(), name: "Pedro Fernandez", location: { type: "Point", coordinates: [-69.9002, 18.4505] } },
  { _id: ObjectId(), name: "Laura Jimenez", location: { type: "Point", coordinates: [-69.9153, 18.4806] } },
  { _id: ObjectId(), name: "Jose Ramirez", location: { type: "Point", coordinates: [-69.9205, 18.4923] } }
];
db.passengers.insertMany(passengers);

const rides = [
  { _id: ObjectId(), driver: drivers[0]._id, passenger: passengers[0]._id, status: "completed" },
  { _id: ObjectId(), driver: drivers[1]._id, passenger: passengers[1]._id, status: "pending" },
  { _id: ObjectId(), driver: drivers[2]._id, passenger: passengers[2]._id, status: "canceled" },
  { _id: ObjectId(), driver: drivers[3]._id, passenger: passengers[3]._id, status: "in_progress" },
  { _id: ObjectId(), driver: drivers[4]._id, passenger: passengers[4]._id, status: "scheduled" }
];
db.rides.insertMany(rides);

db.invoices.insertMany([
  { _id: ObjectId(), ride: rides[0]._id, driver: rides[0].driver, passenger: rides[0].passenger, amount: 25.5, status: "paid" },
  { _id: ObjectId(), ride: rides[1]._id, driver: rides[1].driver, passenger: rides[1].passenger, amount: 32.0, status: "pending" }
]);

db.drivers.createIndex({ location: "2dsphere" });
db.passengers.createIndex({ location: "2dsphere" });
