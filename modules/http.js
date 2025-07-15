import http from "http";

const app = http.createServer((request, response) => {
    console.log(request.method);
    
    const data = {
        version: "1.0.0",
        name: "MERN Stack",
        status: "Ok",
    };
    // response.writeHead(200, {"content-type":"text/html"})
    response.writeHead(200, {"content-type":"application/json"})
    response.end(JSON.stringify(data));
});

app.listen(5000, () => {
    console.log("Server running at port 5000");
});