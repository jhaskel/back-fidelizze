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
    async findById(req, res, next) {
        try {
            const id = req.params.id;
            const data = await Stores.findById(id);    
            console.log(`Usuario: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Erro ao buscar a loja por ID'
            });
        }
    },

    async create(req, res, next) {
        try {
            const stores = req.body;
            console.log(`Loja enviada: ${Stores}`);

            const data = await Stores.create(stores);

            return res.status(201).json({
                message: 'Lojas adicionada com Sucesso',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Houve um erro em cadastrar a loja',
                success: false,
                error: error
            });
        }
    },

    async update(req, res, next) {
        console.log(req.body);
        try {
            
            let stores = req.body;
            await Stores.update(stores);            

            return res.status(201).json({
                success: true,
                message: 'Lojas atualizada com Sucesso',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Erro ao atualizar a loja',
                error: error
            });
        }
    },
    async updateOpen(req, res, next) {
        console.log(` req ${req.body}`);
        try {
            
            let loja = req.body;
            await Stores.updateOpen(loja);            

            return res.status(201).json({
                success: true,
                message: 'A loja foi atualizada',
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
            
            let stores = req.body;
            await Stores.delete(stores);            

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