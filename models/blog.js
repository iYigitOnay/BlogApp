const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Blog = sequelize.define("blog", {
  blodId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowMull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  desciraption: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  blogimage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mainpage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

async function sync() {
  await Blog.sync({ force: true });
  console.log("The table for the Blog model was just (re)created!");
}

sync();
module.exports = Blog;
