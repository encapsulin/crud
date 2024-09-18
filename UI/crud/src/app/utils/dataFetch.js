
export async function dataFetch(url) {
    try {
        // setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data_ = await response.json();
        console.log(data_);
        return data_;  // Return the data
    } catch (error) {
        // setMsgError(error.message);
    } finally {
        // setLoading(false);
    }
}