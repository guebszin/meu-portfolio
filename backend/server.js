const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const dataPath = path.join(__dirname, '../db/projects.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // serve frontend

// API - listar projetos
app.get('/api/projects', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler os projetos.' });
    try {
      res.json(JSON.parse(data));
    } catch {
      res.status(500).json({ error: 'Erro ao processar os projetos.' });
    }
  });
});

// API - adicionar projeto
app.post('/api/projects', (req, res) => {
  const novoProjeto = req.body;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler projetos.' });
    let projetos = [];
    try {
      projetos = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: 'Erro ao processar os dados.' });
    }
    projetos.push(novoProjeto);
    fs.writeFile(dataPath, JSON.stringify(projetos, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Erro ao salvar projeto.' });
      res.json({ message: 'Projeto adicionado com sucesso!' });
    });
  });
});

// Fallback para frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
