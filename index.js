import {
  guardartarea,
  optenerTarea,
  onSnapshot,
  collection,
  db,
} from "./firebase.js";

const tareaform = document.getElementById("tarea-formulario");
const contenedorTareas = document.getElementById("contenedor-tarea");

window.addEventListener("DOMContentLoaded", async () => {
  try {
    onSnapshot(collection(db, "tareas"), (querySnapshot) => {
      let html = "";
      console.log(querySnapshot);
      querySnapshot.forEach((docs) => {
        const tarea = docs.data();
        html = html += `
        <div>
        <h3>${tarea.title}</h3>
        <p>${tarea.descripcion}</p>
        </div>`;
      });
      contenedorTareas.innerHTML = html;
    });

    /*//*Prueba */

    /*
    const querySnapshot = await optenerTarea();
    let html = "";
    console.log(querySnapshot);
    querySnapshot.forEach((docs) => {
      const tarea = docs.data();
      html = html += `
        <div>
        <h3>${tarea.title}</h3>
        <p>${tarea.descripcion}</p>
        </div>`;
    });
    contenedorTareas.innerHTML = html;
    */
  } catch (error) {
    console.error("Error al obtener tareas:", error);
  }
});

tareaform.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = tareaform["titulo_tarea"];
  const descripcion = tareaform["descripcion_tarea"];

  guardartarea(titulo.value, descripcion.value);

  tareaform.reset();
});
