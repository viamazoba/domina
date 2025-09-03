db = db.getSiblingDB('authdb');
db.createUser({
    user: 'auth_user',
    pwd: 'auth_pass',
    roles: [{ role: 'readWrite', db: 'authdb' }]
});
