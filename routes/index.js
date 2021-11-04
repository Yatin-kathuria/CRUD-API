const router = require("express").Router();

const authentication = require("../controllers/authentication");
const city = require("../controllers/city");
const user = require("../controllers/user");

const middleware = require("../middleware/index");

// Authenication
router.post("/register", authentication.register);
router.post("/login", authentication.login);
router.post("/verify", middleware.requireLogin, authentication.verify);
router.get("/token", middleware.requireLogin, authentication.token);

// User
router.post(
  "/users",
  middleware.requireLogin,
  middleware.requireAdmin,
  user.createUser
);
router.delete(
  "/users/:id",
  middleware.requireLogin,
  middleware.requireAdmin,
  user.deleteUser
);
router.get("/users/:id", middleware.requireLogin, user.singleUser);
router.get("/users", middleware.requireLogin, user.listUser);
router.put(
  "/users/:id",
  middleware.requireLogin,
  middleware.requireAdmin,
  user.updateUser
);

// City
router.post("/cities", middleware.requireLogin, city.createCity);
router.get("/cities/all", middleware.requireLogin, city.getCities);
router.get("/cities/:id", middleware.requireLogin, city.singleCity);
router.delete("/cities/:id", middleware.requireLogin, city.deleteCity);
router.put("/cities/:id", middleware.requireLogin, city.updateCity);
router.get("/cities", middleware.requireLogin, city.listCity);

module.exports = router;
