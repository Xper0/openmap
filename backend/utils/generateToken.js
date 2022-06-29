import jwt from "jsonwebtoken";


const createAccessToken = id => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "1h"
    })
}

export { createAccessToken }