import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

interface Command{

    execute(): void;
}

class Light{
    turnOn(): void{
        console.log(`%cLa luz esta encendida.`, COLORS.yellow);
    }

     turnOff(): void{
        console.log(`%cLa luz esta apagada.`, COLORS.black);
    }
}

class Fan{
    turnOn(): void{
        console.log(`%cEl ventilador esta encendido.`, COLORS.blue);
    }

     turnOff(): void{
        console.log(`%cEl ventilador esta apagado.`, COLORS.brown);
    }
}

class LightOnCommand implements Command{
    
    constructor(private light: Light){}
    
    execute(): void {
        this.light.turnOn();
    }
}

class LightOffCommand implements Command{
    
    constructor(private light: Light){}
    
    execute(): void {
        this.light.turnOff();
    }
}

class FanOnCommand implements Command{
    
    constructor(private fan: Fan){}
    
    execute(): void {
        this.fan.turnOn();
    }
}

class FanOffCommand implements Command{
    
    constructor(private fan: Fan){}
    
    execute(): void {
        this.fan.turnOff();
    }
}


class RemoteControl{

    private comands: Record<string, Command> = {}

    setCommand(button: string, command: Command){
        this.comands[button] = command;
    }

    pressButton(button: string): void{
        if(this.comands[button]){
            this.comands[button].execute();
            return;
        }
        console.log(`%cNo se ha asignado un comando a ese boton`, COLORS.red);
    }

}

function main(){

const remoteControl = new RemoteControl();
const light = new Light();
const fan = new Fan();

const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);

const fanOnCommand = new FanOnCommand(fan);
const fanOffCommand = new FanOffCommand(fan);


remoteControl.setCommand('1', lightOnCommand);
remoteControl.setCommand('2', lightOffCommand);
remoteControl.setCommand('3', fanOnCommand);
remoteControl.setCommand('4', fanOffCommand);

let continueProgram = true;
do{
console.clear();
const pressedButton = prompt(
    `Presione un boton del control:
    1. Encender luz.
    2. Apagar luz.
    3. Encender ventilador.
    4. Encender ventilador.

    Boton:
    ` ) ?? ''
    remoteControl.pressButton(pressedButton)

    const continueProgramResponse = prompt(
        `\n¿Deseas continuar? (y/n):`
    )?.toLowerCase()

    continueProgram = continueProgramResponse === 'n' ? false : true;
}while(continueProgram);

}

main();