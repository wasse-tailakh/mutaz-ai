const fs = require("fs");
const path = require("path");

const projectsDir = path.join(__dirname, "..", "projects");
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir);
}

function saveProject(code) {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `project-${timestamp}.html`;
    const filePath = path.join(projectsDir, fileName);
    fs.writeFile(filePath, code, (err) => {
      if (err) return reject(err);
      resolve(filePath);
    });
  });
}

function getProjects() {
  return new Promise((resolve, reject) => {
    fs.readdir(projectsDir, (err, files) => {
      if (err) return reject(err);
      const projects = files.map((file) => ({
        name: file,
        path: path.join(projectsDir, file),
      }));
      resolve(projects);
    });
  });
}

module.exports = { saveProject, getProjects };
