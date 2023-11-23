# Crud-Proyect-P3
Esta es una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) simple que utiliza Firebase para almacenar tareas. La aplicación te permite agregar, editar y eliminar tareas.

Estructura de la aplicación
index.js: Este es el archivo JavaScript principal de la aplicación. Maneja la interacción con la base de datos de Firebase, incluida la adición, actualización y eliminación de tareas. También representa las tareas en HTML.

index.html: El archivo HTML contiene un formulario para agregar tareas y un contenedor para mostrar las tareas existentes.

Uso
Abra el index.htmlarchivo en un navegador web.
Complete el formulario para agregar una nueva tarea y haga clic en el botón "Guardar".
Las tareas existentes se muestran debajo del formulario con opciones para editar o eliminar.
Para editar una tarea, haga clic en el botón "Editar", realice cambios en el formulario y haga clic en "Actualizar".
Para eliminar una tarea, haga clic en el botón "Eliminar".

Notas:
La aplicación utiliza Firebase Firestore para almacenar tareas.
La funcionalidad de edición se implementa para actualizar los detalles de la tarea.
La funcionalidad de eliminación se implementa para eliminar tareas de la base de datos.
La aplicación actualiza dinámicamente la lista de tareas en tiempo real mediante instantáneas de Firebase.
