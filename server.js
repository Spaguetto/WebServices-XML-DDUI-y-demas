const express = require('express');
const soap = require('soap');
const fs = require('fs');

const app = express();

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Corriendo todo en el puerto 3000');
});

try {
  const xml = fs.readFileSync('books.wsdl', 'utf-8'); // Lee el archivo WSDL
  const wsdlDefinition = new soap.WSDL(xml); // Crea una instancia de WSDL usando la cadena XML

  const service = {
    BookService: {
      BookServicePort: {
        getBook: function(args) {
          const booksXML = fs.readFileSync('books.xml', 'utf-8');
          // Lógica para extraer información del libro solicitado (en este ejemplo, es estático)
          const bookInfo = {
            title: 'Satanas',
            author: 'Mario Mendoza'
          };
          return bookInfo;
        }
      }
    }
  };

  app.use('/books', soap.listen({ services: service, wsdl: wsdlDefinition })); // Define el servicio con la definición de WSDL
} catch (error) {
  console.error('Error:', error);
}
