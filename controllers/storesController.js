const Stores = require('../models/stores');

module.exports = {

    async getAll(req, res, next) {

        try {
            const data = await Stores.getAll();
            console.log(`Stores ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Houve um erro ao obter as loja',
                error: error,
                success: false
            })
        }

    },

    async create(req, res, next) {
        try {
            const sintomas = req.body;
            console.log(`Lojas enviado: ${Stores}`);

            const data = await Stores.create(sintomas);

            return res.status(201).json({
                message: 'Lojas adicionada com Sucesso',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Houve um erro em obter as lojas',
                success: false,
                error: error
            });
        }
    },

    async update(req, res, next) {
        console.log(req.body);
        try {
            
            let sintoma = req.body;
            await Stores.update(sintoma);            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async delete(req, res, next) {
        console.log(req.body);
        try {
            
            let sintoma = req.body;
            await Stores.delete(sintoma);            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },


    

}