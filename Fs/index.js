
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        return res.end();
    }

    const log = `${Date.now()}: ${req.url} New Request Received\n`;

    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.error("Error writing log:", err);
            res.statusCode = 500;
            return res.end("Internal Server Error");
        }

        const myUrl = url.parse(req.url, true);

        switch (myUrl.pathname) {
            case "/":
                res.end("Home Page");
                break;

            case "/about":
                res.end("About Page");
                break;

            case "/contact":
                res.end("Contact Page");
                break;

            default:
                res.statusCode = 404;
                res.end("404 Page Not Found");
        }
    });
});

myServer.listen(8000, () => {
    console.log("Server started at http://localhost:8000");
});
