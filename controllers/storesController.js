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
        try {
           
            const store = JSON.parse(req.body.store);
            console.log(`Datos enviados del usuario: ${JSON.stringify(store)}`);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    store.logo = url;
                }
            }

            await Stores.update(store);

            return res.status(201).json({
                success: true,
                message: 'Los datos del usuario se actualizaron correctamente'
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualizacion de datos del usuario',
                error: error
            });
        }
    },
    async updateOpen(req, res, next) {
        console.log(req.body);
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