const StoresController = require('../controllers/storesController');
const passport = require('passport');

module.exports = (app,upload) => {

    /*
    * GET ROUTES
    */
   app.get('/api/stores/getAll', passport.authenticate('jwt', {session: false}), StoresController.getAll);
   app.get('/api/stores/findById/:id',passport.authenticate('jwt',{session:false}),StoresController.findById);
    
   app.post('/api/stores/create', passport.authenticate('jwt', {session: false}), StoresController.create);   
   app.put('/api/stores/update', passport.authenticate('jwt', {session: false}),upload.array('image', 1), StoresController.update);
   app.put('/api/stores/isopen', passport.authenticate('jwt', {session: false}), StoresController.updateOpen);  
   app.delete('/api/stores/delete', passport.authenticate('jwt', {session: false}), StoresController.delete);
}