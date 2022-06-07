const produtoController = require('../controllers/ProdutoController');
const express = require('express');
const router = express.Router();

router.post('/', produtoController.salvar);
router.get('/', produtoController.listar);
router.get('/:codigo', produtoController.buscarPorCodigo);
router.put('/:codigo', produtoController.atualizar);
router.delete('/:codigo', produtoController.excluir);

module.exports = router;
