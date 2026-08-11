// ==========================================================================
// AURA ATELIER BACKEND - EXPRESS HTTP SERVER ENTRYPOINT
// ==========================================================================

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/apiRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api', apiRoutes);

// Serve static frontend assets from public/ and root
app.use('/public', express.static(path.join(ROOT_DIR, 'public')));
app.use('/assets', express.static(path.join(ROOT_DIR, 'assets')));
app.use('/js', express.static(path.join(ROOT_DIR, 'js')));
app.use(express.static(ROOT_DIR));

// Serve index.html for root path
app.get('*', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

// Start listening
app.listen(PORT, () => {
  console.log(`
  ======================================================
  ✨ AURA Atelier REST API Server Running
  📡 Local Server: http://localhost:${PORT}
  🔗 API Health:   http://localhost:${PORT}/api/health
  🛒 Products API: http://localhost:${PORT}/api/products
  ======================================================
  `);
});
