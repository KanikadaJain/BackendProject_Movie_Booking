// module.exports = {
//     mongodb: {
//         url: 'mongodb://localhost:27017/moviesdb'
//     }
// };

const mongoose = require('mongoose');

// Define the MongoDB URL
const dbURL = 'mongodb://localhost:27017/moviesdb'; 

// Connect to the database
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to Database!'))
.catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;