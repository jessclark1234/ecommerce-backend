const router = require('express').Router();
const sequelize = require('sequelize');
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

// GET all Categories
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }, { model: ProductTag }],
      attributes: {
        include: [
          [
            sequelize.literal(
              'SELECT SUM'
            ),
            '',
          ],
        ],
      }
    });
    res.status(200).json(categoriesData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one Category
router.get('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findbyPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }],
      attributes: {
        include: [
          [
            sequelize.literal(
              'SELECT SUM'
            ),
            ''
          ],
        ],
      },
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'Category does not exist'});
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const dbCategoriesData = await Category.create({
      category_title: req.body.category_title,
      
    }); res.status(200).json(dbCategoriesData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create category'});
  }
});

// update category
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const categoriesData = await Category.update(req.body, {
      where: {id},
      returning: true,
    });
    if (!Category) {
      res.status(404).json({ message: 'Category not found'});
    } else {
      res.json(categoriesData);
    }
  } catch (err) {
    res.status(500).json({message: 'Could not update category'})
  }

});

// delete category
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Category.destroy({
      where: { id },
    });
    res.json({ message: 'Category deleted'});
  } catch (err) {
    res.status(500).json({ message: 'Could not delete category'})
  }
});

module.exports = router;
