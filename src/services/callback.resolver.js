export function resolver(error) {
    switch (error.response.status) {
        case 500: {
            console.log("Resolver Log: " + JSON.stringify(error.response));
            if (error.response.config.method === "post") {
                return "Error: " + 500 + " unable to CREATE data. Try again."
            } else if (error.response.config.method === "get") {
                return "Error: " + 500 + " unable to READ data. Try again."
            } else if (error.response.config.method === "put") {
                return "Error: " + 500 + " unable to UPDATE data. Try again."
            }
            break;
        }
        default:
            return false;
    }
}