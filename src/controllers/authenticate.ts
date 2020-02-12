import jsonwebtoken  from 'jsonwebtoken'
import {Response,Request,NextFunction} from 'express'

export const auth = (req: any, res: Response, next: NextFunction) => {
    const token = req?.headers['x-auth-users'] as string;
    if (!token) {
        return res.status(404).send({val:"send token headers"})
    }
    try {
        const decode = jsonwebtoken.verify(token, <string>process.env.JWTTOKEN)
        req.user = decode
        return next( );
    } catch (error) {
            return res.status(404).send({val:"bad request, token doesnt exist"})
        }

}