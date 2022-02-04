const db = require('../config/config');

const Services = {};

Services.getAll = () => {

    const sql = `
        SELECT
            id,
            id_store,
            name,
            code,           
            created_at,
            updated_at
        FROM
            services
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
};

Services.findByStores = (id_store) => {
    const sql = `
    SELECT S.*,L.isopen   
FROM  services S
inner join stores L on L.id = S.id_store
WHERE S.id_store = $1
    `;

    return db.manyOrNone(sql, id_store);
}

Services.create = (services) => {
    const sql = `
    INSERT INTO
        services( 
            id_store,           
            name,            
            code,            
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4,$5) RETURNING id
    `;
    return db.oneOrNone(sql, [
        services.id_store,
        services.name,
        services.code,      
        new Date(),
        new Date()
    ]);
};
Services.update = (services) => {
    console.log(services);
    const sql = `
    UPDATE
        services
    SET       
        id_store = $2, 
        name = $2,        
        code =  $3,        
        created_at= $4,
        updated_at= $5
    WHERE
        id = $1
    `;
    return db.none(sql, [
        services.id,
        services.id_store,
        services.name,
        services.code,        
        services.created_at,
        new Date()
    ]);
};

Services.delete = (services) => {
    console.log(services);
    const sql = `
    DELETE FROM
        services    
    WHERE
        id = $1
    `;
    return db.none(sql,[services.id]);
};

module.exports = Services;