const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });

cloudinary.config({ 
  cloud_name: 'dwg99uhky', 
  api_key: '812459751198985', 
  api_secret: 'Z_JS3VcCTwQ1xJzNgUkaE2ka2Bw' 
});

module.exports = cloudinary;
