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
    SELECT *  FROM  cards  WHERE id_user = $1
    `;

    return db.manyOrNone(sql, id_user);
};

Cards.findByCards = (id_user) => {
    const sql = `
    SELECT id_store, count(id) quant,nomeloja,
 (select array_to_json(array_agg(row_to_json(t)))
    from (
      select CD.id,CD.nomeloja,CD.created_at from cards CD	 
		
   where CD.id_store = C.id_store
    ) t)
	
	

FROM cards C 
where C.id_user = $1 and C.isativo = true
GROUP BY C.id_store,C.nomeloja ORDER BY C.id_store
    `;

    return db.manyOrNone(sql, id_user);
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
        id_user = $2,
        id_store = $3,                
        code =  $4,  
        nomecliente =  $5,  
        nomeloja =  $6,  
        isativo = $7      
        created_at= $8,
        updated_at= $9
    WHERE
        id = $1
    `;
    return db.none(sql, [
        cards.id,
        cards.id_user,
        cards.id_store,       
        cards.code, 
        cards.nomecliente, 
        cards.nomeloja, 
        cards.isativo,      
        cards.created_at,
        new Date()
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