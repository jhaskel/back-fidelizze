const db = require('../config/config');
const crypto = require('crypto');

const User = {};

User.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM
        users
    `;

    return db.manyOrNone(sql);
}


User.findById = (id, callback) => {

    const sql = `
    SELECT
        *
    FROM
        users
    WHERE
        id = $1`;
    
    return db.oneOrNone(sql, id).then(user => { callback(null, user); })

}

User.findByUserId = (id) => {
    console.log("idx "+ id );
    const sql = `
    SELECT
        U.*,
        (select array_to_json(array_agg(row_to_json(t)))
    from (
      select roles.id, roles.name,roles.image,roles.route from roles
	
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
		
    WHERE
        roles.id = UHR.id_rol
		
    ) t)
    FROM 
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.id = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, id);
}

User.findDeliveryMen = () => {
    const sql = `
    SELECT
        id,
        email,
        name,
            
        phone,
        U.password,
        U.session_token,
        U.notification_token
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON 
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 3  
    `;
    return db.manyOrNone(sql);
};

User.findByEmail = (email) => {
    const sql = `
    SELECT
       U.*,
        (select array_to_json(array_agg(row_to_json(t)))
    from (
      select roles.id, roles.name,roles.image,roles.route from roles
	
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
		
    WHERE
        roles.id = UHR.id_rol
		
    ) t)
    FROM 
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.email = $1
    GROUP BY
        U.id
    
    `
    return db.oneOrNone(sql, email);
};
User.findByRole = (role) => {
    const sql = `
    SELECT
        U.*   
    FROM 
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.name = $1
    GROUP BY
        U.id
		order by U.name
    `
    return db.manyOrNone(sql, role);
}



User.getAdminsNotificationTokens = () => {
    const sql = `
    SELECT
        U.notification_token
    FROM 
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 2
    `
    return db.manyOrNone(sql);
}

User.getUserNotificationToken = (id) => {
    const sql = `
    SELECT
        U.notification_token
    FROM 
        users AS U
    WHERE
        U.id = $1
    `
    return db.oneOrNone(sql, id);
}

User.create = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = `
    INSERT INTO
        users(
            email,
            name,  
            password,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5) RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.email,
        user.name,          
        user.password,
        new Date(),
        new Date()
    ]);
}

User.update = (user) => {
    const sql = `
    UPDATE
        users
    SET
        name = $2,       
        phone = $3,       
        updated_at = $4
    WHERE
        id = $1
    `;

    return db.none(sql, [
        user.id,
        user.name,        
        user.phone,        
        new Date()
    ]);
},
User.recover = (user) => {

  const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
   user.password = myPasswordHashed;
    console.log(`jjjkjkjkjkkj ${user.password}`);

    const sql = `
    UPDATE users set password = $2 where email = $1
    `;

    return db.none(sql, [
        user.email,
        user.password       
          
      
    ]);
},
User.esqueci = (user) => {

   
  
      const sql = `
      UPDATE users set recovery = $2 where id = $1
      `;
  
      return db.none(sql, [
          user.id,
          user.recovery       
            
        
      ]);
  },
  



User.updateToken = (id, token) => {
    const sql = `
    UPDATE
        users
    SET
        session_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}

User.updateNotificationToken = (id, token) => {
    const sql = `
    UPDATE
        users
    SET
        notification_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}

User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = User;