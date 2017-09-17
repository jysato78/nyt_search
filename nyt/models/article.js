const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  topic: { type: String, required: true },
  start_year: { type: String, required: true },
  end_year: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
