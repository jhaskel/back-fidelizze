const db = require('../config/config');

const Resgates = {};

Resgates.getAll = () => {

    const sql = `
        SELECT * FROM resgates ORDER BY updated_at,nomeloja
    `;

    return db.manyOrNone(sql);
};

Resgates.findByStores = (id_store) => {
    const sql = `
    SELECT *  FROM  resgates  WHERE id_store = $1
    `;

    return db.manyOrNone(sql, id_store);
};

Resgates.findByUser = (id_user) => {
    const sql = `
    SELECT R.*,
    (select array_to_json(array_agg(row_to_json(t)))
       from (
         select CD.*,S.name nameService from cards CD
		   inner join services S on S.code = CD.code
           
      where CD.id_resgate = R.id
      order by CD.created_at desc
       ) t)     
   
   FROM resgates R
   
   where R.id_user = $1 
   GROUP BY R.id ORDER  BY R.created_at desc
    `;

    return db.manyOrNone(sql, id_user);
};

Resgates.findQuantByUser = (id_user) => {
    const sql = `
    select * from resgates where id_user = $1 
    `;

    return db.manyOrNone(sql, id_user);
};

Resgates.findQuantByStores = (id_store) => {
    const sql = `
    select count(id) quant from resgates where id_store = $1 group by id_store
    `;
    return db.oneOrNone(sql, id_store);
};



Resgates.create = (resgates) => {
    const sql = `
    INSERT INTO
        resgates( 
            id_user,  
            id_store,           
            ano,   
            code,         
            nomecliente,
            nomeloja,                      
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4,$5,$6,$7,$8) RETURNING id
    `;
    return db.oneOrNone(sql, [
        resgates.id_user,
        resgates.id_store,
        resgates.ano,
        resgates.code,
        resgates.nomecliente, 
        resgates.nomeloja,                
        new Date(),
        new Date()
    ]);
};
Resgates.update = (resgates) => {
    console.log(resgates);
    const sql = `
    UPDATE
        resgates
    SET       
        id_user = $2,
        id_store = $3,
        ano =  $4,                  
        code =  $5,  
        nomecliente =  $6,  
        nomeloja =  $7,           
        created_at= $8,
        updated_at= $9        
    WHERE
        id = $1
    `;
    return db.none(sql, [
        resgates.id,
        resgates.id_user,
        resgates.id_store,
        resgates.ano,        
        resgates.code, 
        resgates.nomecliente, 
        resgates.nomeloja,           
        resgates.created_at,        
        new Date()
    ]);
};

Resgates.delete = (resgates) => {
    console.log(resgates);
    const sql = `
    DELETE FROM
        resgates    
    WHERE
        id = $1
    `;
    return db.none(sql,[resgates.id]);
};

module.exports = Resgates;