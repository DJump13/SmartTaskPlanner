const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 4000;

//connect to mongodb and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
