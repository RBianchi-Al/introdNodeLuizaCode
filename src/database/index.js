import Sequelize from 'sequelize';
import User from '../app/models/Users';
import Appointments from '../app/models/Appointments'
import databaseConfig from '../config/database';

const models = [User, Appointments]

class Database{
    constructor(){
        this.init();
    }
    init(){
        this.connection = new Sequelize(databaseConfig);
        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models))

    }
}

export default new Database();
