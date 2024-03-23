module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    date: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    time: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  },{
    freezeTableName: true, // Prevent table name change to plural
    autoTimeStamp: true, // Add createdAt and updatedAt fields
  });
  return Event;
}