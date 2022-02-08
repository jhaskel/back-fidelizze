const cardsController = require('../controllers/cardsController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */
   app.get('/api/cards/getAll', passport.authenticate('jwt', {session: false}), cardsController.getAll);
   app.get('/api/cards/findByStore/:id_store',passport.authenticate('jwt',{session:false}),cardsController.findByStore);
   app.get('/api/cards/findByUser/:id_user',passport.authenticate('jwt',{session:false}),cardsController.findByUser);
   app.get('/api/cards/findByCards/:id_user',passport.authenticate('jwt',{session:false}),cardsController.findByCards);
   app.get('/api/cards/findByQuantByUser/:id_store',passport.authenticate('jwt',{session:false}),cardsController.findByQuantByUser);
   app.get('/api/cards/findQuantByService/:code',passport.authenticate('jwt',{session:false}),cardsController.findQuantByService);

    /*
    * POST ROUTES
    */
   app.post('/api/cards/create', passport.authenticate('jwt', {session: false}), cardsController.create);
   app.put('/api/cards/update', passport.authenticate('jwt', {session: false}), cardsController.update);
   app.delete('/api/cards/delete', passport.authenticate('jwt', {session: false}), cardsController.delete);
}