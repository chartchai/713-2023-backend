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
      organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },{
      freezeTableName: true, // Prevent table name change to plural
      autoTimeStamp: true, // Add createdAt and updatedAt fields
    });
    const Organizer = sequelize.define('organizer', {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },{
      freezeTableName: true, // Prevent table name change to plural
      autoTimeStamp: true, // Add createdAt and updatedAt fields
    });
    Event.belongsTo(Organizer, { as: 'organizer' });
    Organizer.hasMany(Event, { as: 'events' });
    const Images = sequelize.define('images', {
      eventId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'event',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      url: {
        type: DataTypes.STRING
      }
    },{
      freezeTableName: true, // Prevent table name change to plural
      timestamps: false, // remove createdAt and updatedAt fields
    });
    Event.hasMany(Images, { as: 'images' });
    Images.belongsTo(Event);
    
    const User = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      organizerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'organizer',
          key: 'id'
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      
      }
    }, {
      autoTimeStamp: true
    })
    const Role = sequelize.define('role', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },{
      timestamps: false
    })
    const UserRole = sequelize.define('user-role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'role',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },{
      timestamps: false,
      freezeTableName: true
    })
    User.belongsTo(Organizer, { as: 'organizer' });
    Organizer.belongsTo(User, { as: 'user' });
    User.belongsToMany(Role, { through: UserRole });
    return { Event, Organizer, Images, User, Role };
  }