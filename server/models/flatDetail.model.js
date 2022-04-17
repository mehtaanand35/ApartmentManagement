const mongoose = require("mongoose");

const Detail = new mongoose.Schema(
  {
    name: { type: String, required: true },
    Type: { type: String, required: true },
    Block: { type: String, required: true },
    FlatNo: [{ type: Number, required: true }],
  },
  {
    timeseries: true,
    versionKey: false,
  }
);

const flatDetail = mongoose.model("flatDetail", Detail);

module.exports = flatDetail;
