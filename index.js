import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadJSON(jsonFile) {
  try {
    const filePath = path.join(process.cwd(), "data", jsonFile)
    console.log(`Le chemin est ${filePath}`)
    const contenu = await fs.promises.readFile(filePath, 'utf-8');  // Chemin du fichier
    const data = JSON.parse(contenu);  // Conversion en objet JavaScript
    console.log(data);
    return data;
  } catch (erreur) {
    console.error('Erreur lors du chargement du fichier JSON :', erreur);
  }
}

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  // origin: 'http://localhost:5173', // Autorise uniquement votre client local
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true, // Permet l'envoi des cookies si nécessaire
};

app.use(cors(corsOptions)); // Appliquer CORS avec options
app.use(bodyParser.json());

app.post("/api/auth/login", async (req, res) => {
  const { password } = req.body;
  const pwdsJson = await loadJSON("passwords.json");

  if (password === pwdsJson.site.pwd) {
    const token = jwt.sign({ authenticated: true }, process.env.JWT_TOKEN, { expiresIn: "1h" });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: "password incorrect" });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error("missing token");
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      console.error("invalid token", err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.get('/api/categories', authenticateToken, async (req, res) => {
  const branches = await loadJSON("branches.json");
  res.json(branches);
});

app.listen(port, () => {
  console.log("server running on port", port);
});
