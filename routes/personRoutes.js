const router = require('express').Router();
const Person = require('../models/Person');

router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body;
  if (!name) {
    res.status(422).json({ message: 'Dados Inválidos' });
  }
  const person = {
    name,
    salary,
    approved,
  };
  try {
    await Person.create(person);
    res.status(201).json({ message: 'Dado inserido com Sucesso!!' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findOne({ _id: id });
    if (!person) {
      res.status(422).json({ message: 'Dado não Econtrado' });
      return;
    }
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//Atualização de dados, PUT => tOTAL ou PATCH => Parcial
router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);
    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: 'Dado não encontrado' });
    }
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ message: 'Dado não Econtrado' });
    return;
  }
  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: 'Usuário Deletado' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
