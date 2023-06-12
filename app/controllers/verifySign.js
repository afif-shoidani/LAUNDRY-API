const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const Pelanggan = require("../models").Pelanggan;
const Role = require("../models").Role;
const Op = db.Sequelize.Op;
const config = require("../config/configRoles.js");

module.exports = {
  signup(req, res) {
    return Pelanggan.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((pelanggan) => {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        })
          .then((roles) => {
            pelanggan.setRoles(roles).then(() => {
              res.status(200).send({
                auth: true,
                message: "pelanggan registered successfully!",
                errors: null,
              });
            });
          })
          .catch((err) => {
            res.status(500).send({
              auth: false,
              message: "Error",
              errors: err,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          name: req.body.name,
          message: "Error",
          errors: err,
        });
      });
  },

  signIn(req, res) {
    return Pelanggan.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((pelanggan) => {
        if (!pelanggan) {
          return res.status(404).send({
            auth: false,
            accessToken: null,
            message: "Error",
            errors: "Pelanggan Not Found.",
          });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, pelanggan.password);
        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            accessToken: null,
            message: "Error",
            errors: "Invalid Password!",
          });
        }
        const jwtToken = jwt.sign({ id: pelanggan.id }, config.secret, { expiresIn: 86400 });
        var token = `Bearer ${jwtToken}`;
        console.log(">> token is ", token);

        res.status(200).send({
          auth: true,
          accessToken: token,
          message: "success",
          errors: null,
        });
      })
      .catch((err) => {
        console.log(">> ERR", err);
        res.status(500).send({
          auth: false,
          accessToken: null,
          message: "Error",
          errors: err,
        });
      });
  },
};
