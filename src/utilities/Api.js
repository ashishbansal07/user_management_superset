const buildQueryString = (queryObject) => {
    let queryString = "?";

    for(let key in queryObject) {
        if(queryObject[key] !== "" && queryObject[key] !== undefined && queryObject[key] !== null)
            queryString = `${queryString}&${key}=${queryObject[key]}`;
    }
    return queryString;
}

const handleAPIErrors = (response) => {
  const {status} = response;
  switch (status) {
    case 401: 
      return {status: 401, message: "Unauthorized access"};
    case 500:
      return {status: 500, message: "Something went wrong"};
    case 403:
      return {status: 403, message: "Forbidden Access"};
    default:
      return {status: status, message: "Something went wrong"};
  }
};

const Api = {
    get: async (options) => {
        const { headers, url, queryObject, requestBody} = options;
        let updatedUrl = url + buildQueryString(queryObject);
        try {
          let updatedHeaders = {
            "Content-Type": "application/json",
            ...headers
          };

          const response = await fetch(updatedUrl, {
            method: "GET",
            cache: "no-cache",
            headers: updatedHeaders,
            body: JSON.stringify(requestBody),
          });
          if (!response.ok || response.status !== 200) {
            throw response;
          }
          return response.json();
        }catch(error) {
          const errorResponse = handleAPIErrors(error);
          throw errorResponse;
        }
        
    },
    
    post: async (options) => {
      const { headers, url, queryObject, requestBody} = options;
        let updatedUrl = url + buildQueryString(queryObject);
        try {
          let updatedHeaders = {
            "Content-Type": "application/json",
            ...headers
          };

          const response = await fetch(updatedUrl, {
            method: "POST",
            cache: "no-cache",
            headers: updatedHeaders,
            body: JSON.stringify(requestBody),
          });
          if (!response.ok || response.status !== 200) {
            throw response;
          }
          return response.json();
        }catch (error) {
          const errorResponse = handleAPIErrors(error);
          throw errorResponse;
        }
        
    }
}

export default Api;

/**
 * const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
 */