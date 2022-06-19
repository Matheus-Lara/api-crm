const produtoController = require('../controllers/ProdutoController');
const express = require('express');
const router = express.Router();

router.post('/', produtoController.salvar);
router.get('/', produtoController.listar);
router.get('/nextCodigo', produtoController.getNextCodigo);
router.get('/:id', produtoController.buscarPorCodigo);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.excluir);

module.exports = router;
