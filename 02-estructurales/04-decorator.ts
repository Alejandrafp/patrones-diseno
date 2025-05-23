import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */


interface INotification{
    send(message: string): void;

}

class BasicNotification implements INotification{
   send(message: string): void{
    console.log(`%cEnviando notificacion basica: %c${ message }`, COLORS.green, COLORS.white);
   } 
}

//Clase decoradora
abstract class NotificationDecorator implements INotification {
    protected notification: INotification;
    constructor(notification: INotification) {
        this.notification = notification
    }
    send(message: string): void {
        this.notification.send(message);
    } 
}

//Crear diferentes decoradores
class EmailDecorator extends NotificationDecorator{
    private sendEmail(message: string){
        console.log(`%cEnviando notificacion por correo electronico: %c${ message }`, COLORS.violet, COLORS.white);
    }
    
    override send(message: string): void{
        super.send(message);
        this.sendEmail(message)
    }
}


class SMSDecorator extends NotificationDecorator{
    private sendSMS(message: string){
        console.log(`%cEnviando notificacion por SMS: %c${ message }`, COLORS.cyan, COLORS.white);
    }
    
    override send(message: string): void{
        super.send(message);
        this.sendSMS(message)
    }
}


function main(){
    let notification: INotification = new BasicNotification();

    notification = new EmailDecorator(notification);
    notification = new SMSDecorator(notification);

    notification.send('Alerta de sistema!');
}


main();