import  jwt  from "jsonwebtoken";

export const verifyTokenAndGetUser = (token : string, cb: any) => {
    jwt.verify(token, "SECRET", (err, user) => {
        if (err) {
            return cb(false)
        }
        return cb(user)
    })
}