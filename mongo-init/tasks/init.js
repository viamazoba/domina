db = db.getSiblingDB('tasksdb');
db.createUser({
    user: 'tasks_user',
    pwd: 'tasks_pass',
    roles: [{ role: 'readWrite', db: 'tasksdb' }]
});
