import { COLORS } from '../helpers/colors.ts';
/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento {
    private level: number;
    private health: number;
    private position: string;

    constructor(level: number, health: number, position: string) {
        this.level = level;
        this.health = health;
        this.position = position;
    }

    getLevel() {
        return this.level;
    }

    getHealth() {
        return this.health;

    }

    getPosition() {
        return this.position;

    }
}


class Game {
    private level: number = 1;
    private health: number = 100;
    private position: string = 'inicio';

    constructor() {
        console.log(`%cJugando en el nivel ${this.level} 
            %c- Salud: ${this.health} 
            %c- Posicion: ${this.position}`, 
            COLORS.violet,
            COLORS.yellow,
            COLORS.white)
    }

    save(): GameMemento {
        return new GameMemento(this.level, this.health, this.position);
    }

    play(level: number, health: number, position: string): void {
        this.level = level;
        this.health = health;
        this.position = position;

        console.log(`%cJugando en el nivel ${this.level}  
            %c- Salud: ${this.health}  
            %c- Posicion: ${this.position}`, 
            COLORS.orange,
            COLORS.purple,
            COLORS.white);

    }

    restore(memento: GameMemento): void{
        this.level = memento.getLevel();
        this.health = memento.getHealth();
        this.position = memento.getPosition();

        console.log(`\n%cProgreso restaurado

            %cRestauracion en el nivel ${this.level} 
            %c- Salud: ${this.health}  
            %c- Posicion: ${this.position}`, 
            COLORS.brown,
            COLORS.pink,
            COLORS.orange,
            COLORS.white

        );


    }

}

class GameHistory {
    private mementos: GameMemento[] = [];

    push(memento: GameMemento) {
        this.mementos.push(memento);
    }

    pop(): GameMemento | null {
        return this.mementos.pop() ?? null;
    }

}

function main() {

const game = new Game();
const history = new GameHistory();

history.push(game.save());

//Avanzando en el juego
game.play(2, 90,'Bosque encantado');
history.push(game.save());

game.play(3, 70,'Cueva Oscura');
history.push(game.save());

game.play(4, 50,'Castillo del dragon');
console.log(`\n%cEstado actual`, COLORS.green);
game.restore(history.pop()!);
console.log(`\n%cRealizando restauracion`, COLORS.violet);

}

main()