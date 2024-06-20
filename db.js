const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, 'data', 'database.db');

// Função para criar a tabela
function createTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS chamadas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paciente TEXT NOT NULL,
            atendimento TEXT NOT NULL,
            sala INTEGER NOT NULL,
            prioritario TEXT NOT NULL,
            data DATETIME NOT NULL,
            identificacao TEXT NOT NULL,
            status TEXT NOT NULL,
            horaChamado DATETIME
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err.message);
        } else {
            console.log('Tabela criada com sucesso');
        }
    });
}

// Verifica se o arquivo do banco de dados existe
if (!fs.existsSync(dbPath)) {
    // Se não existe, cria o arquivo
    fs.writeFileSync(dbPath, '');
}

// Cria uma nova instância do banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conexão bem sucedida com o banco de dados');
        // Após a conexão bem-sucedida, cria a tabela
        createTable();
    }
});

module.exports = db;
