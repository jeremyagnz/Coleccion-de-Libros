/* Definicion de las clases  */

class Libro{
    constructor(titulo, autor, isbn){
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
    }
}



/* Manejo del DOM */
class UI{

    static mostrarLibros(){
        const libros = Datos.traerLibros();
        libros.forEach((libro) => UI.agregarLibroLista(libro));
    }


    static agregarLibroLista(libro){
        const lista = document.querySelector('#libro-list');
        
        const fila = document.createElement('tr');
        fila.innerHTML = `
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.isbn}</td>
                <td><a href ="#" class = "delete">X</td>
        `;

        lista.appendChild(fila);
    }


    static eliminarLibro(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }


    static mostrarAlerta(mensaje, className){
        const div = document.createElement('div');
        div.className = `alert`;
        div.appendChild(document.createTextNode(mensaje));

        const container = document.querySelector('.form-container');
        const form = document.querySelector('#libro-form');
        container.insertBefore(div, form);


        setTimeout(()=>document.querySelector('.alert').remove(), 2000);
    }

    static mostrarAlerta2(mensaje, className){
        const div = document.createElement('div');
        div.className = `alert2`;
        div.appendChild(document.createTextNode(mensaje));

        const container = document.querySelector('.form-container');
        const form = document.querySelector('#libro-form');
        container.insertBefore(div, form);


        setTimeout(()=>document.querySelector('.alert2').remove(), 2000);
    }

    static mostrarAlerta3(mensaje, className){
        const div = document.createElement('div');
        div.className = `alert3`;
        div.appendChild(document.createTextNode(mensaje));

        const container = document.querySelector('.form-container');
        const form = document.querySelector('#libro-form');
        container.insertBefore(div, form);


        setTimeout(()=>document.querySelector('.alert3').remove(), 2000);
    }
    


    static limpiarCampos(){
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#isbn').value = '';

    }
}
/* Manejo del DOM */






/* LocalStorage */

class Datos{
    static traerLibros(){
        let libros;

        if(localStorage.getItem('libros') ===null){
            libros = [];
        }else{
            libros = JSON.parse(localStorage.getItem('libros'));
        }
        return libros;
    }

    static agregarLibro(libro){
        const libros = Datos.traerLibros();
        libros.push(libro);
        localStorage.setItem('libros', JSON.stringify(libros));
    }

    static removerLibro(isbn){

        const libros = Datos.traerLibros();

         libros.forEach((libro, index) => {
            if(libro.isbn === isbn){
                libros.splice(index, 1);
            }
         });
            localStorage.setItem('libros', JSON.stringify(libros));
     }

}
/* LocalStorage */


/* Carga de la pagina */
document.addEventListener('DOMContentLoaded', UI.mostrarLibros());
/* Carga de la pagina */



/* Controlar evento Submit */
document.querySelector('#libro-form').addEventListener('submit', (e) => {
    e.preventDefault();

    /* Obtener valores de los Campos */
    const titulo = document.querySelector('#titulo').value;
    const autor = document.querySelector('#autor').value;
    const isbn = document.querySelector('#isbn').value;

    if(titulo=== '' || autor=== '' || isbn== ''){
        UI.mostrarAlerta('Por favor ingrese todos los datos');
    }else{
        const libro = new Libro(titulo, autor, isbn);

        Datos.agregarLibro(libro);
        UI.agregarLibroLista(libro);
        UI.mostrarAlerta2('Libro agregado a la colección');
        UI.limpiarCampos();
    }
});

document.querySelector('#libro-list').addEventListener('click', (e) => {
    UI.eliminarLibro(e.target);
    Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent);
    UI.mostrarAlerta3('Libro Eliminado');
});