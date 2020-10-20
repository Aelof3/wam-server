BEGIN;

INSERT INTO users
    (user_name, user_pass)
VALUES
  ('user1', 'a722c63db8ec8625af6cf71cb8c2d939'),
  ('user2', 'c1572d05424d0ecb2a65ec6a82aeacbf'),
  ('user3', '3afc79b597f88a72528e864cf81856d2'),
  ('user4', 'fc2921d9057ac44e549efaf0048b2512');

INSERT INTO scores (score, user_name) VALUES
  (1000, 'user1'),
  (2000, 'user2'),
  (3000, 'user3'),
  (4000, 'user4');
  

COMMIT;