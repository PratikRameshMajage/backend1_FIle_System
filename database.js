// REQUIRE MONGOOSE
const mongoose = require('mongoose');
// HANDLE CONNECCTION PROMISE ERROE
main()
    .then(() => {
    console.log("connection sussesfully..");
    })
    .catch(err => console.log(err));
// CONNECTION WITH MONGODB DATABASE
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
};
// DEFINE A SCHEMA
const Bikeschema = new mongoose.Schema({
  name: String,
});
// CREATE A MODEL
const Bike = mongoose.model('Bike', Bikeschema);
// SAVE INFORMATION IN SCHEMA 
const Bikes = new Bike({ name: 'HONDA SHINE SP 125' });
// SAVE DATA IN IN MONGODB
Bikes.save().then(() => console.log('DONE'));
