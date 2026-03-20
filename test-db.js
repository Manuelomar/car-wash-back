const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    port: 5433,
    user: 'postgres',
    password: 'postgres',
    database: 'carwash_db'
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL successfully!');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('Query result:', res.rows[0]);
        return client.end();
    })
    .catch(err => {
        console.error('Connection error', err.stack);
        client.end();
    });
