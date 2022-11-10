const http = require("http");
/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */

const requestListener = (request, response) => {
    // response.setHeader("Content-Type", "text/html");
    response.setHeader("Content-Type", "application/json");
    response.setHeader("X-Powered-By", "NodeJS");
    // response.statusCode = 200;

    const { method, url } = request;

    if (url === "/") {
        if (method == "GET") {
            response.statusCode = 200;
            response.end(
                JSON.stringify({
                    message: "Ini adalah homepage",
                })
            );
        } else {
            response.statusCode = 400;
            response.end(
                JSON.stringify({
                    message: `Halaman tidak dapat diakses dengan ${method} request!`,
                })
            );
        }
    } else if (url === "/about") {
        if (method == "GET") {
            response.statusCode = 200;
            response.end(
                JSON.stringify({
                    message: "<h1>Halo! Ini adalah halaman about</h1>",
                })
            );
        }

        if (method == "POST") {
            let body = [];

            request.on("data", (chunk) => {
                body.push(chunk);
            });

            request.on("end", () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(
                    JSON.stringify({
                        message: `<h1>Hai ${name}! Ini adalah halaman about!</h1>`,
                    })
                );
            });
        } else {
            response.statusCode = 400;
            response.end(
                JSON.stringify({
                    message: `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`,
                })
            );
        }
    } else {
        response.statusCode = 400;
        response.end(
            JSON.stringify({
                message: "Halaman tidak ditemukan!",
            })
        );
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});
// curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Dicoding\"}"