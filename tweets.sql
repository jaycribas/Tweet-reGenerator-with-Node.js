DROP DATABASE IF EXISTS twitter;
CREATE DATABASE twitter;

\c twitter;

CREATE TABLE tweets (
  id SERIAL PRIMARY KEY,
  tweet VARCHAR(140),
  frequency VARCHAR,
  last_sent TIMESTAMP(0)
)
