const SintomasController = require('../controllers/sintomasController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */
   app.get('/api/sintomas/getAll', passport.authenticate('jwt', {session: false}), SintomasController.getAll);

    /*
    * POST ROUTES
    */
   app.post('/api/sintomas/create', passport.authenticate('jwt', {session: false}), SintomasController.create);
   app.put('/api/sintomas/update', passport.authenticate('jwt', {session: false}), SintomasController.update);
   app.delete('/api/sintomas/delete', passport.authenticate('jwt', {session: false}), SintomasController.delete);
}