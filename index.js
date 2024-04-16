const http = require("http");
const { getPages, formatPages, readHTML } = require("./services");

const port = 3003;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  try {
    let pages = await getPages();
    pages = formatPages(pages);
    const requestedPage = req.url.slice(1);
    if (pages.includes(requestedPage)) {
      const html = await readHTML(`${requestedPage}.html`);
      res.end(html);
    } else if (req.url == "/") {
      const html = await readHTML(`index.html`);
      res.end(html);
    } else {
      let html = await readHTML("404.html");
      res.end(html);
    }
  } catch (error) {
    console.error("Server error:", error.message);
    res.end(await readHTML("ERROR.html"));
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
