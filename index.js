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
 * import data
 */
async function importData() {
  try {
    const branch = new Branch( {
    
      "name": "Cours préparatoire",
      "items": [
        
        {
          
          "name": "Police",
          "items": [
            {
              
              "name": "Agent de police (niveau BEPC)",
              "items": [
                {
                  
                  "name": "Français",
                  "books": [
                    {
                      "path": "/pdf/frs/LEÇON-FRANÇAIS.pdf",
                      "name": "LEÇON-FRANÇAIS.pdf"
                    },
                    {
                      "path": "/pdf/frs/SUJET-TYPE-FRANÇAIS.pdf",
                      "name": "SUJET-TYPE-FRANÇAIS.pdf"
                    },
                    {
                      "path": "/pdf/frs/Expression-écrite-Dissertation-Résumé-et-Application.pdf",
                      "name": "Expression-écrite-Dissertation-Résumé-et-Application.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Connaissance génerale",
                  "books": [
                    {
                      "path": "/pdf/cg/Connaissance-générale-1.pdf",
                      "name": "Connaissance-générale-1.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Connaissance génerale (exercices)",
                  "books": [
                    {
                      "path": "/pdf/cg/Connaissance-générale-QCM.pdf",
                      "name": "Connaissance-générale-QCM.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Histoire et Géographie",
                  "books": [
                    {
                      "path": "/pdf/frs/LESONA-sy-SUJET-TYPE-HG.pdf",
                      "name": "LESONA-sy-SUJET-TYPE-HG.pdf"
                    }
                  ]
                }
              ]
            },
            {
              
              "name": "Inspecteur de police (niveau BACC)",
              "items": [
                {
                  
                  "name": "Français",
                  "books": [
                    {
                      "path": "/pdf/frs/Expression-écrite-Dissertation-Résumé-et-Application.pdf",
                      "name": "Expression-écrite-Dissertation-Résumé-et-Application.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Connaissance génerale",
                  "books": [
                    {
                      "path": "/pdf/cg/Connaissance-générale-1.pdf",
                      "name": "Connaissance-générale-1.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Histoire et Géographie"
                },
                {
                  
                  "name": "SVT"
                }
              ]
            }
          ]
        },
  
        {
          
          "name": "Gendarme",
          "items": [
            {
              
              "name": "Français",
              "books": [
                {
                  "path": "/pdf/frs/Expression-écrite-Dissertation-Résumé-et-Application.pdf",
                  "name": "Expression-écrite-Dissertation-Résumé-et-Application.pdf"
                }
              ]
            },
            {
              
              "name": "Malagasy",
              "books": [
                {
                  "path": "/pdf/mlg/LESONA-MALAGASY-TACD.pdf",
                  "name": "LESONA-MALAGASY-TACD.pdf"
                }
              ]
            },
            {
              
              "name": "Mathématiques",
              "books": [
                {
                  "path": "/pdf/maths/MATHÉMATIQUES-TERMINALE-A.pdf",
                  "name": "MATHÉMATIQUES-TERMINALE-A.pdf"
                }
              ]
            }
          ]
        },
  
        {
          
          "name": "ENS",
          "items": [
            {
              
              "name": "SE",
              "items": [
                {
                  
                  "name": "Connaissance géneral (leçons)",
                  "books": [
                    {
                      "path": "/pdf/cg/Connaissance-générale-1.pdf",
                      "name": "Connaissance-générale-1.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Connaissance géneral (exercices)",
                  "books": [
                    {
                      "path": "/pdf/cg/Connaissance-générale-QCM.pdf",
                      "name": "Connaissance-générale-QCM.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Français",
                  "books": [
                    {
                      "path": "/pdf/frs/Expression-écrite-Dissertation-Résumé-et-Application.pdf",
                      "name": "Expression-écrite-Dissertation-Résumé-et-Application.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Français (exercices)",
                  "books": [
                    {
                      "path": "/pdf/Français série A-C-D 2023.pdf",
                      "name": "Français série A-C-D 2023.pdf"
                    },
                    {
                      "path": "/pdf/Français série OSE 2023 .pdf",
                      "name": "Français série OSE 2023 .pdf"
                    },
                    {
                      "path": "/pdf/bac2014_Français_ACD.pdf",
                      "name": "bac2014_Français_ACD.pdf"
                    },
                    {
                      "path": "/pdf/bac2017_francais_ACD.pdf",
                      "name": "bac2017_francais_ACD.pdf"
                    },
                    {
                      "path": "/pdf/bac2022_français_D.pdf",
                      "name": "bac2022_français_D.pdf"
                    },
                    {
                      "path": "/pdf/Français série A-C-D 2023.pdf",
                      "name": "Français série A-C-D 2023.pdf"
                    },
                    {
                      "path": "/pdf/Français série S 2023.pdf",
                      "name": "Français série S 2023.pdf"
                    }
                  ]
                }
              ]
            },
            {
              
              "name": "ST",
              "items": [
                {
                  
                  "name": "Mathématiques (leçons)"
                },
                {
                  
                  "name": "Mathématiques (sujet)",
                  "books": [
                    {
                      "path": "/pdf/maths/SUJETS MATHS sy PC ENS.pdf",
                      "name": "SUJETS MATHS sy PC ENS.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Physique Chimie (leçons)"
                },
                {
                  
                  "name": "Physique Chimie (sujet)",
                  "books": [
                    {
                      "path": "/pdf/maths/SUJETS MATHS sy PC ENS.pdf",
                      "name": "SUJETS MATHS sy PC ENS.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Connaissance géneral (leçons)",
                  "books": [
                    {
                      "path": "/pdf/cg/Connaissance-générale-1.pdf",
                      "name": "Connaissance-générale-1.pdf"
                    },
                    {
                      "path": "/pdf/cg/Cours préparatoires Oral ENS 2021.pdf",
                      "name": "Cours préparatoires Oral ENS 2021.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Connaissance géneral (exercices)",
                  "books": [
                    {
                      "path": "/pdf/cg/Connaissance-générale-QCM.pdf",
                      "name": "Connaissance-générale-QCM.pdf"
                    }
                  ]
                }
              ]
            },
            {
              
              "name": "Français",
              "items": [
                {
                  
                  "name": "Connaissance géneral (leçons)",
                  "books": [
                    {
                      "path": "/pdf/cg/Connaissance-générale-1.pdf",
                      "name": "Connaissance-générale-1.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Connaissance géneral (exercices)"
                },
                {
                  
                  "name": "Français (leçon)"
                },
                {
                  
                  "name": "Français (exercices)"
                }
              ]
            },
            {
              
              "name": "Histo-Geo",
              "items": [
                {
                  
                  "name": "Connaissance géneral (leçons)",
                  "books": [
                    {
                      "path": "/pdf/cg/Connaissance-générale-1.pdf",
                      "name": "Connaissance-générale-1.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Connaissance géneral (exercices)"
                },
                {
                  
                  "name": "Histo-Geo (leçon)"
                },
                {
                  
                  "name": "Histo-Geo (exercices)"
                }
              ]
            },
            {
              
              "name": "SVT",
              "items": [
                {
                  
                  "name": "Connaissance géneral (leçons)",
                  "books": [
                    {
                      "path": "/pdf/cg/Connaissance-générale-1.pdf",
                      "name": "Connaissance-générale-1.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Connaissance géneral (exercices)"
                },
                {
                  
                  "name": "SVT (leçon)"
                },
                {
                  
                  "name": "SVT (leçons)"
                }
              ]
            }
          ]
        },
  
        {
          
          "name": "EMIT",
          "items": [
            {
              
              "name": "AES",
              "items": [
                {
                  
                  "name": "Français (leçon)",
                  "books": [
                    {
                      "path": "/pdf/frs/Expression-écrite-Dissertation-Résumé-et-Application.pdf",
                      "name": "Expression-écrite-Dissertation-Résumé-et-Application.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Français (sujet)"
                },
                {
                  
                  "name": "Test Psycho"
                }
              ]
            },
            {
              
              "name": "RPM",
              "items": [
                {
                  
                  "name": "Français (leçon)",
                  "books": [
                    {
                      "path": "/pdf/frs/Expression-écrite-Dissertation-Résumé-et-Application.pdf",
                      "name": "Expression-écrite-Dissertation-Résumé-et-Application.pdf"
                    }
                  ]
                },
                {
                  
                  "name": "Français (sujet)"
                },
                {
                  
                  "name": "Test Psycho"
                }
              ]
            },
            {
              
              "name": "DAII",
              "items": [
                {
                  
                  "name": "Mathématiques (leçon)"
                },
                {
                  
                  "name": "Mathématiques (sujet)"
                },
                {
                  
                  "name": "Test Psycho"
                }
              ]
            }
          ]
        },
  
        {
          
          "name": "ENI",
          "items": [
            {
              
              "name": "IA",
              "books": [
                {
                  "path": "/pdf/cg/Connaissance-générale-QCM.pdf",
                  "name": "Connaissance-générale-QCM.pdf"
                },
                {
                  "path": "/pdf/cg/Connaissance-générale-1.pdf",
                  "name": "Connaissance-générale-1.pdf"
                }
              ]
            },
            {
              
              "name": "Générale",
              "books": [
                {
                  "path": "/pdf/ENS ENI AGRO EMIT.pdf",
                  "name": "ENS ENI AGRO EMIT.pdf"
                },
                {
                  "path": "/pdf/sujet-ENI-tout-.pdf",
                  "name": "sujet-ENI-tout-.pdf"
                }
              ]
            }
          ]
        },
  
        {
          
          "name": "EG, SS et MCI",
          "items": [
            {
              
              "name": "EG",
              "items": []
            },
            {
              
              "name": "SS",
              "items": []
            },
            {
              
              "name": "MCI",
              "items": []
            }
          ]
        },
  
        {
          
          "name": "ISTE",
          "items": [
            {
              
              "name": "Environnement",
              "items": []
            },
            {
              
              "name": "Tourisme",
              "items": []
            },
            {
              
              "name": "Argonomie",
              "items": []
            },
            {
              
              "name": "Technologie",
              "items": []
            }
          ]
        },
  
        {
          
          "name": "ENAP",
          "items": [
            {
              
              "name": "Agent pénitentiaire",
              "items": [
                {
                  
                  "name": "Histoire et Géographie",
                  "books": [
                    {
                      "path": "/pdf/penitentiaire/LESONA-SUJET-TYPE-HG.pdf",
                      "name": "LESONA-SUJET-TYPE-HG.pdf"
                    }
                  ]
                }
              ]
            },
            {
              
              "name": "Encadreur",
              "items": []
            },
            {
              
              "name": "Educateur",
              "items": []
            }
          ]
        }
      ]
    });
    await branch.save()
    console.log("data imported successfully");
  } catch (err) {
    console.error("Error", err);
  }
}

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

/**
 * 
 * @param {String} jsonFile 
 * @param {Object|Array} data 
 */
async function updateJSON(jsonFile, data) {
  try {
    const filePath = path.join(process.cwd(), "data", jsonFile)
    console.log(`writing file..........`)
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (erreur) {
    console.error('Erreur lors du chargement du fichier JSON :', erreur);
  }
}

/**
 * get questions
 * @returns {Object}
 */
async function getQuestions() {
  const questions = Question.find();
  return questions;
}

/**
 * get question
 * @param {String} qId 
 * @returns 
 */
async function getQuestion(qId, res) {
  try {
    const question = await Question.findById(qId);
    if (!question) return res.status(404).json({ message: "question not found" });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).send("Internal Server error");
  }
}

/**
 * add questions
 * @param {Object} qDat 
 * @param {Response} res 
 * @returns 
 */
async function addQuestion(qDat, res) {
  console.log("Author:", qDat.author);
  if (!qDat.author) {
    console.error("missing author");
    return res && res.status(400).json({ message: "missing question author" });
  }
  if (!qDat.title) {
    console.error("missing title");
    return res && res.status(400).json({ message: "missing question title" });
  }
  if (!qDat.content) {
    console.error("missing content");
    return res && res.status(400).json({ message: "missing question content" });
  }

  try {
    const question = await new Question(qDat);
    await question.save();
    console.log("Added", question);
  } catch (err) {
    res && res.status(500).send("Internal Server Error");
  }

  console.log('Data...');
  const nQ = await getQuestions();
  res && res.json(nQ)
  console.log(nQ);
}

/**
 * add answer
 * @param {Object} aDat 
 * @param {Response} res 
 * @returns 
 */
async function addAnswer(aDat, res) {
  if (!aDat.qId) return res.status(400).json({ message: "missing question id" });
  if (!aDat.author) return res.status(400).json({ message: "missing author name" });
  if (!aDat.content) return res.status(400).json({ message: "missing Answer content" });

  try {
    const question = await Question.findById(aDat.qId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const answer = new Answer(aDat);
    answer.save();
    console.log('Answer is sent');
    res.status(200).json({ message: "answer is sent"});
  } catch (err) {
    res.status(500).send("Internal server error");
  }
}

async function getAnswers(qId, res) {
  try {
    const question = await Question.findById(qId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const answers = await Answer.find({ qId });
    res.status(200).json(answers);
  } catch (err) {
    console.error("error", err);
    res.status(500).send("Internal Server Error");
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

app.get('/api/categories', authenticateToken, async (req, res) => {
  const branches = await loadJSON("branches.json");
  res.json(branches);
});
app.get('/api/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(process.cwd(), "data", filename);

  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).send("File Not Found");
  }
})
app.post('/api/questions/add', authenticateToken, async (req, res) => {
  const qDat = req.body;
  console.log("req body", req.body);
  addQuestion(qDat, res);
});
app.get('/api/questions', authenticateToken, async (req, res) => {
  const questions = await getQuestions();
  res.json(questions);
});
app.get('/api/questions/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  await getQuestion(id, res);
});
app.get('/api/questions/:id/answers', authenticateToken, async (req, res) => {
  const { id } = req.params;
  await getAnswers(id, res);
});

app.post('/api/questions/:qId/reply', authenticateToken, async (req, res) => {
  const { qId } = req.params;
  const { author, content } = req.body;
  
  await addAnswer({ qId, author, content }, res);
});

app.listen(port, () => {
  console.log("server running on port", port);
});
