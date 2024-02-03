create table if not exists posts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL UNIQUE,
    created_dt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table if not exists tags (
    id SMALLSERIAL PRIMARY KEY,
    tag_name varchar(50) NOT NULL UNIQUE
);

INSERT INTO tags (tag_name) VALUES ('Python');
INSERT INTO tags (tag_name) VALUES ('Rust');
INSERT INTO tags (tag_name) VALUES ('SQL');
INSERT INTO tags (tag_name) VALUES ('Javascript');
INSERT INTO tags (tag_name) VALUES ('C++');
INSERT INTO tags (tag_name) VALUES ('C');
INSERT INTO tags (tag_name) VALUES ('Java');
INSERT INTO tags (tag_name) VALUES ('AWS');
INSERT INTO tags (tag_name) VALUES ('React');
INSERT INTO tags (tag_name) VALUES ('Express');
INSERT INTO tags (tag_name) VALUES ('Web Development');
INSERT INTO tags (tag_name) VALUES ('Network Programming');
INSERT INTO tags (tag_name) VALUES ('Machine Learning');
INSERT INTO tags (tag_name) VALUES ('Dev Ops');
INSERT INTO tags (tag_name) VALUES ('Computer and Information Research');
INSERT INTO tags (tag_name) VALUES ('Systems Programming');
INSERT INTO tags (tag_name) VALUES ('Graphics Programming');
INSERT INTO tags (tag_name) VALUES ('Cloud Computing');

create table if not exists post_tags (
  tag_id SMALLSERIAL NOT NULL,
  post_id uuid NOT NULL,

  constraint fk_tag_id foreign key (tag_id) references tags (id) on delete cascade,
  constraint fk_post_id foreign key (post_id) references posts (id) on delete cascade
);

create table if not exists users (
  user_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username varchar(50) NOT NULL UNIQUE,
  password varchar(100) NOT NULL,
  last_login timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password) VALUES ('swdro', '<password>');
