const servicesController = require('../controllers/servicesController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */
   app.get('/api/services/getAll', passport.authenticate('jwt', {session: false}), servicesController.getAll);
   app.get('/api/users/findByStore/:id',passport.authenticate('jwt',{session:false}),servicesController.findByStore);

    /*
    * POST ROUTES
    */
   app.post('/api/services/create', passport.authenticate('jwt', {session: false}), servicesController.create);
   app.put('/api/services/update', passport.authenticate('jwt', {session: false}), servicesController.update);
   app.delete('/api/services/delete', passport.authenticate('jwt', {session: false}), servicesController.delete);
}