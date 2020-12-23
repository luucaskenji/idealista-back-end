require('dotenv').config();
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
