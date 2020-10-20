CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT NOT NULL,
    user_pass TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS scores (
    score_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    score INTEGER NOT NULL,
    user_name TEXT NOT NULL
);