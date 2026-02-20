import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/organize", (req, res) => {
  const { directory } = req.body; // Change `directory` to `directory`

  if (!directory) {
    return res.status(400).json({ message: "Directory path is required." });
  }

  const folders = {
    images: [".jpg", ".jpeg", ".png", ".gif"],
    documents: [".pdf", ".docx", ".txt"],
    media: ["mp4", "mp3"],
  };

  try {
    // Check if the directory exists
    if (!fs.existsSync(directory)) {
      // Change `directory` to `directory`
      return res.status(404).json({ message: "Directory does not exist." });
    }

    // Read the directory
    const files = fs.readdirSync(directory); // Change `directory` to `directory`

    // Organize files
    files.forEach((file) => {
      const filePath = path.join(directory, file); // Change `directory` to `directory`
      const ext = path.extname(file).toLowerCase();

      // Check if the file is a folder or has no extension
      if (fs.statSync(filePath).isDirectory() || !ext) return;

      // Find the folder for the file's extension
      const folder = Object.keys(folders).find((key) =>
        folders[key].includes(ext)
      );

      if (folder) {
        const folderPath = path.join(directory, folder); // Change `directory` to `directory`

        // Create the folder if it doesn't exist
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }

        // Move the file to the folder
        const newFilePath = path.join(folderPath, file);
        fs.renameSync(filePath, newFilePath);
      }
    });
    res.json({ message: "Files organized successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error organizing files: " + error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
