const Pelanggan = require("../models").Pelanggan;
const config = require("../config/configRoles.js");
const ROLEs = config.ROLEs;

module.exports = {
  checkDuplicatePelangganNameOrEmail(req, res, next) {
    Pelanggan.findOne({
      where: {
        name: req.body.name,
      },
    }).then((pelanggan) => {
      if (pelanggan) {
        res.status(400).send({
          auth: false,
          name: req.body.name,
          message: "Error",
          errors: "Id is already taken!",
        });
        return;
      }

      Pelanggan.findOne({
        where: {
          email: req.body.email,
        },
      }).then((pelanggan) => {
        if (pelanggan) {
          res.status(400).send({
            auth: false,
            name: req.body.name,
            message: "Error",
            errors: "Email is already taken!",
          });
          return;
        }

        next();
      });
    });
  },

  checkRolesExisted(req, res, next) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
        res.status(400).send({
          auth: false,
          name: req.body.name,
          message: "Error",
          errors: `Does NOT exist Role = ${req.body.roles[i]}`,
        });
        return;
      }
    }

    next();
  },
};
