import { JwtPayload, SignOptions } from "jsonwebtoken";
import { Response } from "express";
import { jwtUtils } from "./jwt";
import { envVars } from "../../config/env";
import { cookieUtils } from "../routes/cookie";

const getAccessToken = (paylod: JwtPayload) => {
    const AccessToken = jwtUtils.createToken(paylod, envVars.ACCESS_TOKEN_SECRET, { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN } as SignOptions)
    return AccessToken
}

const getRefreshToken = (paylod: JwtPayload) => {
    const RefreshToken = jwtUtils.createToken(paylod, envVars.REFRESH_TOKEN_SECRET, { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN } as SignOptions)
    return RefreshToken
}
const setAccessTokenCookie = (res: Response, token: string) => {
    cookieUtils.setCookie(res, 'accessToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 24 * 60
    })
}

const setRefreshtokenCookie = (res: Response, token: string) => {
    cookieUtils.setCookie(res, 'refreshToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 24 * 60 * 7
    })
}

const setBetterAuthSessionCookie = (res: Response, token: string) => {

    cookieUtils.setCookie(res, 'better-auth.session_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 24 * 60
    })
}



export const tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshtokenCookie,
    setBetterAuthSessionCookie
}