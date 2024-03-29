const routes = [
    {
        method: "GET",
        path: "/",
        handler: (request, h) => {
            return "Homepage";
        },
    },
    {
        method: "*",
        path: "/",
        handler: (request, h) => {
            return "Halaman tidak dapat diakses dengan method tersebut";
        },
    },
    {
        method: "GET",
        path: "/about",
        handler: (request, h) => {
            return "About page";
        },
    },
    {
        method: "*",
        path: "/about",
        handler: (request, h) => {
            return "Halaman tidak dapat diakses dengan method";
        },
    },
    {
        method: "GET",
        path: "/hello/{username?}",
        handler: (request, h) => {
            const { username = "stranger" } = request.params;
            const { langg } = request.query;

            if (langg === "id") {
                return `Hai, ${username}`;
            }
            return `Hello, ${username}!`;
        },
    },
    {
        method: "POST",
        path: "/login",
        handler: (request, h) => {
            const { username, password } = request.payload;
            return `Welcome ${username}!`;
        },
    },
    {
        method: "POST",
        path: "/user",
        handler: (request, h) => {
            return h.response('created').code(201);
        },
    },
    {
        method: "*",
        path: "/{any*}",
        handler: (request, h) => {
            return "Halaman tidak dapat ditemukan";
        },
    },
];

module.exports = routes;
