const mongoose = require('mongoose')

const dbConnect = () => {

    if (mongoose.connection.readyState >= 1) {
        return;
    }
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(cont => console.log("Database connect successfully")).catch(err => console.log(err))
}

module.exports = dbConnect