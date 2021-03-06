const db = require('../config/config');

const Cards = {};

Cards.getAll = () => {

    const sql = `
        SELECT * FROM cards ORDER BY updated_at,nomeloja
    `;

    return db.manyOrNone(sql);
};

Cards.findByStores = (id_store) => {
    const sql = `
    SELECT *  FROM  cards  WHERE id_store = $1
    `;

    return db.manyOrNone(sql, id_store);
};

Cards.findByUser = (id_user) => {
    const sql = `
    SELECT *  FROM  cards  WHERE id_user = $1 and isativo= true
    `;

    return db.manyOrNone(sql, id_user);
};

Cards.findByCards = (id_user) => {
    const sql = `
    SELECT C.id_store, count(C.id) quant,S.name nomeloja,S.logo,S.isopen,S.adesivos,C.isativo,
    (select array_to_json(array_agg(row_to_json(t)))
       from (
         select CD.id,CD.nomeloja,CD.created_at from cards CD	 
           
      where CD.id_store = C.id_store and CD.id_user = C.id_user  and CD.isativo = true
      order by CD.created_at 
       ) t)      
       
   
   FROM cards C 
   inner join stores S on S.id = C.id_store
   where C.id_user = $1 and C.isativo = true
   GROUP BY C.id_store,S.name, S.logo,S.isopen,S.adesivos,C.isativo, C.id_user 
   ORDER  BY C.id_store
   
   
    `;

    return db.manyOrNone(sql, id_user);
};

Cards.findByQuantUser = (id_store) => {
    const sql = `
    SELECT count(C.id_store) quant,U.name nomecliente,U.email,C.id_user          
   
    FROM cards C 
    inner join users U on U.id = C.id_user
    where C.id_store = $1 and C.isativo = true
     group by C.id_store,U.name,U.email,C.id_user ORDER  BY quant desc,nomecliente
   
   
    `;

    return db.manyOrNone(sql, id_store);
};

Cards.findQuantByService = (code) => {
    const sql = `
    select count(id) quant from cards where code = $1 group by code
    `;
    return db.oneOrNone(sql, code);
};


Cards.create = (cards) => {
    const sql = `
    INSERT INTO
        cards( 
            id_user,  
            id_store,           
            code,            
            nomecliente,
            nomeloja,
            isativo,                
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4,$5,$6,$7,$8) RETURNING id
    `;
    return db.oneOrNone(sql, [
        cards.id_user,
        cards.id_store,
        cards.code,
        cards.nomecliente, 
        cards.nomeloja, 
        true,          
        new Date(),
        new Date()
    ]);
};
Cards.update = (cards) => {
    console.log(cards);
    const sql = `
    UPDATE
        cards
    SET                
        isativo = $2,        
        updated_at= $3,
        id_resgate=$4
    WHERE
        id = $1
    `;
    return db.none(sql, [
        cards.id,       
        cards.isativo,
        new Date(),
        cards.id_resgate
    ]);
};

Cards.delete = (cards) => {
    console.log(cards);
    const sql = `
    DELETE FROM
        cards    
    WHERE
        id = $1
    `;
    return db.none(sql,[cards.id]);
};

module.exports = Cards;