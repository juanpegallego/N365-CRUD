const { Model, DataTypes } = require('sequelize');

const PERSON_TABLE = 'persons'

class Person extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tablename: PERSON_TABLE,
            modelName: 'Person',
            timestamps: true
        }
    }
}

const PersonSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'name'
    },
    adress: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'adress'
    },
    phone: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'phone'
    }

}

module.exports = { Person, PersonSchema }