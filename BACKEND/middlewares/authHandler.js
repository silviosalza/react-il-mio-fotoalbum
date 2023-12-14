const jsonwebtoken = require("jsonwebtoken")

module.exports = (req,res,next) => {
    //leggere il bearer token dell header della richiesta
    const bearer = req.headers.authorization;

    //controllo bearer
    if(!bearer || !bearer.startsWith("Bearer")){
        throw new Error("Bearer token mancante o errato")
    }
    const token = bearer.split(" ")[1];

    //verificare validità token. Il verify ritorna il payload del token (l'utente)
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET)

    //passare i dati dell'utente alla req in modo che possiamo accederci nei controller
    req["user"] = user

    //next
    next()




}