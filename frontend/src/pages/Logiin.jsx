import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  async function onSubmit(e){
    e.preventDefault();
    try{
      await login(form.email, form.password);
      navigate("/");
    }catch(e){
      setErr(e?.response?.data?.error || "Error desconocido" );
    }
  }

  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <h1>Iniciar sesión</h1>
          <span className="badge">CRUD Demo</span>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e)=>setForm({...form, email:e.target.value})}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e)=>setForm({...form, password:e.target.value})}
          />
          <button className="btn btn-primary" type="submit" data-cy="login-btn">
            Entrar
          </button>
        </form>

        {err && <p className="muted" style={{color:"#ff9aa2", marginTop:12}}>{err}</p>}

        <p className="muted">
          <strong>Usuario:</strong> crea uno con <code>/auth/register</code> (Thunder Client / Postman).
        </p>
      </div>
    </div>
  );
}
