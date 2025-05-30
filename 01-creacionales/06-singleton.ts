import { COLORS } from '../helpers/colors.ts';
/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */


class DragonBalls {

    private static instance: DragonBalls;
    private ballsCollected: number;

    private constructor() {
        this.ballsCollected = 0;
    }

    public static getInstance(): DragonBalls {
        if (!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls()
            console.log('%cLas esferas del Dragon han sido creadas', COLORS.green);
        }
        return DragonBalls.instance;
    }

    collectBalls(): void {
        if (this.ballsCollected < 7) {
            this.ballsCollected++;
            console.log(`Esfera recolectada. Total de esferas: ${this.ballsCollected}`)
            return;
        }

        console.log('Ya recolectaste las 7 esferas del Dragon! Invoca a Shenlong');
    }

    summonShenlong() {
        if (this.ballsCollected === 7) {
            console.log('Shenlong ha sido invocado. Pide tu deseo!');
            this.ballsCollected = 0;
            return;
        }
        console.log(`\nAun faltan ${7 - this.ballsCollected} esferas para invocar a Shenlong`);

    }

}


function main(){
    const gokuDragonBalls = DragonBalls.getInstance();
    gokuDragonBalls.collectBalls();
    gokuDragonBalls.collectBalls();
    gokuDragonBalls.collectBalls();

    gokuDragonBalls.summonShenlong();

    const vegetaDragonBalls = DragonBalls.getInstance();
    vegetaDragonBalls.collectBalls();
    vegetaDragonBalls.collectBalls();
    vegetaDragonBalls.collectBalls();
    vegetaDragonBalls.collectBalls();

    gokuDragonBalls.summonShenlong();
    vegetaDragonBalls.summonShenlong();



}

main();