const dotenv = require('dotenv');
const app = require("./src/app.js")

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
});