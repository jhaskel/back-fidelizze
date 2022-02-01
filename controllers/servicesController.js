const Services = require('../models/services');
const msg1 = 'Houve um erro ao obter os serviços!';
const msg2 = 'Serviço adicionado com Sucesso!';
const msg3 = 'Houve um erro em cadastrar o serviço!';
const msg4 = 'O serviço foi atualizado com sucesso!';
const msg5 = 'Houve um erro em atualizar o serviço!';
const msg6 = 'Serviço deletado com sucesso!';
const msg7 = 'Houve um erro ao deletar o serviço!';

module.exports = {

    async getAll(req, res, next) {

        try {
            const data = await Services.getAll();
            console.log(`services ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: msg1,
                error: error,
                success: false
            })
        }

    },

    async findByStore(req, res, next) {
        try {
            const id_store = req.params.id_store; // CLIENTE
            const data = await Services.findByStore(id_store);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async create(req, res, next) {
        try {
            const services = req.body;
            console.log(`Loja enviada: ${services}`);

            const data = await Services.create(services);

            return res.status(201).json({
                message: msg2,
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: msg3,
                success: false,
                error: error
            });
        }
    },

    async update(req, res, next) {
        console.log(req.body);
        try {
            
            let sintoma = req.body;
            await Services.update(sintoma);            

            return res.status(201).json({
                success: true,
                message: msg4,
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: msg5,
                error: error
            });
        }
    },

    async delete(req, res, next) {
        console.log(req.body);
        try {
            
            let sintoma = req.body;
            await Services.delete(sintoma);            

            return res.status(201).json({
                success: true,
                message: msg6,
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: msg7,
                error: error
            });
        }
    },


    

}