import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

class Projector {
    turnOn() {
        console.log('%cProyector encendido', COLORS.blue)
    }

    turnOff() {
        console.log('%cProyector apagado', COLORS.red)
    }

}

class SoundSystem {
    on() {
        console.log('%cSistema de sonido encendido', COLORS.blue)
    }

    off() {
        console.log('%cSistema de sonido apagado', COLORS.red)
    }
}


class VideoPlayer {
    on() {
        console.log('%cSistema de video encendido', COLORS.blue)
    }

    off() {
        console.log('%cSistema de video apagado', COLORS.red)
    }

    play(movie: string) {
        console.log(`Reproduciendo %c${movie}`, COLORS.green)
    }

    stop() {
        console.log('%cSistema de video detenido', COLORS.gray)
    }

}


class PopcornMaker {

    poppingPopCorn() {
        console.log('%cHaciendo palomitas', COLORS.yellow)
    }

    turnOffPoppingPopCorn() {
        console.log('%cDeteniendo las palomitas', COLORS.red)
    }
}

interface HomeTheaterFacadeOptions {
    projector: Projector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer;
    popCornMaker: PopcornMaker;
}

class HomeTheaterFacade {

    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer;
    private popCornMaker: PopcornMaker;

    constructor({
        popCornMaker,
        projector,
        soundSystem,
        videoPlayer,
    }: HomeTheaterFacadeOptions) {
        this.popCornMaker = popCornMaker;
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
    }

    watchMovie(movie: string): void{
    console.log('%cPreparando para ver la pelicula', COLORS.orange);
    this.popCornMaker.poppingPopCorn();
    this.projector.turnOn();
    this.soundSystem.on();
    this.videoPlayer.on();
    this.videoPlayer.play('Casablanca');

    console.log('%cDisfrute la pelicula', COLORS.cyan);

    }

    endWatchMovie(): void{
    console.log('%c\n\nPreparando para detener la pelicula', COLORS.blue);
    this.popCornMaker.turnOffPoppingPopCorn();
    this.projector.turnOff();
    this.soundSystem.off();
    this.videoPlayer.stop();
    this.videoPlayer.off();

    console.log('%cPelicula terminada\n', COLORS.violet);

    }
}

function main(){
    const popCornMaker = new PopcornMaker();
    const projector = new Projector();
    const soundSystem = new SoundSystem();
    const videoPlayer = new VideoPlayer();

    const homeTheater = new HomeTheaterFacade({
        popCornMaker,
        projector,
        soundSystem,
        videoPlayer, 
    });

    homeTheater.watchMovie('Casablanca');
    homeTheater.endWatchMovie();

}

main();