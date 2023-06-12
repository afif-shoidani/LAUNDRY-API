const verifySignUpController = require("../controllers/verifySignUp.js");
const verifySignController = require("../controllers/verifySign.js");
const transaksiController = require("../controllers").Transaksi;
const verifyJwtTokenController = require("../controllers/verifyJwtToken.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  //User Auth
  app.post("/api/auth/signup", [verifySignUpController.checkDuplicatePelangganNameOrEmail, verifySignUpController.checkRolesExisted], verifySignController.signup);

  app.post("/api/auth/signin", (req, res) => {
    verifySignController.signIn(req, res);
  });

  //Transaksi
  app.post("/api/transaksi", [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin], (req, res) => {
    transaksiController.add(req, res);
  });
  app.get("/api/transaksi", (req, res) => {
    transaksiController.list(req, res);
  });
  app.get("/api/transaksiuser", [verifyJwtTokenController.verifyToken], (req, res) => {
    transaksiController.listtransaksiUser(req, res);
  });
  app.get("/api/transaksi/:id", [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin], (req, res) => {
    transaksiController.getById(req, res);
  });

  app.put("/api/transaksi/:id", [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin], (req, res) => {
    transaksiController.update(req, res);
  });
  app.delete("/api/transaksi/:id", [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin], (req, res) => {
    transaksiController.delete(req, res);
  });
};
