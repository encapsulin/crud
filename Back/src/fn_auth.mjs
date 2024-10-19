// https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-integrate-apps.html#amazon-cognito-authentication-with-sdks

const config = await import('./config_auth.json', { assert: { type: 'json' } });

// export function fn_auth(uid, pwd) {
//     if (uid === config.default.uid && pwd === config.default.pwd)
//         return config_auth.jwt;
//     else return false;
// }

// export function fn_auth_token_validate(token_) {
//     if (token_ === undefined || token_ !== config.default.jwt)
//         throw new Error("401 Unauthorized");
// }

///////////////////////////////////////////////////////

import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export const cognitoClient = new CognitoIdentityProviderClient({
    region: config.default.region,
});

export const fn_auth = async (username, password) => {
    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: config.default.clientId,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
    };
    try {
        const command = new InitiateAuthCommand(params);
        const { AuthenticationResult } = await cognitoClient.send(command);
        if (AuthenticationResult) {
            // sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
            // sessionStorage.setItem(
            //     "accessToken",
            //     AuthenticationResult.AccessToken || "",
            // );
            // sessionStorage.setItem(
            //     "refreshToken",
            //     AuthenticationResult.RefreshToken || "",
            // );
            console.log(AuthenticationResult);
            //AccessToken,ExpiresIn: 3600,IdToken,RefreshToken,TokenType: 'Bearer'
            return AuthenticationResult.IdToken || "";
        }
    } catch (error) {
        console.error("Error signing in: ", error);
        //throw error;
        return false;
    }
};

////////////////////////////////////////////////////////////

//fn_auth("demo2", "a37f6018-f42f-432b-bF02-eda9!f58b7a")
// {
//     AccessToken: 'eyJraWQiOiJYVWxqZ0lKVUUydjArRVJWUTVtaXhuMmJvWlFqR2M2Z3dQT09FUUEzRjNrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0NGI4OTQxOC1jMDMxLTcwZTMtNGI2OC0yMTA4YjU4ZmMyYmMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV91V2xiUkY0TjIiLCJjbGllbnRfaWQiOiIzZnRvZDYwMnNnYW9wbjg4M200MzVobmVtMCIsIm9yaWdpbl9qdGkiOiI4NWI4YTI1Yy03ZDY1LTRjMTUtYWZlZi04M2Y4NjQ5ZjUyNjUiLCJldmVudF9pZCI6IjIwYWMwNjVkLWY1ZTctNDFjMS04OGU2LTY3MWI0N2YyZDcxNCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MjkzMzA4ODYsImV4cCI6MTcyOTMzNDQ4NiwiaWF0IjoxNzI5MzMwODg2LCJqdGkiOiI3MjI0YzA3ZC03YWYxLTRiMjUtYWNkYi05MmE1YTgyMjQ5Y2UiLCJ1c2VybmFtZSI6ImRlbW8yIn0.tQ1Uhtk37jwe0vRRLVFJIkcpexuMqRCPB4wSrhM8vO3KqpVYAltzH1t0f4I60nA3Cl6f4BPK7m5Pqhokg6abGdqIhhb5nmLpB_xBqgmagF01kK_rk9AWXIFofMWobkRzK2I7Re-8TgYh96ipDeb59qDeGQaWmIwMA_cTZxxVWA2O7qcxj84PpoUDBcwlbltviM8AgXOsU7ehYDyJrvf8pCUqqSGXVx2_XKR5HLeBumvOaDgN6vG0xRiPdF4D6gGolrJYPM52MzFzKey277sl2_0Xg1q6VWtkOzW3qVrUO206D-O-dx4QrUtcxi7U239xnQIV6HyzEzNW50YYzaP9Qg',
//     ExpiresIn: 3600,
//     IdToken: 'eyJraWQiOiJQN1pWeEU1MjNCTTg2RUk0eURrZGQ1RTY1NlpKUFNlVWlXZVRDaUtoMnhJPSIsImFsZyI6IlJTMjU2In0.eyJvcmlnaW5fanRpIjoiODViOGEyNWMtN2Q2NS00YzE1LWFmZWYtODNmODY0OWY1MjY1Iiwic3ViIjoiNDRiODk0MTgtYzAzMS03MGUzLTRiNjgtMjEwOGI1OGZjMmJjIiwiYXVkIjoiM2Z0b2Q2MDJzZ2FvcG44ODNtNDM1aG5lbTAiLCJldmVudF9pZCI6IjIwYWMwNjVkLWY1ZTctNDFjMS04OGU2LTY3MWI0N2YyZDcxNCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzI5MzMwODg2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV91V2xiUkY0TjIiLCJjb2duaXRvOnVzZXJuYW1lIjoiZGVtbzIiLCJleHAiOjE3MjkzMzQ0ODYsImlhdCI6MTcyOTMzMDg4NiwianRpIjoiYTYzOTI4NDAtNWQyNy00ZWJhLWJlYjktZjRiMzVjOTUwYjViIn0.rII0-05pDfzp1Oa9o5KzqpC3zvtZYce82GZWBgYkoDhIEHANzmMlBKqONl_8MHZKGZ1_AhtJZ2NXQBCaYZonxOIbg1oGgQX1OkX6gMfOsnpS9dbzcu23F7s-InJhEreUGtWvezF7c3obh1OzpXJv1JaPIncjSQ7pIrgaJKqhce6bvIfG606KTqG91OWudZqSI4Wkl4ImrgWwAPxpnBQOWvRxftuyv8jaP5qPnz5mbkkredUm1ZrkaHhORnbngnqkTzIS8g0zo0H8Do8ObdNtxm23Nxv7riYdJzeeJ46_zOw7HEM0DoD6i3P701EkDgyXW8Gu6VfwbWo1bBAYtACGmQ',
//     RefreshToken: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.k_IztLVJYp0b15txrL_m3uFou3DANosT_LltURPZDbijA9EgXuBBfQjNzSJ7TqtAcY7Ho8vxDbrveVto9tkGXYPpsBq9H39115Emng-0HP51TwOGDan1TylySdSWj5YmBF4uvkaKDhe9ooY1CJPlJj4_2FCOKT0d-cAloPHAVSXKq2OFTjh_FVLggc9znBJvN8SyNTuuIqptt167CRCgYqSLxEheyjLAWHTjE-f6r57ho3F-VwoZBx7dxah5ur7-yB9-b0YWqRzG35Kj-FN0lfcYYWmTCbeC51TjLPMeyRY5jNoPoShceJwI43PsASEITSlQfTh-ygx1I9TZ75IJmg.FKeD79vFl-UQ5AP5.pYvuX-vaMkhG5ilW6fEVgCdZJyB0HNVUblGCqy-Cy73EPTueCJYsQM-_ECGLRbkTZPkLpQ3-m0FsorrVOQOeOtWadxIyJccUFmOi_I9QAR1lH4rtFd1SloE-N-jUj8H1wibVI69XRNgr6I9I80sWy0IFyerK7j_6j8-zE4hM2LkKDHRnRvzrF3WrfcZLzbUP0khX8lmjLjSalhdBdu4LQgbBzsGbZKKDKdBORhTp2ESRLBYySRmVQVvpfXgRUqxBs4e1YFNXkPghAgELC3AcP4ZSipFJA4w6mc3icjCKW6MFERXo_yRGx6v4zAdU5fkKZ5YaThXyLB_evGTWDh2tddykbve-YDualqJ7AVlFldVZcptQrsvEBm_icdu9IA5WgHx07JI6PUS7pAm-xuoBkCR1387g9btR5HK-vjUp9LDpFpVS5_oxOCRjn4SDh0IhNYuTdlgDjbgcC6cCdMIFIPJzzXCcTdeH9qFkOu-cOucjt-b4rZ0T73-_Cv7-KLAhLclKQeOZkeE7xVuK9BwZnO5Jk5EwCdbMebx65HW5tEOZzebhxuRFHE9axZ_9a4g2mgBEFb27PsoliDKM57HliZnPWgs4pR9oLROfx-iH31UdSimfVtIMg9NuEcO_58KjpB1_tX5Z4zEyBUxkZWTlNdAAv0FYy80m-NyIkSpONGbGXpgZFzNAtBhb4IbE35FoqS7W40hexcxMdn3vrj70sR75ouPFlpRoOgPl1IaiPbYmy1kLdc5YWRFQUSVYTbSooEQ51KMrKpWGd-Vilfa9btXHlxN60pwkRKv8JJw5IHipWZWnp4y73wKL6BqzQaKHcv7g06R7Nu0oYRhmZNe3uzY-H-2vnPIkXZef0ufXGBE9ti3OGTMqDE7Y-XK4sgut_NJh-e9RvsfrBH40PBDckbkTRZuadiquXKlKbOX6va6glFJFlPfz8WEGkreL7NmIyR6dlTDtyE-6r62ECuW5nHqKTFk6CbZA-O0cwSS_gH-vtHmKJgGAVd0qxT9tVchkdjTVwQei73m-bBLIHQ5upqbwd2XLYLIWTFsSW9f5EzvT6MCik8bnDcgsoKuAj5hgRwETQ-2PbnFmsHgnvUVrEWeRjFsPF_BfuJvOEuieZ4OtdSKuO9vrCzySPCnAlt7vNU0t-Kh2IZ5IBA2SjtkKSq6aSsHeoHxxiY0Inctalc8GhrsfiZElmOhOFWxWD8iDkb6hH80YpebtN0bfGkCMSgZGfryJ9G0e4QbR7C6zhd3tajdZvzd9aEV1E05N40cFA71JUpk.TDyPPIkol-3r_HNj3kdTKA',
//     TokenType: 'Bearer'
//   }

// const AccessToken = 'eyJraWQiOiJYVWxqZ0lKVUUydjArRVJWUTVtaXhuMmJvWlFqR2M2Z3dQT09FUUEzRjNrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0NGI4OTQxOC1jMDMxLTcwZTMtNGI2OC0yMTA4YjU4ZmMyYmMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV91V2xiUkY0TjIiLCJjbGllbnRfaWQiOiIzZnRvZDYwMnNnYW9wbjg4M200MzVobmVtMCIsIm9yaWdpbl9qdGkiOiI4NWI4YTI1Yy03ZDY1LTRjMTUtYWZlZi04M2Y4NjQ5ZjUyNjUiLCJldmVudF9pZCI6IjIwYWMwNjVkLWY1ZTctNDFjMS04OGU2LTY3MWI0N2YyZDcxNCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MjkzMzA4ODYsImV4cCI6MTcyOTMzNDQ4NiwiaWF0IjoxNzI5MzMwODg2LCJqdGkiOiI3MjI0YzA3ZC03YWYxLTRiMjUtYWNkYi05MmE1YTgyMjQ5Y2UiLCJ1c2VybmFtZSI6ImRlbW8yIn0.tQ1Uhtk37jwe0vRRLVFJIkcpexuMqRCPB4wSrhM8vO3KqpVYAltzH1t0f4I60nA3Cl6f4BPK7m5Pqhokg6abGdqIhhb5nmLpB_xBqgmagF01kK_rk9AWXIFofMWobkRzK2I7Re-8TgYh96ipDeb59qDeGQaWmIwMA_cTZxxVWA2O7qcxj84PpoUDBcwlbltviM8AgXOsU7ehYDyJrvf8pCUqqSGXVx2_XKR5HLeBumvOaDgN6vG0xRiPdF4D6gGolrJYPM52MzFzKey277sl2_0Xg1q6VWtkOzW3qVrUO206D-O-dx4QrUtcxi7U239xnQIV6HyzEzNW50YYzaP9Qg'
// import jwt from 'jsonwebtoken';
// const decoded = jwt.decode(AccessToken, { complete: true });
// console.log(decoded);
// {
//     header: { kid: 'XUljgIJUE2v0+ERVQ5mixn2boZQjGc6gwPOOEQA3F3k=', alg: 'RS256' },
//     payload: {
//       sub: '44b89418-c031-70e3-4b68-2108b58fc2bc',
//       iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_uWlbRF4N2',
//       client_id: '3ftod602sgaopn883m435hnem0',
//       origin_jti: 'efc1ee3b-bcae-405a-98eb-6297d118c46a',
//       event_id: '53b82560-77de-441b-9726-daa1b81daefb',
//       token_use: 'access',
//       scope: 'aws.cognito.signin.user.admin',
//       auth_time: 1729287981,
//       exp: 1729291580,
//       iat: 1729287981,
//       jti: 'a98e9c57-3847-4f9c-9e70-c4aa7017488e',
//       username: 'demo2'
//     },
//     signature: 'Fv9euWAtanFu0BE2jGs0PoTe-qo7i-QtXELWdQmFjQ0TpYhRQwWUnsp7LK5ehXwogs82UyTBxw2xw4j0nD-Fqd04ufu9_nwkqPhglOxu-o-Pq2-i4v0XzZa8qyD8-HNsA6nCJvwCM9pV5HwUZPqbYGVrVIbmB3aXO0D5SONjhK01KFZlXOMmSGsX6NMLUNzhsrMRTcfNmJQArUNsSvWWeucmhYomzebHnQH4oQ-zd-R8dMGeg3mhMc_KrHNAu_cLb70rYQRxs3ByP8mGFahBUmTQQBWTwsaGLKCsWTo4ite-uEsq2iyLTWidfjZ5Kc4FEn3AR1faMLPJibEPjPqRmg'
//   }
