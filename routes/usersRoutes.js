const UsersController = require('../controllers/usersController');
const passport = require("passport")

module.exports = (app,upload) => {
    // TRAER DATOS
    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/findByRole/:role', UsersController.findByRole);
    app.get('/api/users/findById/:id',passport.authenticate('jwt',{session:false}),UsersController.findById);
    app.get('/api/users/findByEmail/:email',UsersController.findByEmail);
    //app.get('/api/users/findById/:id',UsersController.findById);
    app.get('/api/teste', function (req, res) {
        res.send('Hello World!');
      });
    app.post('/api/users/create', upload.array('image',1),UsersController.registerWithImage);
    
    app.post('/api/users/createWeb', UsersController.register);
    app.post('/api/users/login', UsersController.login);
    app.post('/api/users/logout', UsersController.logout);    

    app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update);
    
    app.post('/api/users/send', UsersController.send);
    app.put('/api/users/recovery', UsersController.recovery);
    app.put('/api/users/esqueci', UsersController.esqueci);
   
   
}