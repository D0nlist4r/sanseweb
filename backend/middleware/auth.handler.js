import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    if (req.cookies.jwt) {
        try {
            jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        return res.status(403).json({ message: 'Token ha expirado', status: false });
                    }
                    return res.status(403).json({ message: 'Token inválido', status: false });
                }
                req.session.user = user; // Añade los datos del usuario al request{
                next(); // Mover next() aquí, dentro del callback de jwt.verify
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error en el servidor: ' + error, status: false });
        }
    } else {
        return res.status(401).json({ message: 'Token requerido', status: false });
    }
}

export default authenticateToken;
