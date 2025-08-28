const Item = require('../models/items.models')
// Crear item
const createItem = async (req, res) => {
  const { title, description, userId } = req.body || {};
  if (!title) return res.status(400).json({ message: "title requerido" });

  try {
    const item = await Item.create({
      userId: userId || req.user.id,
      title,
      description: description || null,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};

// Listar items
const getItems = async (req, res) => {

  try {
    const items = await Item.findAll({
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};

// Obtener un item por id
const getItemById = async (req, res) => {
  const {id} = req.params;
  try {
    const item = await Item.findAll({
      where: { userId: id },
    });
    if (!item) return res.status(404).json({ message: "No encontrado" });
    res.json(item);
    console.log(item);
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};

// Actualizar item
const updateItem = async (req, res) => {
  const { title, description } = req.body || {};
  const { id } = req.params;

  try {
    const item = await Item.findOne({
      where: { itemId: id },
    });

    if (!item) return res.status(404).json({ message: "No encontrado" });

    await item.update({
      title: title ?? item.title,
      description: description ?? item.description,
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};

// Eliminar item
const deleteItem = async (req, res) => {
 const { id } = req.params;
 try {
   const item = await Item.findOne({
     where: { itemId: id},
   });
   if (!item) return res.status(404).json({ message: "No encontrado" });

   await item.destroy();
   res.status(204).send();
 } catch (err) {
   res.status(500).json({ message: "Error en el servidor", error: err.message });
 }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
