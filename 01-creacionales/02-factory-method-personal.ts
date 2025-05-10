
/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from '../helpers/colors.ts';



interface Hamburger {

    prepare(): void;


}

class ChickenHarburger implements Hamburger {

    prepare(): void {
        console.log('Preparando una hamburguesa de %cpollo', COLORS.yellow);
    }
}


class BeefHarburger implements Hamburger {

    prepare(): void {
        console.log('Preparando una hamburguesa de %cCarne', COLORS.brown);
    }
}

class BeanHarburger implements Hamburger {

    prepare(): void {
        console.log('Preparando una hamburguesa de %cFrijoles', COLORS.black);
    }
}

abstract class Restaurant { //La definicion de esta class no me permite crear una instancia nueva en este caso de un restaurante
   protected abstract createHamburger(): Hamburger;

    orderHamburger(): void {
        const hamburger = this.createHamburger();
        hamburger.prepare();
    }
}

class ChickenRestaurant extends Restaurant {

    override createHamburger(): Hamburger {
        return new ChickenHarburger();
    }

}

class BeefRestaurant extends Restaurant {

    override createHamburger(): Hamburger {
        return new BeefHarburger();
    }

}

class BeanRestaurant extends Restaurant {

    override createHamburger(): Hamburger {
        return new BeanHarburger();
    }

}

function main(){

    let restaurant: Restaurant;

    const burgerType = prompt('¿Que tipo de hamburguesa quieres? ( chicken/beef/bean )')
    switch(burgerType){
        case 'chicken':
            restaurant = new ChickenRestaurant();
        break;
        case 'beef':
            restaurant = new BeefRestaurant();
        break;
        case 'bean':
            restaurant = new BeanRestaurant();
        break;
        default:
            throw new Error('Opcion no valida');
    }

    restaurant.orderHamburger();
}


main();

