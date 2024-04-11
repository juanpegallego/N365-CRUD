Proyecto N365-CHALLENGE

Este proyecto consiste en una aplicación  de gestión de pagos. Donde se permite cargar nuevos pagos o trasnferencias, visualizarlas y eliminar en caso de ser necesario.


Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas:

    client: Contiene el código del cliente, desarrollado con React.js.
    server: Contiene el código del servidor, desarrollado con Node.js y Express.js.
    database: Contiene el archivo db.sql con las instrucciones para la creación de las tablas en la base de datos.

Instalación

Para ejecutar este proyecto , seguir estos pasos:

    Clona repo desde GitHub:

git clone https://github.com/juanpegallego/N365-CRUD

    Instalar  dependencias del cliente y del servidor. En root, ejecutar:

cd N365-CRUD
npm install && cd client npm install

Configuración
Base de Datos

Antes de ejecutar el servidor, tener PostgreSQL instalado en el sistema. Luego,  configurar la base de datos ejecutando las instrucciones del archivo db.sql ubicado en la carpeta database.


Variables de Entorno

En root, crear un archivo .env que contenga las variables de entorno necesarias para el servidor. Un ejemplo de estas variables se puede encontrar en el archivo .env.example.
Uso

Una vez configurado, puedes iniciar el servidor y el cliente por separado.



Servidor

En root, ejecutar:

npm run server

El servidor estará disponible en http://localhost:3000.
Cliente
En root, ejecutar:

cd client && npm start

El cliente estará disponible en http://localhost:3001.




Tecnologías Utilizadas
Cliente (Front-end)

    React.js
    React Router DOM
    Styled Components
    SweetAlert2 

Servidor (Back-end)

    Node.js
    Express.js
    PostgreSQL
    Express Session
    Bcrypt

TO DO:

Las credenciales estan viajando en texto plano. To do:serializar.
No hay tests armados para front ni back. To do: configurar tests:
Ordenar la logica de las carpetas y archivos de client. To do: Organizar archivos y carpetas segun sean components, views, utils, controllers. etc
Los styled components deberian ir afuera del componente: To do: Armar una carpeta por cada item que valga la pena modularizar los styled components de la logica
