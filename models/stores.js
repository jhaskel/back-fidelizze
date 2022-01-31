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
        stores.description,
        new Date(),
        new Date()
    ]);
};
Stores.update = (sintomas) => {
    console.log(sintomas);
    const sql = `
    UPDATE
        stores
    SET       
        name = $2,
        updated_at = $3,
        name = $4,
        address =  $5,
        description = $6,
        isativo = $7,
        isopen= $8,
        adesivos= $9,
        logo= $10,
        created_at= $11,
        updated_at= $12
    WHERE
        id = $1
    `;
    return db.none(sql, [
        sintomas.id,
        sintomas.name,        
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