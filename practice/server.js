const http = require("http");
const fs = require("fs");
const os = require("os");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    fs.readFile("./assets/week1.html", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.method === "GET" && req.url === "/api/info") {
    const info = {
      type: os.type(),
      hostname: os.hostname(),
      cpu_count: os.cpus().length,
      total_memory_mb: Math.round(os.totalmem() / 1024 / 1024),
      uptime_hours: os.uptime() / 3600,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(info) + "\n");
  } else if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }) + "\n");
  } else {
    res.statusCode = 404;
    res.end("Not Found\n");
  }
});

server.listen(3000, "0.0.0.0", () => {
  console.log("server running on port 3000");
});
