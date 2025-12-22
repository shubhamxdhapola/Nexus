const saveCookie = (token, res) => {
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

export default saveCookie