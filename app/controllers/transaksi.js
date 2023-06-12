const Transaksi = require("../models").Transaksi;

module.exports = {
  getById(req, res) {
    return Transaksi.findByPk(req.params.id, {
      include: [],
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            status_response: "Not Found",
            errors: "Transaksi Not Found",
          });
        }
        const Transaksi = {
          status_response: "OK",
          status: doc,
          errors: null,
        };
        return res.status(200).send(Transaksi);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  list(req, res) {
    return Transaksi.findAll({
      limit: 10,
      include: [],
      order: [["createdAt", "DESC"]],
    })
      .then((docs) => {
        const statuses = {
          status_response: "OK",
          count: docs.length,
          statuses: docs.map((doc) => {
            return doc;
          }),
          errors: null,
        };
        res.status(200).send(statuses);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  listTransaksiPelanggan(req, res) {
    return Transaksi.findAll({
      limit: 10,
      include: [],
      where: {
        pelanggan_id: req.pelanggan_id,
      },
      order: [["createdAt", "DESC"]],
    })
      .then((docs) => {
        const statuses = {
          status_response: "OK",
          count: docs.length,
          statuses: docs.map((doc) => {
            return doc;
          }),
          errors: null,
        };
        res.status(200).send(statuses);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  add(req, res) {
    return Transaksi.create({
      tanggal: req.body.tanggal,
      pelanggan_id: req.pelanggan_id,
      item_id: req.item_id,
    })
      .then((doc) => {
        const Transaksi = {
          status_response: "Created",
          status: doc,
          errors: null,
        };
        return res.status(201).send(Transaksi);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  update(req, res) {
    return Transaksi.findByPk(req.params.id, {})
      .then((Transaksi) => {
        if (!Transaksi) {
          return res.status(404).send({
            status_response: "Bad Request",
            errors: "Transaksi Not Found",
          });
        }

        if (Transaksi.pelanggan_id !== req.pelanggan_id) {
          return res.status(403).send({
            status_response: "Bad Request",
            errors: "Different Pelanggan Id",
          });
        }

        return Transaksi.update({
          tanggal: req.body.tanggal || Transaksi.tanggal,
          pelanggan_id: req.pelanggan_id,
          item_id: req.item_id,
        })
          .then((doc) => {
            const Transaksi = {
              status_response: "OK",
              status: doc,
              errors: null,
            };
            return res.status(200).send(Transaksi);
          })
          .catch((error) => {
            res.status(400).send({
              status_response: "Bad Request",
              errors: error,
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  delete(req, res) {
    return Transaksi.findByPk(req.params.id)
      .then((Transaksi) => {
        if (!Transaksi) {
          return res.status(400).send({
            status_response: "Bad Request",
            errors: "Transaksi Not Found",
          });
        }

        if (Transaksi.pelanggan_id !== req.pelanggan_id) {
          return res.status(403).send({
            status_response: "Bad Request",
            errors: "Different Pelanggan Id",
          });
        }

        return Transaksi.destroy()
          .then(() =>
            res.status(204).send({
              status_response: "No Content",
              errors: null,
            })
          )
          .catch((error) => {
            res.status(400).send({
              status_response: "Bad Request",
              errors: error,
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },
};
