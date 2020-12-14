const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const allTags = await Tag.findAll({
      include: [{ all: true, nested: true }],
    });
  res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findByPk(req.params.id, {
      include: [{ all: true, nested: true }],
    });
    if (!allTags) {
      res.status(404).json({message: 'No Tag'})
    return;
  }
  res.status(200).json(allTAgs)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const postTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(postTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.findByPk(req.params.id);
    updateTag.tag_name = req.body.tag_name;
    await updateTag.save()
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(404).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagDelete) {
      res.status(404).json({ message: 'No category with this tag' });
      return;
    }

    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
