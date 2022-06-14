require("dotenv").config();
const app = require("./app");
// Default port 3000
app.listen(process.env.SERVER_PORT || 3000, function () {
    console.log('Web App Hosted at http://localhost:%s',process.env.SERVER_PORT || 443);
});