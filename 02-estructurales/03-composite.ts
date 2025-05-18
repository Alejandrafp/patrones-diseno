/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

interface FileSystemComponent {
    showDetails(indent?: string): void;

}


class FileU implements FileSystemComponent{
    private name: string;

    constructor(name: string){
        this.name = name;
    }

    showDetails(indent?: string): void{
        console.log(`${indent}- Archivo: ${this.name}`);
    }
}

class Folder implements FileSystemComponent{
    private name: string;
    private contents: FileSystemComponent[] = [];

    constructor(name: string){
        this.name = name;
    }

    add(component: FileSystemComponent){
        this.contents.push(component);
    }

    showDetails(indent: string = ''): void{
        console.log(`${indent}+ Carpeta: ${this.name}`);
        this.contents.forEach(component => component.showDetails(indent + ' '));
        
    }
}

function main(){
    const file1 = new FileU('archivo1.txt');
    const file2 = new FileU('archivo2.txt');
    const file3 = new FileU('archivo3.txt');
    const file4 = new FileU('archivo4.txt');

    const folder1 = new Folder('Carpeta 1');
    const folder2 = new Folder('Carpeta 2');
    const folder3 = new Folder('Carpeta 3');
    const folder4 = new Folder('Carpeta 4');
    const folder5 = new Folder('Carpeta 5');



    folder1.add( file1 );
    folder1.add( file2 );

    folder2.add( file3 );
    folder2.add( folder3 );
    folder2.add( folder5 );


    folder3.add( file4 );

    const rootFolder = new Folder('Carpeta ROOT');
    rootFolder.add(folder1)
    rootFolder.add(folder2)

    rootFolder.showDetails();
    

}

main();
