import Sequelize, {Model} from 'sequelize'

export default class File extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            url: {
               type: Sequelize.VIRTUAL,
               get(){
                   return `http://localhost:3000/files/${this.path}`
               }
            },

        },{
            sequelize
        });
        return this;
    }
}