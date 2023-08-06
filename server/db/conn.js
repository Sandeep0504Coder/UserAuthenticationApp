const mongoose = require("mongoose");
mongoose
  .connect(
    process.env.atlas_url
  )
  .then(() => {
    console.log("Database is connected Successfully.");
  })
  .catch((err) => {
    console.log(err)
  });

