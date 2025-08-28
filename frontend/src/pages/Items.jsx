import { useState, useEffect } from "react";

const Items = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [err, setErr] = useState("");

  // 🔹 Extraemos usuario de localStorage
  const user = localStorage.getItem("user");
  const id = user ? JSON.parse(user).id : null;
  const token = user ? JSON.parse(user).token : null;
  const userId = id;

  // 🔹 Cargar items del usuario
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/api/items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los items");
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((e) => setErr(e.message));

    console.log("Items cargados:", items);

    return () => setItems([]);
  }, [id, token]);

  // 🔹 Crear nuevo item
  const createItem = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await fetch("http://localhost:3000/api/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, userId }),
      });

      if (!res.ok) throw new Error("Error al crear el item");
      const newItem = await res.json();
      setItems([...items, newItem]);
      setForm({ title: "", description: "" });
    } catch (error) {
      setErr(error.message);
    }
  };

  // 🔹 Guardar edición
  const saveEdit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await fetch(
        `http://localhost:3000/api/items/${editing.itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...form, userId }),
        }
      );

      if (!res.ok) throw new Error("Error al editar el item");
      const updated = await res.json();

      setItems(items.map((i) => (i.itemId === editing.itemId ? updated : i)));
      setForm({ title: "", description: "" });
      setEditing(null);
    } catch (error) {
      setErr(error.message);
    }
  };

  // 🔹 Eliminar item
  const remove = async (id) => {
    setErr("");
    try {
      const res = await fetch(`http://localhost:3000/api/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error al borrar el item");

      // Usamos el id que recibimos como argumento
      setItems(items.filter((i) => i.itemId !== id));
    } catch (error) {
      setErr(error.message);
    }
  };

  // 🔹 Iniciar edición
  const startEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description });
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <h2>Mis Items</h2>
          <button className="btn btn-ghost" onClick={logout}>
            Salir
          </button>
        </div>

        <form className="inline" onSubmit={editing ? saveEdit : createItem}>
          <input
            className="input"
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="input"
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button className="btn btn-primary" type="submit">
            {editing ? "Guardar" : "Crear"}
          </button>
        </form>

        {err && <p className="muted error-text">{err}</p>}

        <div className="list">
          {items.map((i) => (
            <div className="row" key={i.itemId}>
              <div className="row-text">
                <div className="row-title">{i.title}</div>
                <div className="muted row-desc">{i.description || "—"}</div>
              </div>
              <div className="row-actions">
                <button className="btn btn-ghost" onClick={() => startEdit(i)}>
                  Editar
                </button>
                <button className="btn btn-ghost" onClick={() => remove(i.itemId)}>
                  Borrar
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="muted empty-text">
              Aún no tienes items. Crea el primero ✨
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Items;