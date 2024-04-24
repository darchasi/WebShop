const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserModel = sequelize.define("User", {
  id: {
    type: Datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: Datatypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Za-z0-9\s]/,
        msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
      },
      notEmpty: {
        msg: "Le prénom de l'utilisateur ne peut pas être vide.",
      },
      notNull: {
        msg: "Le prénom de l'utilisateur est une propriété obligatoire ",
      },
      len: {
        args: [0, 35],
        msg: "Le nom de l'utilisateur doit contenir au maximum 35 caractères.",
      },
    },
  },
  lastName: {
    type: Datatypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Za-z0-9\s]/,
        msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
      },
      notEmpty: {
        msg: "Le nom de l'utilisateur ne peut pas être vide.",
      },
      notNull: {
        msg: "Le nom de l'utilisateur est une propriété obligatoire.",
      },
      len: {
        args: [0, 35],
        msg: "Le nom de l'utilisateur doit contenir au maximum 35 caractères.",
      },
    },
  },
  nickName: {
    type: Datatypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Za-z0-9\s]/,
        msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
      },
      notEmpty: {
        msg: "Le pseudo de l'utilisateur ne peut pas être vide.",
      },
      notNull: {
        msg: "Le pseudo de l'utilisateur est une propriété obligatoire.",
      },
      len: {
        args: [0, 35],
        msg: "Le pseudo de l'utilisateur doit contenir au maximum 35 caractères.",
      },
    },
  },
});

module.exports = UserModel;
