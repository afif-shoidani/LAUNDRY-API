const jwt = require("jsonwebtoken");
const config = require("../config/configRoles");
const Pelanggan = require("../models").Pelanggan;

module.exports = {
  verifyToken(req, res, next) {
    let tokenHeader = req.headers["x-access-token"];

    if (tokenHeader.split(" ")[0] !== "Bearer") {
      return res.status(500).send({
        auth: false,
        message: "Error",
        errors: "Incorrect token format",
      });
    }

    let token = tokenHeader.split(" ")[1];

    if (!token) {
      return res.status(403).send({
        auth: false,
        message: "Error",
        errors: "No token provided",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: "Error",
          errors: err,
        });
      }
      req.pelanggan_id = decoded.id;
      next();
    });
  },

  isAdmin(req, res, next) {
    Pelanggan.findByPk(req.pelanggan_id).then((pelanggan) => {
      Pelanggan.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          console.log(roles[i].name);
          if (roles[i].name.toUpperCase() === "ADMIN") {
            next();
            return;
          }
        }
        res.status(403).send({
          auth: false,
          message: "Error",
          message: "Require Admin Role",
        });
        return;
      });
    });
  },

  isPelangganOrAdmin(req, res, next) {
    Pelanggan.findByPk(req.pelanggan_id).then((pelanggan) => {
      Pelanggan.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name.toUpperCase() === "ADMIN") {
            next();
            return;
          }
        }
        res.status(403).send({
          auth: false,
          message: "Error",
          message: "Require Admin Role",
        });
        return;
      });
    });
  },
};
