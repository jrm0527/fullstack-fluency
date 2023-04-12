DROP TABLE task;

CREATE TABLE task (
    id serial PRIMARY KEY,
    task text,
    complete boolean
);