import express from "express";
import fs, { rename, renameSync } from "fs";
import { request } from "http";
import path from "path";

const port = 5000;
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.json());

app.post("/organize", (req, res) => {
  const clutterPath = req.body.path;

  let files = fs.readdirSync(clutterPath);

  const folders = {
    Songs: [".mp3", ".wav", ".flac", ".aiff", ".wma", ".pcm", ".m4a"],
    Photos: [".png", ".jpg", ".jpeg", ".tiff", ".gif"],
    Documents: [".pdf", ".doc", ".xls"],
    Zip: [".zip", ".rar"],
    Video: [".mp4", ".mov", ".avi", "wmv", "mkv", ".flv"],
  };

  files.forEach((file) => {
    let ext = path.extname(file);
    Object.keys(folders).find((folder) => {
      if (folders[folder].includes(ext)) {
        if (!fs.existsSync(`${clutterPath}/${folder}`)) {
          fs.mkdirSync(`${clutterPath}/${folder}`, { recursive: true });
        }
        let oldPath = path.join(clutterPath, file);
        let newPath = path.join(clutterPath, folder, file);
        renameSync(oldPath, newPath);
      }
    });
  });
  res.json({ message: "Finished Decluttering!!!!" });
});

app.listen(port, () => {
  console.log("Listening to port: ", port);
});
