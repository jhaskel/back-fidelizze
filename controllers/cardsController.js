const Cards = require('../models/cards');
const msg1 = 'Houve um erro ao obter os cartões!';
const msg2 = 'Card adicionado com Sucesso!';
const msg3 = 'Houve um erro em cadastrar o card!';
const msg4 = 'O serviço foi atualizado com card!';
const msg5 = 'Houve um erro em atualizar o card!';
const msg6 = 'Card deletado com sucesso!';
const msg7 = 'Houve um erro ao deletar o card!';


var contribuintes = [];

module.exports = {


    async getAll(req, res, next) {

        try {
            const data = await Cards.getAll();
            console.log(`cards ${JSON.stringify(data)}`);
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
        //gdf

    },
    async getBetha(req, res, next) {


        console.log(contribuintes.length)

        for (var c in contribuintes) {
            console.log(contribuintes[c].cadImobiliario);
            console.log(contribuintes[c].id);
        }

        return res.status(201).json(contribuintes);
        /*  try {
              const data = req.body;
             
              return res.status(201).json(contribuintes);
          } 
          catch (error) {
              console.log(`Error ${error}`);    
              return res.status(501).json({
                  message: msg1,
                  error: error,
                  success: false
              })
          }*/

    },

    async findByStore(req, res, next) {
        try {
            const id_store = req.params.id_store;
            console.log(`paraetro: ${id_store}`);
            const data = await Cards.findByStores(id_store);
            return res.status(201).json(data);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Erro ao listar los cards por loja`,
                success: false,
                error: error
            });
        }
    },

    async findByUser(req, res, next) {
        try {
            const id_user = req.params.id_user;
            console.log(`paraetro: ${id_user}`);
            const data = await Cards.findByUser(id_user);
            return res.status(201).json(data);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Erro ao listar los cards por usuário`,
                success: false,
                error: error
            });
        }
    },
    async findByCards(req, res, next) {
        try {
            const id_user = req.params.id_user;
            console.log(`paraetro: ${id_user}`);
            const data = await Cards.findByCards(id_user);
            return res.status(201).json(data);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Erro ao listar los cards por usuário`,
                success: false,
                error: error
            });
        }
    },

    async findByQuantByUser(req, res, next) {
        try {
            const id_store = req.params.id_store;
            console.log(`paraetro: ${id_store}`);
            const data = await Cards.findByQuantUser(id_store);
            return res.status(201).json(data);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Erro ao listar  quantidade de cards por usuário`,
                success: false,
                error: error
            });
        }
    },

    async findQuantByService(req, res, next) {
        try {
            const code = req.params.code;
            console.log(`paraetro: ${code}`);
            const data = await Cards.findQuantByService(code);
            return res.status(201).json(data);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Erro ao listar  quantidade de cards por serviço`,
                success: false,
                error: error
            });
        }
    },

    async create(req, res, next) {
        try {
            const cards = req.body;
            console.log(`Loja enviada: ${cards}`);

            const data = await Cards.create(cards);

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



    async betha(req, res, next) {


        contribuintes = [];
        console.log(contribuintes.length)
        const cards = req.body;
        console.log(`Loja enviada: ${cards}`);

        let contribuinte = new Object();



        for (let item in cards) {

            contribuinte = {

                id: cards[item].id,
                cadImobiliario: cards[item].cadImobiliario,
                nomeProprietario: cards[item].nomeProprietario,
                cpfCnpj: cards[item].cpfCnpj,
                endereco: cards[item].endereco,
                ativo: cards[item].ativo,
                inscricaoImobiliariaFormatada: cards[item].inscricaoImobiliariaFormatada,
                emglobado: cards[item].emglobado,
                codigoImovelPrincipal: cards[item].codigoImovelPrincipal,
                dadosAreaConstruida: cards[item].dadosAreaConstruida,
                dadosUnidade: cards[item].dadosUnidade,
                dadosAreaTotal: cards[item].dadosAreaTotal,
                dadosUtilizacao: cards[item].dadosUtilizacao,
                dadosEnglobado: cards[item].dadosEnglobado,
                dadosImune: cards[item].dadosImune
                
                


            }
            contribuintes.push(contribuinte)

        }
        console.log('lllll');
        console.log(contribuintes.length);


        for (var c in contribuintes) {
            console.log(contribuintes[c].unidade);
        }




        return res.status(201).json({
            id: cards.id,
            unidade: cards.unidade,
            estoque: cards.estoque,
            categoria: cards.categoria,


        });

    },

    async update(req, res, next) {
        console.log(req.body);
        try {

            let sintoma = req.body;
            await Cards.update(sintoma);

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
            await Cards.delete(sintoma);

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