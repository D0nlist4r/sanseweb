export default function validatePermissionsUser(req, res, next) {
    console.log('Validando permisos del usuario');
    console.log(req.session);
    if (req.session && req.session.user && req.session.user.esAdmin === 1) {
        next();
    } else {
        console.log('No tienes permisos suficientes');
        return res.status(401).json({ message: 'No tienes permisos suficientes', status: false });
    }
}