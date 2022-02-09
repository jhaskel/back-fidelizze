const resgatesController = require('../controllers/resgatesController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */
   app.get('/api/resgates/getAll', passport.authenticate('jwt', {session: false}), resgatesController.getAll);
   app.get('/api/resgates/findByStore/:id_store',passport.authenticate('jwt',{session:false}),resgatesController.findByStore);
   app.get('/api/resgates/findQuantByStore/:id_store',passport.authenticate('jwt',{session:false}),resgatesController.findQuantByStore);
   app.get('/api/resgates/findByUser/:id_user',passport.authenticate('jwt',{session:false}),resgatesController.findByUser);
   app.get('/api/resgates/findQuantByUser/:id_user',passport.authenticate('jwt',{session:false}),resgatesController.findQuantByUser);





    /*
    * POST ROUTES
    */
   app.post('/api/resgates/create', passport.authenticate('jwt', {session: false}), resgatesController.create);
   app.put('/api/resgates/update', passport.authenticate('jwt', {session: false}), resgatesController.update);
   app.delete('/api/resgates/delete', passport.authenticate('jwt', {session: false}), resgatesController.delete);
}