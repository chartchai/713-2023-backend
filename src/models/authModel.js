
const model = require('../db/models/eventWithOrganizer');
const sequelize = require('../config/dbSequelize');
const { DataTypes, Op } = require('sequelize');
const bcrypt = require('bcryptjs')
require('dotenv').config();

const { Organizer: organizer, User: user, Role } = model(sequelize, DataTypes);
exports.findByUsername = (username) => {
    return user.findOne({
        where: {
            username: {
                [Op.eq]: username
            }
        },
        include: [{
            model: Role,
            as: 'roles',
            attributes: ['name'],
            through: {
                attributes: []
            }
        }, {
            model: organizer,
            as: 'organizer',
            attributes: ['name']
        }],

    })
        .then(user => user)
        .catch(error => console.error('Error getting user:', error));
}

exports.findById = (id) => {
    return user.findByPk(id, {
        include: [{
            model: Role,
            as: 'roles',
            attributes: ['name'],
            through: {
                attributes: []
            }
        }, {
            model: organizer,
            as: 'organizer',
            attributes: ['name']
        }],
    })
        .then(user => user)
        .catch(error => console.error('Error getting user:', error));
}

exports.registerUser = async (inputOrganizer) => {
    let savedOrganizer = await organizer.create(inputOrganizer);
    let savedUser = await user.create({
        username: inputOrganizer.username,
        password: await bcrypt.hash(inputOrganizer.password, 10),
        organizerId: savedOrganizer.id
    });
    saveRoles(savedUser, ['ROLE_USER'])
    return savedOrganizer
}
exports.registerAdmin = async (inputOrganizer) => {
    let savedOrganizer = await organizer.create(inputOrganizer);
    let savedUser = await user.create({
        username: inputOrganizer.username,
        password: await bcrypt.hash(inputOrganizer.password, 10),
        organizerId: savedOrganizer.id
    });
    saveRoles(savedUser, ['ROLE_ADMIN', 'ROLE_USER'])
    return savedOrganizer
}
async function saveRoles(user, roles) {
    let rowObject = await Role.findAll({
        where: {
            name: {
                [Op.in]: roles
            }
        }
    })
    for (let role of rowObject) {
        await user.addRole(role)
    }
}
exports.updatePassword = async (username, NewPassword) => {
    try {
        let rowCounts = await user.update({ password: await bcrypt.hash(NewPassword,10) }, {
            where: {
                username: {
                    [Op.eq]: username
                }
            }
        })
        if (rowCounts[0] = 0){
            throw new Error('Cannot update the password')
        } else{
            return await user.findOne({
                where: {
                    username: {
                        [Op.eq]: username
                    }
                },
                include: [{
                    model: Role,
                    as: 'roles',
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }, {
                    model: organizer,
                    as: 'organizer',
                    attributes: ['name']
                }],
        
            })
        }
       
    } catch (error) {
        console.error('Error updating user password:', error);
    }
}

