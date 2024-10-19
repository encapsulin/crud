import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

const config = await import('./config_auth.json', { assert: { type: 'json' } });
const userPoolId = config.default.userPoolId;
const region = config.default.region;
const clientId = config.default.clientId;

const jwksClient = jwksRsa({
    jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
});

function getKey(header, callback) {
    jwksClient.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}
async function validateAccessToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getKey, {
            audience: clientId,  // The audience expected from the token (App Client ID)
            issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
        }, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

export async function fn_auth_token_validate(token_) {
    //     if (token_ === undefined || token_ !== config.default.jwt)
    //         throw new Error("401 Unauthorized");
    try {
        const result = await validateAccessToken(IdToken);
        console.log("result:", result);
        // {
        //     origin_jti: '85b8a25c-7d65-4c15-afef-83f8649f5265',
        //     sub: '44b89418-c031-70e3-4b68-2108b58fc2bc',
        //     aud: '3ftod602sgaopn883m435hnem0',
        //     event_id: '20ac065d-f5e7-41c1-88e6-671b47f2d714',
        //     token_use: 'id',
        //     auth_time: 1729330886,
        //     iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_uWlbRF4N2',
        //     'cognito:username': 'demo2',
        //     exp: 1729334486,
        //     iat: 1729330886,
        //     jti: 'a6392840-5d27-4eba-beb9-f4b35c950b5b'
        //   }
        return true;
    } catch (error) {
        console.log("error:", error)
        //error: JsonWebTokenError: invalid token
        throw error;
    }
}

//const IdToken = 'eyJraWQiOiJQN1pWeEU1MjNCTTg2RUk0eURrZGQ1RTY1NlpKUFNlVWlXZVRDaUtoMnhJPSIsImFsZyI6IlJTMjU2In0.eyJvcmlnaW5fanRpIjoiODViOGEyNWMtN2Q2NS00YzE1LWFmZWYtODNmODY0OWY1MjY1Iiwic3ViIjoiNDRiODk0MTgtYzAzMS03MGUzLTRiNjgtMjEwOGI1OGZjMmJjIiwiYXVkIjoiM2Z0b2Q2MDJzZ2FvcG44ODNtNDM1aG5lbTAiLCJldmVudF9pZCI6IjIwYWMwNjVkLWY1ZTctNDFjMS04OGU2LTY3MWI0N2YyZDcxNCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzI5MzMwODg2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV91V2xiUkY0TjIiLCJjb2duaXRvOnVzZXJuYW1lIjoiZGVtbzIiLCJleHAiOjE3MjkzMzQ0ODYsImlhdCI6MTcyOTMzMDg4NiwianRpIjoiYTYzOTI4NDAtNWQyNy00ZWJhLWJlYjktZjRiMzVjOTUwYjViIn0.rII0-05pDfzp1Oa9o5KzqpC3zvtZYce82GZWBgYkoDhIEHANzmMlBKqONl_8MHZKGZ1_AhtJZ2NXQBCaYZonxOIbg1oGgQX1OkX6gMfOsnpS9dbzcu23F7s-InJhEreUGtWvezF7c3obh1OzpXJv1JaPIncjSQ7pIrgaJKqhce6bvIfG606KTqG91OWudZqSI4Wkl4ImrgWwAPxpnBQOWvRxftuyv8jaP5qPnz5mbkkredUm1ZrkaHhORnbngnqkTzIS8g0zo0H8Do8ObdNtxm23Nxv7riYdJzeeJ46_zOw7HEM0DoD6i3P701EkDgyXW8Gu6VfwbWo1bBAYtACGmQ'
//await fn_auth_token_validate(IdToken);