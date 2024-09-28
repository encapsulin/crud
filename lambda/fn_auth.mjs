const auth = { uid: "demo1", pwd: "fa23-8d20-41b0-aw4" }
const jwt = "46068b06-db78-46dc-b929-9109185278b4";

export function fn_auth(uid, pwd) {
    if (uid === auth.uid && pwd === auth.pwd)
        return jwt;
    else return false;
}

export function fn_auth_token_valid(token_) {
    return token_ !== undefined && token_ === jwt;
}

