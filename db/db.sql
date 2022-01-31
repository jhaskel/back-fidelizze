DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL, 
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'CLIENTE',
	'cliente/list',
	'2021-05-22',
	'2021-05-22'
);


INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'ADMIN',
	'admin/list',
	'2021-05-22',
	'2021-05-22'
);

INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'DEV',
	'dev/list',
	'2021-05-22',
	'2021-05-22'
);


DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(80) NOT NULL ,	
	password VARCHAR(255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	notification_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);

DROP TABLE IF EXISTS stores CASCADE;
CREATE TABLE stores (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL ,
	address VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	isativo BOOLEAN NOT NULL,
	isopen BOOLEAN NOT NULL,
	adesivos BIGINT NOT NULL,
	logo VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE services(
	id BIGSERIAL PRIMARY KEY,
	id_store BIGINT NOT NULL,
	name VARCHAR(180) NOT NULL UNIQUE,
	code VARCHAR(255) NOT NULL,	
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_store) REFERENCES stores(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS cards CASCADE;
CREATE TABLE cards(
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL,
	id_store BIGINT NOT NULL,
	code VARCHAR(255) NOT NULL,	
	nomeloja VARCHAR(255) NOT NULL,	
	nomecliente VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_store) REFERENCES stores(id) ON UPDATE CASCADE ON DELETE CASCADE
);


DROP TABLE IF EXISTS resgate CASCADE;
CREATE TABLE resgate(
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL,
	id_store BIGINT NULL,	
	ano BIGINT NOT NULL,
	nomeloja VARCHAR(255) NOT NULL,	
	nomecliente VARCHAR(255) NOT NULL,	
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,	
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_store) REFERENCES stores(id) ON UPDATE CASCADE ON DELETE CASCADE
);

/*
SELECT
        G.*,
        (select array_to_json(array_agg(row_to_json(t)))
    from (
      select especialistas.* from especialistas
	
    INNER JOIN
        grupo_has_especialistas AS GHR
    ON
        GHR.id_grupo = G.id
    INNER JOIN
        especialistas AS R
    ON
        R.id = GHR.id_espe
		
    WHERE
        especialistas.id = GHR.id_espe
		
    ) t)
    FROM 
        grupo AS G
   
    WHERE
        G.id = 3
    GROUP BY
        G.id
    */
