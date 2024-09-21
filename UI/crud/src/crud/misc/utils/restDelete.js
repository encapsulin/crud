export async function restDelete(url) {
    let result = {
        status: 0,
        data: "",
        error: ""
    }

    if (!window.confirm('Are you sure?'))
        return result;

    try {
        const resp = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(resp)
        if (resp.status !== 200 || !resp.ok) {
            result.status = resp.status;
            result.error = "API error, try again in a minute";
            return result;
        }

        const dataResp = await resp.json()
        console.log("dataResp.body: ", dataResp.body)
        if (dataResp.body === "Unauthorized") {
            result.status = 401;
            result.error = dataResp.body;
            return result;
        }

        result.status = resp.status;
        return result;

    } catch (error) {
        result.status = 400;
        result.error = error.message;
        return result;
    }

    return result;
}