// controllers/novedadesController.js
import NovedadesService from '../services/novedades.services.js';
const novedadesService = new NovedadesService();

/**
 * Obtiene las novedades de un usuario específico.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const getNovedadesByUser = async (req, res, next) => {
    try {
        const id_usuario = req.params.id_usuario;
        const userIdFromToken = req.session.user.userId; // Asumiendo que guardas el id_usuario en la sesión
        if (id_usuario !== userIdFromToken) {
            return res.status(403).json({ status: false, message: 'Acceso no autorizado' });
        }
        // Obtener limit y offset de los query parameters
        let { limit, offset } = req.query;
        limit = limit ? parseInt(limit) : 10; // Valor por defecto si no se proporciona: 10
        offset = offset ? parseInt(offset) : 0; // Valor por defecto si no se proporciona: 0
        let response = await novedadesService.findInTable(
            ['*'],
            { id_usuario: id_usuario },
            'fecha_novedad DESC',
            limit,
            offset
        );
        res.status(200).json({
            status: true,
            message: "Novedades encontradas correctamente",
            data: response.data,
            total: response.total, // Incluye el total en la respuesta
            limit: limit,
            offset: offset,
        });
    } catch (error) {
        next(error);
    }
};


/**
 * Marca una novedad como leída.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const markNovedadAsRead = async (req, res, next) => {
    try {
        const { id_novedad } = req.params;
        let updateData = { leida: 1 }; // Marcar como leída
        let searchData;
        if(id_novedad == 0){ // todas las novedades pendientes
            searchData = { leida: 0 };
        }else{
            searchData = { id_novedad: id_novedad };
        }
        console.log('searchData:', searchData);
        console.log('updateData:', updateData);
        let response = await novedadesService.updateByCriterio(searchData, updateData);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export { getNovedadesByUser, markNovedadAsRead };
