const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");
const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931&limit=5";
router.get("/articles", (req, res) => {
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});
// Matches with "/api/books"
router.route("/")
    .post(articlesController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);

module.exports = router;
