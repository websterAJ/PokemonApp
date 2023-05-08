const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require('./pokemons.js');
const typeRouter = require('./type.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/types', typeRouter);
router.use('/pokemons', pokemonRouter);


module.exports = router;
