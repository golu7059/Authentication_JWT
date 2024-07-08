require('dotenv').config();
const app = require("./app.js");

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`App is running on port number: ${PORT}`);
});
