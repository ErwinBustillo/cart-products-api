-- MUST BE RUNNED PIECE BY PIECE 
CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE IF NOT EXISTS carts (
	id uuid PRIMARY KEY,
	user_id uuid NOT NULL,
	created_at date NOT NULL DEFAULT NOW(),
	updated_at date NOT NULL DEFAULT NOW(),
	status cart_status NOT NULL DEFAULT 'OPEN'
);

CREATE TABLE IF NOT EXISTS cart_items (
	cart_id uuid REFERENCES carts (id) ON DELETE CASCADE,
	product_id uuid NOT NULL,
	"count" integer NOT NULL
);


CREATE TABLE IF NOT EXISTS users (
	id uuid PRIMARY KEY,
	name varchar(50) NOT NULL,
	password varchar(100) NOT NULL, -- bcrypt hashed password
	email varchar(200)
);



INSERT INTO carts VALUES 
('4f58c051-c881-43a3-933e-ec0919b3025f', 'e414b0c3-07ce-4127-b7f6-88145bf8f4a5', '2023-03-29', '2023-03-30', 'OPEN');

-- CART (2 items)
INSERT INTO cart_items VALUES 
('4f58c051-c881-43a3-933e-ec0919b3025f', '6d9c4342-debb-4ae4-aae0-b2de0e4836dd', 1),
('4f58c051-c881-43a3-933e-ec0919b3025f', '3866cd52-8d0a-478a-9a1a-5d24db65ec61', 1);