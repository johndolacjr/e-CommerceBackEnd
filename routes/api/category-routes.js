const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
  res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
try {
  const allCategories = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });

  if (!allCategories) {
    res.status(404).json({ message: 'No Category' })
    return;
  }
  res.status(200).json(allCategories)
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const postCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(postCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.findByPk(req.params.id);
    updateCategory.category_name = req.body.category_name;
    await updateCategory.save()
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(404).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryDelete) {
      res.status(404).json({ message: 'No category with this ID' });
      return;
    }

    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
