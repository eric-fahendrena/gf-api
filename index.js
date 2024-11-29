import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import dbConnect from "./db/dbConnect.js";
import Branch from "./models/Branch.js";
import Question from "./models/Question.js";
import Answer from "./models/Answer.js";

/**
 * load json file
 * @param {Stringg} jsonFile 
 * @returns 
 */
async function loadJSON(jsonFile) {
  try {
    const filePath = path.join(process.cwd(), "data", jsonFile)
    console.log(`Le chemin est ${filePath}`)
    const contenu = await fs.promises.readFile(filePath, 'utf-8');  // Chemin du fichier
    const data = JSON.parse(contenu);  // Conversion en objet JavaScript
    // console.log(data);
    return data;
  } catch (erreur) {
    console.error('Erreur lors du chargement du fichier JSON :', erreur);
  }
}

dotenv.config();
dbConnect();
const app = express();
const port = process.env.PORT || 5000;
// importData()

const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions)); // Appliquer CORS avec options
app.use(bodyParser.json());

app.post("/api/auth/login", async (req, res) => {
  const { password } = req.body;
  const pwdsJson = await loadJSON("passwords.json");

  bcrypt.compare(password, pwdsJson.site.pwd, (err, result) => {
    if (err) {
      console.error("error:", err);
      return;
    }
    if (result) {
      const token = jwt.sign({ authenticated: true }, process.env.JWT_TOKEN, { expiresIn: "1h" });
      return res.json({ success: true, token });
    }
    res.status(401).json({ success: false, message: "password incorrect" });
  })
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

/**
 * endpoints api
 */

app.get('/api/categories', async (req, res) => {
  const branches = await loadJSON("branches.json");
  res.json(branches);
});
app.get('/api/asa-en-ligne', authenticateToken, async (req, res) => {
  const asaEnLigne = await loadJSON("asa-en-ligne.json");
  res.json(asaEnLigne);
});
app.get('/api/sary-sy-videos', async (req, res) => {
  const sv = await loadJSON("sary-sy-videos.json");
  res.json(sv);
});
app.get('/api/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(process.cwd(), "data", filename);

  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).send("File Not Found");
  }
});

app.listen(port, () => {
  console.log("server running on port", port);
});
