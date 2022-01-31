const Sintomas = require('../models/sintomas');

module.exports = {

    async getAll(req, res, next) {

        try {
            const data = await Sintomas.getAll();
            console.log(`Sintomas ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Houve um erro em obter os sintomas',
                error: error,
                success: false
            })
        }

    },

    async create(req, res, next) {
        try {
            const sintomas = req.body;
            console.log(`Sintoma enviado: ${Sintomas}`);

            const data = await Sintomas.create(sintomas);

            return res.status(201).json({
                message: 'Sintoma adiconado com Sucesso',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Houve um erro em obter os sintomas',
                success: false,
                error: error
            });
        }
    },

    async update(req, res, next) {
        console.log(req.body);
        try {
            
            let sintoma = req.body;
            await Sintomas.update(sintoma);            

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
            await Sintomas.delete(sintoma);            

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