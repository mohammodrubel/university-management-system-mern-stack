import jwt from 'jsonwebtoken'
// Create token function
const createToken = (jwtPayload: { id: string; role: string }, secretKey: string, expiresIn: string) => {
    return jwt.sign(jwtPayload, secretKey, { expiresIn });
};


export default createToken 