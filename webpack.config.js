const path = require("path");
module.exports = {
  entry: [
    "./js/backend.js",
    "./js/util.js",
    "./js/debounce.js",
    "./js/cityPlan.js",
    "./js/validation.js",
    "./js/card.js",
    "./js/marker.js",
    "./js/filter.js",
    "./js/imageUpload.js",
    "./js/shift.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js"),
    iife: true
  },
  devtool: false
};
