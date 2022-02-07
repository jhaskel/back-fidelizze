const StoresController = require('../controllers/storesController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */
   app.get('/api/stores/getAll', passport.authenticate('jwt', {session: false}), StoresController.getAll);
   app.get('/api/stores/findById/:id',passport.authenticate('jwt',{session:false}),StoresController.findById);

    /*
    * POST ROUTES
    */
   app.post('/api/stores/create', passport.authenticate('jwt', {session: false}), StoresController.create);
   app.put('/api/stores/update', passport.authenticate('jwt', {session: false}), StoresController.update);
   app.delete('/api/stores/delete', passport.authenticate('jwt', {session: false}), StoresController.delete);
}