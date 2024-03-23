module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('participant', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'telNo'
        }
    }, {
        freezeTableName: true, // Prevent table name change to plural
        autoTimeStamp: true, // Add createdAt and updatedAt fields
    });

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
    }, {
        freezeTableName: true, // Prevent table name change to plural
        autoTimeStamp: true, // Add createdAt and updatedAt fields
    });
    const EventParticipant = sequelize.define('event-participant', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        eventId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        participantId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'participant',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    }, {
        freezeTableName: true, // Prevent table name change to plural
        autoTimeStamp: true, // Add createdAt and updatedAt fields
    });
    Participant.belongsToMany(Event, { through: EventParticipant });
    Event.belongsToMany(Participant, { through: EventParticipant });
    return { Participant, Event, EventParticipant };
}