import Branch from "../models/Branch.js";

export const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    if (!branch) return res.status(404).json({ message: "branch not found"});

    res.json(branches);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}
