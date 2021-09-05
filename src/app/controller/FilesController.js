import File from '../models/File';
import User from '../models/Users';

class FilesControllers{
    async store(req, res){
        const {originalname: name, filename: path} = req.file;

       const {id, url } = await File.create({
           name, 
           path
       }) 
       
      
        const sendImage = await User.findOne({
            where: {id: req.userId}
        })

        
        sendImage.update({
                photo_id: id
        })

        return res.json({
           sendImage
        })
    }
}


export default new FilesControllers();