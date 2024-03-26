const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prueba',
  port: 3306
};

// Crear una conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

app.use(express.json());


//consultar
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).send('Error del servidor');
      return;
    }
    res.json(results);
  });
});


// insetar
app.post('/userInsert', (req, res) => {
  const newItem = req.body;
  console.log(newItem);
  const { name, last_name, email } = newItem;
  connection.query(`INSERT INTO users(name, last_name, email) VALUES ('${name}', '${last_name}', '${email}')`, (error, result) => {
    if (error) {
      console.error('Error al insertar el elemento:', error);
      res.status(500).send('Error del servidor');
      return;
    }
    res.send('Elemento insertado correctamente');
  });
});


//actualizar
app.put('/userUpdate/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  connection.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (error, result) => {
    if (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).send('Error del servidor');
      return;
    }
    res.send('Usuario actualizado correctamente');
  });
});

//eliminar
app.delete('/userDelete/:id', (req, res) => {
  const userId = req.params.id;
  connection.query('DELETE FROM users WHERE id = ?', userId, (error, result) => {
    if (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).send('Error del servidor');
      return;
    }
    res.send('Usuario eliminado correctamente');
  });
});



// Escuchar en el puerto especificado
app.listen(port , () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
