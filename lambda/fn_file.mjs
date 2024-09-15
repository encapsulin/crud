import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const fn_file = async (param) => {
    console.log("fn_file()", param);
    //const jsonData = [{'timeFrom':'qwer','timeTo':'asdf','td':'zxcv'}]
    //return jsonData;

    try {
        // Get the current file's directory
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Define the path to your JSON file
        const filePath = path.join(__dirname, param);

        // Read the file asynchronously
        const fileContent = await fs.readFile(filePath, 'utf8');

        // Return the content of the file
        return fileContent;

    } catch (error) {
        console.error('Error reading file:', error);

        // You can choose to return an error message or throw the error
        // if you want the calling function to handle it
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error reading file", error: error.message }),
        };
    }

};
