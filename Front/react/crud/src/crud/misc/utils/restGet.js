export async function restGet(url) {
    let result = {
        status: 0,
        data: "",
        error: ""
    }

    try {
        console.log(url);
        if (!url)
            return;
        const response = await fetch(url);
        console.log(response);
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        const data_get = await response.json();
        console.log("response.json:", data_get);
        return data_get;  // Return the data
    } catch (error) {
        console.log(error)
        //console.log(error.message);
    } finally {
        // setLoading(false);
    }
}