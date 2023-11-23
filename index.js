import {
  guardartarea,
  optenerTarea,
  onSnapshot,
  collection,
  db,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
} from "./firebase.js";

const tareaform = document.getElementById("tarea-formulario");
const contenedorTareas = document.getElementById("contenedor-tarea");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    onSnapshot(collection(db, "tareas"), (querySnapshot) => {
      let html = "";
      querySnapshot.forEach((docs) => {
        const tarea = docs.data();
        html = html += `
        <div>
        <h3>${tarea.title}</h3>
        <p>${tarea.descripcion}</p>
        <button class='btn-bdelete ' data-id=${docs.id}>Eliminar</button>
        <button class='btn-editar' data-id=${docs.id}>Editar</button>
        </div>`;
      });
      contenedorTareas.innerHTML = html;
      const btnDelete = contenedorTareas.querySelectorAll(".btn-bdelete");
      btnDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteTask(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );

      //*Editar tareas
      const btnEditar = contenedorTareas.querySelectorAll(".btn-editar");
      btnEditar.forEach((btn) => {
        btnEditar.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            try {
              const doc = await getTask(e.target.dataset.id);
              const task = doc.data();
              tareaform["titulo_tarea"].value = task.title;
              tareaform["descripcion_tarea"].value = task.descripcion;

              editStatus = true;
              id = doc.id;
              tareaform["btn-guardar-tarea"].innerText = "Actualizar";
            } catch (error) {
              console.log(error);
            }
          });
        });
      });
    });
  } catch (error) {
    console.error("Error al obtener tareas:", error);
  }
});

tareaform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const titulo = tareaform["titulo_tarea"];
  const descripcion = tareaform["descripcion_tarea"];

  if (!editStatus) {
    guardartarea(titulo.value, descripcion.value);
  } else {
    try {
      const existingTask = await getTask(id);

      if (existingTask.exists()) {
        await updateTask(id, {
          titulo: titulo.value,
          descripcion: descripcion.value,
        });
        editStatus = false;
      } else {
        console.error("El documento no existe:", id);
      }
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  }

  tareaform.reset();
});
