const router = require('express').Router();
const sequelize = require('sequelize');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// finds all Tags
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product}, {model: ProductTag}],
    });
    res.status(200).json(tagsData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// finds one tag
router.get('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.findbyPK(req.params.id, {
      include: [{ model: Product}, {model: ProductTag}],
    });

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const dbTagData = await Tag.create({
      
    }); res.status(200).json(dbTagData);
  } catch {
    console.error(err);
    res.status(500).json({ message: 'Could not create tag'});
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const tagsData = await Tag.update(req.body, {
      where: {id},
      returning: true,
    });
    if (!Tag) {
      res.status(404).json({ message: 'Tag not found'});
    } else {
      res.json(tagsData);
    }
  } catch (err) {
res.status(500).json({ message: 'Could not update tag'})
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
const id = req.params.id;
await Tag.destroy({
  where: { id },
});
res.json({ message: 'Tag deleted'});
  } catch (err) {
res.status(500).json({ message: 'Could not delete tag'})
  }
});

module.exports = router;
