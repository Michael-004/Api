import { Router } from "express";
import { getAsignaciones, getAsignacionxId, postAsignacion, putAsignacion, patchAsignacion, deleteAsignacion } from '../controladores/asignacionesCtrl.js'
const router=Router();

router.get('/asignaciones', getAsignaciones)
router.get('/asignaciones/:id', getAsignacionxId)
router.post('/asignaciones', postAsignacion)
router.put('/asignaciones/:id', putAsignacion)
router.patch('/asignaciones/:id', patchAsignacion)
router.delete('/asignaciones/:id', deleteAsignacion)

export default router