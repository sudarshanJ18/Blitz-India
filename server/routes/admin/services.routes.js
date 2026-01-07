const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../../middleware/auth');
const { validateObjectId } = require('../../middleware/validate');
const {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../../controllers/admin/services.controller');


router.use(verifyToken, requireAdmin);


router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', validateObjectId, updateCategory);
router.delete('/categories/:id', validateObjectId, deleteCategory);


router.get('/', getAllServices);
router.get('/:id', validateObjectId, getServiceById);
router.post('/', createService);
router.put('/:id', validateObjectId, updateService);
router.delete('/:id', validateObjectId, deleteService);

module.exports = router;
