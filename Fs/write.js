const fs = require("fs");


// Asynchronous
fs.writeFile("hello.txt", "Hello World", (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Async file created successfully");
});


// Synchronous
fs.writeFileSync("hellosync.txt", "Hello World");

console.log("Sync file created successfully");

const buffer = Buffer.from("Hello");

console.log(buffer);
console.log(buffer.toString());