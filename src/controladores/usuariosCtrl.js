import {conmysql} from '../db.js'

export const getUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuarios')
        res.json(result)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar usuarios"})
    }
}

export const getUsuarioxId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuarios WHERE IdUsuario = ?', [req.params.id])
        if (result.length <= 0) return res.status(404).json({
            IdUsuario: 0,
            message: "Usuario no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message: 'Error de lado del servidor'})        
    }
}

export const postUsuario = async (req, res) => {
    try {
        const {IdFamilia, IdRol, Nombre, Correo, Contrasena} = req.body
        console.log(req.body);
        const [result] = await conmysql.query(
            'insert into usuarios(IdFamilia, IdRol, Nombre, Correo, Contrasena) values(?, ?, ?, ?, ?)',
            [IdFamilia, IdRol, Nombre, Correo, Contrasena]);
        res.send({id:result.insertId,})
    } catch(error) {
        return res.status(500).json({message: 'Error al crear usuario',
            error: error.message,
        })
    }
}

export const putUsuario = async (req, res) => {
    try {
        const {id} = req.params
        const {IdFamilia, IdRol, Nombre, Correo, Contrasena} = req.body
        
        const [result] = await conmysql.query(
            'UPDATE usuarios SET IdFamilia = ?, IdRol = ?, Nombre = ?, Correo = ?, Contrasena = ? WHERE IdUsuario = ?',
            [IdFamilia, IdRol, Nombre, Correo, Contrasena, id]
        )

        if(result.affectedRows <= 0) return res.status(404).json({
            message: "Usuario no encontrado"
        })  
        
        const [rows] = await conmysql.query('SELECT * FROM Usuarios WHERE IdUsuario = ?', [id])
        res.json(rows[0])
    } catch(error) {
        return res.status(500).json({message: 'Error al actualizar usuario'})
    }
}

export const patchUsuario = async (req, res) => {
    try {
        const {id} = req.params
        const {IdFamilia, IdRol, Nombre, Correo, Contrasena} = req.body
        
        const [result] = await conmysql.query(
            'UPDATE Usuarios SET ' +
            'IdFamilia = IFNULL(?, IdFamilia), ' +
            'IdRol = IFNULL(?, IdRol), ' +
            'Nombre = IFNULL(?, Nombre), ' +
            'Correo = IFNULL(?, Correo), ' +
            'Contrasena = IFNULL(?, Contrasena) ' +
            'WHERE IdUsuario = ?',
            [IdFamilia, IdRol, Nombre, Correo, Contrasena, id]
        )

        if(result.affectedRows <= 0) return res.status(404).json({
            message: "Usuario no encontrado"
        })  
        
        const [rows] = await conmysql.query('SELECT * FROM Usuarios WHERE IdUsuario = ?', [id])
        res.json(rows[0])
    } catch(error) {
        return res.status(500).json({message: 'Error al actualizar usuario'})
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM Usuarios WHERE IdUsuario = ?', [req.params.id])
        if (rows.affectedRows <= 0) return res.status(404).json({
            id: 0,
            message: 'No se pudo eliminar el usuario'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: "Error de lado del servidor"
        })
    }
}