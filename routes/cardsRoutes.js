const cardsController = require('../controllers/cardsController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */
   app.get('/api/cards/getAll', passport.authenticate('jwt', {session: false}), cardsController.getAll);
   app.get('/api/cards/findByStore/:id_store',passport.authenticate('jwt',{session:false}),cardsController.findByStore);
   app.get('/api/cards/findByUser/:id_user',passport.authenticate('jwt',{session:false}),cardsController.findByUser);

    /*
    * POST ROUTES
    */
   app.post('/api/cards/create', passport.authenticate('jwt', {session: false}), cardsController.create);
   app.put('/api/cards/update', passport.authenticate('jwt', {session: false}), cardsController.update);
   app.delete('/api/cards/delete', passport.authenticate('jwt', {session: false}), cardsController.delete);
}