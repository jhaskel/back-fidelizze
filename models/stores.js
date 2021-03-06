const db = require('../config/config');

const Stores = {};

Stores.getAll = () => {

    const sql = `
        SELECT
            id,
            name,
            address,
            description,
            isativo,
            isopen,
            adesivos,
            logo,
            created_at,
            updated_at
        FROM
            stores
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
},
Stores.findById = (id) => {
    console.log("idx "+ id );
    const sql = `
    SELECT * FROM stores WHERE id = $1
    
    `
    return db.oneOrNone(sql, id);
},

Stores.create = (stores) => {
    const sql = `
    INSERT INTO
        stores(            
            name,
            address,
            phone,
            description,
            isativo,
            isopen,
            adesivos,
            logo,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10) RETURNING id
    `;
    return db.oneOrNone(sql, [
        stores.name,
        stores.address,
        stores.phone,
        stores.description,
        true,
        false,
        stores.adesivos,
        stores.logo,
        new Date(),
        new Date()
    ]);
},
Stores.update = (stores) => {
    console.log(stores);
    const sql = `
    UPDATE
        stores
    SET       
        name = $2,        
        address =  $3,
        phone =  $4,
        description = $5,
        isativo = $6,
        isopen= $7,
        adesivos= $8,
        logo= $9,
        created_at= $10      
    WHERE
        id = $1
    `;
    return db.none(sql, [
        stores.id,
        stores.name,
        stores.address,
        stores.phone,
        stores.description,
        stores.isativo,
        stores.isopen,
        stores.adesivos,
        stores.logo,       
        new Date()
    ]);
};
Stores.updateOpen = (stores) => {
    console.log(stores);
    const sql = `
    UPDATE stores SET isopen = $2 WHERE id = $1
    `;
    return db.none(sql, [
        stores.id,
        stores.isopen,
        
    ]);
};

Stores.delete = (stores) => {
    console.log(stores);
    const sql = `
    DELETE FROM
        stores    
    WHERE
        id = $1
    `;
    return db.none(sql,[stores.id]);
};

module.exports = Stores;