import {conmysql} from '../db.js'

export const getTareas = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Tareas')
        res.json(result)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar tareas"})
    }
}

export const getTareaxId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Tareas WHERE IdTarea = ?', [req.params.id])
        if (result.length <= 0) return res.status(404).json({
            IdTarea: 0,
            message: "Tarea no encontrada"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message: 'Error de lado del servidor'})        
    }
}

export const postTarea = async (req, res) => {
    try {
        const {Titulo, Descripcion, Prioridad, Frecuencia} = req.body
        const [rows] = await conmysql.query(
            'INSERT INTO Tareas (Titulo, Descripcion, Prioridad, Frecuencia) VALUES (?, ?, ?, ?)',
            [Titulo, Descripcion, Prioridad, Frecuencia]
        )
        res.status(201).json({
            id: rows.insertId,
            Titulo,
            Prioridad
        })
    } catch(error) {
        return res.status(500).json({message: 'Error al crear tarea'})
    }
}

export const putTarea = async (req, res) => {
    try {
        const {id} = req.params
        const {Titulo, Descripcion, Prioridad, Frecuencia} = req.body
        
        const [result] = await conmysql.query(
            'UPDATE Tareas SET Titulo = ?, Descripcion = ?, Prioridad = ?, Frecuencia = ? WHERE IdTarea = ?',
            [Titulo, Descripcion, Prioridad, Frecuencia, id]
        )

        if(result.affectedRows <= 0) return res.status(404).json({
            message: "Tarea no encontrada"
        })  
        
        const [rows] = await conmysql.query('SELECT * FROM Tareas WHERE IdTarea = ?', [id])
        res.json(rows[0])
    } catch(error) {
        return res.status(500).json({message: 'Error al actualizar tarea'})
    }
}

export const patchTarea = async (req, res) => {
    try {
        const {id} = req.params
        const {Titulo, Descripcion, Prioridad, Frecuencia} = req.body
        
        const [result] = await conmysql.query(
            'UPDATE Tareas SET ' +
            'Titulo = IFNULL(?, Titulo), ' +
            'Descripcion = IFNULL(?, Descripcion), ' +
            'Prioridad = IFNULL(?, Prioridad), ' +
            'Frecuencia = IFNULL(?, Frecuencia) ' +
            'WHERE IdTarea = ?',
            [Titulo, Descripcion, Prioridad, Frecuencia, id]
        )

        if(result.affectedRows <= 0) return res.status(404).json({
            message: "Tarea no encontrada"
        })  
        
        const [rows] = await conmysql.query('SELECT * FROM Tareas WHERE IdTarea = ?', [id])
        res.json(rows[0])
    } catch(error) {
        return res.status(500).json({message: 'Error al actualizar tarea'})
    }
}

export const deleteTarea = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM Tareas WHERE IdTarea = ?', [req.params.id])
        if (rows.affectedRows <= 0) return res.status(404).json({
            id: 0,
            message: 'No se pudo eliminar la tarea'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: "Error de lado del servidor"
        })
    }
}