const mongoose = require('mongoose')
const Room = require('../models/room')
const rooms = require('../data/rooms')


mongoose.connect("mongodb+srv://ankit:ankit1234@cluster0.yzemu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(cont => console.log("Database connect successfully")).catch(err => console.log(err))

const seedRooms = async () => {
    try {
        await Room.deleteMany();
        console.log("all rooms are deleted");
        await Room.insertMany(rooms)
        console.log('rooms are addes successfully');
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit()
    }

}

seedRooms()