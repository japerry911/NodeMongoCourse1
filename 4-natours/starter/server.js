const app = require('./app');

// START SERVER
const port = 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));