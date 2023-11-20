import { guardartarea } from "./firebase.js";
window.addEventListener("DOMContentLoaded", () => {});
const tareaform = document.getElementById("tarea-formulario");

tareaform.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = tareaform["titulo_tarea"];
  const descripcion = tareaform["descripcion_tarea"];

  guardartarea(titulo.value, descripcion.value);

  tareaform.reset();
});
