
const errorHandler = (err,req,res,next) =>{

    if(err){
      return res.status(err.status).send({error: err});
    }

}



module.exports = errorHandler;