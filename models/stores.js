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
}

Stores.create = (stores) => {
    const sql = `
    INSERT INTO
        stores(            
            name,
            address,
            description,
            isativo,
            isopen,
            adesivos,
            logo,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9) RETURNING id
    `;
    return db.oneOrNone(sql, [
        stores.name,
        stores.address,
        stores.description,
        true,
        false,
        stores.adesivos,
        stores.logo,
        new Date(),
        new Date()
    ]);
};
Stores.update = (stores) => {
    console.log(stores);
    const sql = `
    UPDATE
        stores
    SET       
        name = $2,        
        address =  $3,
        description = $4,
        isativo = $5,
        isopen= $6,
        adesivos= $7,
        logo= $8,
        created_at= $9,
        updated_at= $10
    WHERE
        id = $1
    `;
    return db.none(sql, [
        stores.id,
        stores.name,
        stores.address,
        stores.description,
        stores.isativo,
        stores.isopen,,
        stores.adesivos,
        stores.logo,
        stores.created_at,
        new Date()
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