const Resgates = require('../models/resgates');
const msg1 = 'Houve um erro ao obter os cartões!';
const msg2 = 'Resgate adicionado com Sucesso!';
const msg3 = 'Houve um erro em cadastrar o resgate!';
const msg4 = 'O serviço foi atualizado com resgate!';
const msg5 = 'Houve um erro em atualizar o resgate!';
const msg6 = 'Resgate deletado com sucesso!';
const msg7 = 'Houve um erro ao deletar o resgate!';

module.exports = {

    async getAll(req, res, next) {

        try {
            const data = await Resgates.getAll();
            console.log(`resgates ${JSON.stringify(data)}`);
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
            const id_store = req.params.id_store;
            console.log(`paraetro: ${id_store}`);
            const data = await Resgates.findByStores(id_store);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Erro ao listar los resgates por loja`,
                success: false,
                error: error
            });
        }
    },

    async findByUser(req, res, next) {
        try {
            const id_user = req.params.id_user;
            console.log(`paraetro: ${id_user}`);
            const data = await Resgates.findByUser(id_user);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Erro ao listar los resgates por usuário`,
                success: false,
                error: error
            });
        }
    },
    async findByCards(req, res, next) {
        try {
            const id_user = req.params.id_user;
            console.log(`paraetro: ${id_user}`);
            const data = await Resgates.findByCards(id_user);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Erro ao listar los resgates por usuário`,
                success: false,
                error: error
            });
        }
    },

    async create(req, res, next) {
        try {
            const resgates = req.body;
            console.log(`Loja enviada: ${resgates}`);

            const data = await Resgates.create(resgates);

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
            await Resgates.update(sintoma);            

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
            await Resgates.delete(sintoma);            

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