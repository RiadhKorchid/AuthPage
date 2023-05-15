import User from "../models/User.js"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
export async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        const existe = await User.findOne({ email })
        if (existe) {
            const match = await bcrypt.compare(password, existe.password)
            if (match) {
                const refreshToken = generateRefreshToken({
                    email: existe.email,
                    id: existe._id,
                    name: existe.name,
                    phone: existe.phone
                })

                const cookieOptions = {
                    httpOnly: true,      // set HttpOnly flag
                    maxAge: 30 * 24 * 60 * 60 * 1000,  // set cookie expiry time
                    secure: true,        // set secure flag to ensure cookie is only sent over HTTPS
                    sameSite: 'strict'   // set sameSite flag to 'strict' to prevent CSRF attacks
                };
                res.cookie('refreshToken', refreshToken, cookieOptions);

                return res.status(200).json({
                    msg: "user logged with successfully",
                    token: generateAccessToken(
                        {
                            email: existe.email,
                            id: existe._id,
                            name: existe.name,
                            phone: existe.phone
                        }
                    )
                })
            } else {
                return res.status(401).json({
                    msg: "wrong password !"
                })
            }
        } else {
            return res.status(404).json({
                msg: "user with given email doesn't  exist! "
            })
        }
    } catch (err) {
        return res.status(400).json({
            msg: " error while signIn "
        })
    }
}
export async function signUp(req, res) {
    try {
        const { name, phone, email, password } = req.body;
        console.log(email)
        const exist = await User.findOne({ email: email })
        console.log(exist)
        if (exist) {
            return res.status(400).json({
                msg: "user with the given email already exists"
            })
        } else {
            console.log("ok")
            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await bcrypt.hash(password, salt)
            console.log("hash")
            await User.create({
                name, phone, email, password: hashedPassword
            })
            console.log("user created")
            return res.status(201).json({
                msg: "user created successfully"
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            msg: "error while creating account"
        })
    }

}
function generateAccessToken(payload) {
    return Jwt.sign(payload, "secret123", { expiresIn: "15m" })
}
//

function generateRefreshToken(payload) {
    return Jwt.sign(payload, "secret123")
}