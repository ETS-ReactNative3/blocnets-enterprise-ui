export function resolver(error) {
    console.log(error.response);
    switch (error.response.status) {
        case undefined: {
            error.response.status = 401
            alert("Error 401: Unauthorized. Please sign into your SAP Hyperledger Fabric Dashboard");
            return error.response;
        }
        case 401: {
            alert("Error 401: Unauthorized. Please sign into your SAP Hyperledger Fabric Dashboard");
            return error.response;
        }
        case 404: {
            alert("Error 404: Unable to find path: " + error.response.config.url);
            return error.response;
        }
        case 409: {
            alert("Error 409: Path already exists: " + error.response.config.url);
            return error.response;
        }
        case 500: {
            console.log("Resolver Log: " + JSON.stringify(error.response));
            if (error.response.config.method === "post") {
                alert("Error Status of 500: Internal Server error to CREATE data. Retrying... Please call the Blocnets Help desk.");
                return error.response;
            } else if (error.response.config.method === "get") {
                alert("Error Status of 500: Internal Server error to GET data. Retrying... Please call the Blocnets Help desk.");
                return error.response;
            } else if (error.response.config.method === "put") {
                alert("Error Status of 500: Internal Server error to UPDATE data. Retrying... Please call the Blocnets Help desk.");
                return error.response;
            }
            break;
        }
        default:
            return error.response;
    }
}