
const db = require('../config/conf.js');

module.exports = {
    async findByStatus(req, res, next) {

        try {
            connection.connect(function (err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
                console.log('connected as id ' + connection.threadId);
            });
            
            connection.query('SELECT * FROM users', function(err, rows, fields){
                if(!err){
                    console.log('Resultado: ', rows);
                }else{
                    console.log('Erro ao realizar a consulta');
                }
            });
           
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },
   
    
    

}






