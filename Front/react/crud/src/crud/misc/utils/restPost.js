import { authTokenLocalStorageGet } from '../auth/Auth'

export async function restPost(url, data) {
    console.log("restPost:", data)
    let result = {
        status: 0,
        data: "",
        error: ""
    }

    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authTokenLocalStorageGet()
            },
            body: JSON.stringify(data)
        });

        console.log("resp:" + resp);
        result.status = resp.status;

        const respjson = await resp.json();
        console.log("resp.json: ", respjson);
        result.data = respjson.data;

        if (resp.status >= 500) {
            result.error = "Server error";
        } else if (resp.status >= 400) {
            result.error = "Client error";
        } else if (resp.status >= 300) {
            result.error = "Redirection";
        } else if (resp.status >= 200) {
            result.error = "";
        }
        if (resp.status === 401)
            result.error = "Unauthorized";
        if (resp.status === 403)
            result.error = "Forbidden";

        return result;

    } catch (error) {
        result.status = 500;
        result.error = error.message;
        return result;
    }

    return result;

}
