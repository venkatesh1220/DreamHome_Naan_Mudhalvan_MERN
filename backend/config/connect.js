const mongoose = require('mongoose');

// const connectionOfDb = () => {
//   mongoose
//     .connect(process.env.MONGO_DB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log('Connected to MongoDB');
//     })
//     .catch((err) => {
//       throw new Error(`Could not connect to MongoDB: ${err}`);
//     });
// };

const connectionOfDb = () => {
  mongoose
    .connect("mongodb+srv://admin:mydb1234@rentaldb.q0sta.mongodb.net/?retryWrites=true&w=majority&appName=rentalDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      throw new Error("Could not connect to MongoDB: " + err );
    });
};


module.exports = connectionOfDb;