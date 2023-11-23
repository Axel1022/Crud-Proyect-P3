import {
  guardartarea,
  optenerTarea,
  onSnapshot,
  collection,
  db,
  deleteTask,
  getTask,
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

    /*

    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
    */

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
