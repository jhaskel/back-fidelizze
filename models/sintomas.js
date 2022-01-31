const db = require('../config/config');

const Sintomas = {};

Sintomas.getAll = () => {

    const sql = `
        SELECT
            id,
            name           
        FROM
            sintomas
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}

Sintomas.create = (sintomas) => {
    const sql = `
    INSERT INTO
        sintomas(
            name,            
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3) RETURNING id
    `;
    return db.oneOrNone(sql, [
        sintomas.name,       
        new Date(),
        new Date()
    ]);
}

Sintomas.update = (sintomas) => {
    console.log(sintomas);
    const sql = `
    UPDATE
        sintomas
    SET       
        name = $2,
        updated_at = $3
    WHERE
        id = $1
    `;
    return db.none(sql, [
        sintomas.id,
        sintomas.name,        
        new Date()
    ]);
}

Sintomas.delete = (sintomas) => {
    console.log(sintomas);
    const sql = `
    DELETE FROM
        sintomas    
    WHERE
        id = $1
    `;
    return db.none(sql,[sintomas.id]);
}

module.exports = Sintomas;