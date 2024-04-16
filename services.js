const fs = require("fs");

const getPages = () => {
  return new Promise((resolve, reject) => {
    fs.readdir("./pages", (err, data) => {
      if (err) {
        console.error("Error reading directory:", err.message);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const formatPages = (pages) => {
  let restricted = ["index.html", "ERROR.html", "404.html"];
  let filtered = pages.filter((page) => !restricted.includes(page));
  return filtered.map((item) => item.split(".")[0]);
};

const readHTML = async (filePath) => {
  try {
    const data = fs.readFileSync("./pages/" + filePath, "utf8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error.message);
    throw error;
  }
};

module.exports = { getPages, formatPages, readHTML };
