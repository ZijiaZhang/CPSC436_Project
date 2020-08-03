export class APICallException extends Error{

}

export async function requestAPIJson(endPoint: string,
                                     method: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE' = 'GET',
                                     headers: Record<string,string> = {
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json',
                                     },
                                     body: object|string|undefined = undefined,
                                     errorCallback=alert) {
    try {
        let response =  await fetch(endPoint, {
            method,
            headers,
            body: typeof body ==='object' ? JSON.stringify(body) : body,
        });
        let data = await response.json();
        if (response.status!==200){
            throw new APICallException(data.message);
        }
        return data
    } catch (e) {
        if(e instanceof APICallException) {
            errorCallback(e);
        } else {
            errorCallback('Error when connecting to server')
        }
        throw e;
    }

}
