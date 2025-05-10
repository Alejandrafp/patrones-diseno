/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */


class library{
    public title: string;
    private content: string;
    public author: string;


    constructor(title: string, content: string, author: string,) {
        this.title = title;
        this.content = content;
        this.author = author;

    }

    clone(): library {
        return new library(this.title, this.content, this.author)
    }

    displayInfo() {
        console.log(`
            Title: ${this.title}
            Content: ${this.content}
            Author: ${this.author}
        `);
    }
}

function main(){
    const book = new library('Cotizacion', '500 dolares', 'Alejandra');
    console.log({ book});
    book.displayInfo();

    const library2 = book.clone();
    library2.title = 'Nueva cotizacion';
    console.log({ library2 });
    library2.displayInfo();

}

main();