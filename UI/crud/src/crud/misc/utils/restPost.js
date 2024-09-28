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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log("resp:" + resp);
        result.status = resp.status;

        const respjson = await resp.json();
        console.log("resp.json: ", respjson);
        result.data = respjson.data;

        if (resp.status >= 300) {
            result.error = "API error";
        }

        return result;

    } catch (error) {
        result.status = 500;
        result.error = error.message;
        return result;
    }

    return result;

}
