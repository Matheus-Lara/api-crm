const clienteController = require('../controllers/ClienteController');
const express = require('express');
const router = express.Router();

router.post('/', clienteController.salvar);
router.get('/', clienteController.listar);
router.get('/:id', clienteController.buscarPorId);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.excluir);

module.exports = router;
