import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer{
    notify(videoTitle: string):void;
}

class YoutubeChannel{
    private subscribers: Observer[] =[];
    private name: string;

    constructor(name: string){
        this.name = name;
    }

    subscribe(observer: Observer): void{
        this.subscribers.push(observer);
        console.log(`%cNuevo suscriptor del canal: ${this.name}`, COLORS.orange);
    }
    unsubscribe(observer: Observer): void{
        this.subscribers = this.subscribers.filter(sub => sub === observer);
        console.log(`%cUn suscriptor se ha dado de baja: ${this.name}`, COLORS.green);
    }

    uploadVideo(videoTitle: string): void{
        console.log(`Canal: ${this.name} ha subido un nuevo video %c${videoTitle}`, COLORS.blue);

        for (const subscriber of this.subscribers) {
            subscriber.notify(videoTitle);
        }
    }
}

class Subscriber implements Observer{
    private name: string;

    constructor(name: string){
        this.name = name;
    }

    notify(videoTitle: string): void {
        console.log(`${this.name} ha sido notificado %cNuevo video: %c${videoTitle}`, COLORS.blue, COLORS.purple);

    }

}

function main(){
    const channel = new YoutubeChannel('Concinando con Ale');
    const melisa = new Subscriber('Melisa');
    const carlos = new Subscriber('Carlos');
    const eduardo = new Subscriber('Eduardo');

    channel.subscribe(melisa);
    channel.subscribe(carlos);

    channel.uploadVideo('Receta de tamales');

    channel.subscribe(eduardo);
    channel.uploadVideo('Receta de tacos al pastor');

    channel.unsubscribe(carlos);

    channel.uploadVideo('Receta de pizza');

    console.log('\n\n');
}

main();