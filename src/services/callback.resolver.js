export function resolver(error) {
    //console.log("Error Log: " + JSON.stringify(error.response));
    if (error) {
        if (error.response) {
            if (error.response.status) {
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
                        if (error.response.config.method === 'head') {
                            alert("Validated ID: Does not exist: " + error.response.config.url);
                            return error.response;
                        } else if (error.response.config.method === 'get') {
                            alert("Error 404: Attempted to GET a nonexistent path: " + error.response.config.url);
                            return error.response;
                        } else if (error.response.config.method === 'put') {
                            alert("Error 404: Unable to UPDATE path: " + error.response.config.url);
                            return error.response;
                        }
                        break;
                    }
                    case 409: {
                        if (error.response.config.method === 'post') {
                            alert("Error 409: Cannot CREATE data that already exists: " + error.response.config.url)
                            return error.response;
                        }
                        break;
                    }
                    case 500: {
                        console.log("Resolver Log: " + JSON.stringify(error.response));
                        if (error.response.config.method === 'post') {
                            alert("Error 500: Internal Server error to CREATE data. Retrying... Please call the Blocnets Help desk.");
                            return error.response;
                        } else if (error.response.config.method === 'get') {
                            alert("Error 500: Internal Server error to GET data. Retrying... Please call the Blocnets Help desk.");
                            return error.response;
                        } else if (error.response.config.method === 'put') {
                            alert("Error 500: Internal Server error to UPDATE data. Retrying... Please call the Blocnets Help desk.");
                            return error.response;
                        }
                        break;
                    }
                    default:
                        return error.response.status;
                }
            } else {
                return error.response;
            }
        }
    } else {
        return error;
    }
}