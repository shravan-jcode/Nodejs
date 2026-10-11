const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Full request URL:", req.url);
    console.log("HTTP method:", req.method);

    res.end("Check your terminal!");
});

server.listen(8000, () => {
    console.log("Server running on port 8000");
});