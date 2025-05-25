import { COLORS } from '../helpers/colors.ts';
import { sleep } from '../helpers/sleep.ts';
/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
    name: string;
    insertMoney(): void;
    selectProduct(): void;
    dispenseProduct(): void;

}

class VendingMachine {
    private state: State;

    constructor() {
        this.state = new WaitingForMoney(this);
    }

    insertMoney() {
        this.state.insertMoney();
    }

    selectProduct() {
        this.state.insertMoney();
    }

    dispenseProduct() {
        this.state.dispenseProduct();
    }

    getStateName(): string{
        return this.state.name;
    }

    setState(newState: State){
        this.state = newState;
        console.log(`Estado cambio a %c${newState.name}`, COLORS.green);
    }

}

class WaitingForMoney implements State{
    public name: string = 'Esperando dinero';
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine){
        this.vendingMachine = vendingMachine;
    }

    insertMoney(): void {
       console.log(`%cDinero insertado: ahora puedes seleccionar tu producto`, COLORS.blue);
       this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
    }
    selectProduct(): void {
        console.log(`%cPrimero debes de insertar dinero`, COLORS.red);

    }
    dispenseProduct(): void {
        console.log(`%cPrimero debes de insertar dinero`, COLORS.red);

    }

}


class ProductSelected implements State{
    public name: string = 'Seleccionando producto';
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine){
        this.vendingMachine = vendingMachine;
    }

    insertMoney(): void {
       console.log(`%cPor favor selecciona un producto - Dinero ya insertado`, COLORS.red);

    }
    selectProduct(): void {
        this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));

    }
    dispenseProduct(): void {
        console.log(`%cPor favor selecciona un producto - Antes de despacharlo`, COLORS.red);


    }

}


class DispensingProduct implements State{
    public name: string = 'Despachando producto';
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine){
        this.vendingMachine = vendingMachine;
    }

    insertMoney(): void {
       console.log(`%cPor favor espera a que se entregue el producto - Dinero ya insertado`, COLORS.red);

    }
    selectProduct(): void {
        console.log(`%cProducto seleccionado - Despachando`, COLORS.red);


    }
    dispenseProduct(): void {
        console.log(`%cEntregando producto, por favor inserte dinero`, COLORS.purple);
        this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));

    }

}


async function main(){
    const vendingMachine = new VendingMachine();
    let selectedOption: string | null = '4';

    do{
        console.clear();
        console.log(`Selecciona una opcion: %c${vendingMachine.getStateName()}`, COLORS.pink);
        selectedOption = prompt(
            `
            1. Insertar dinero
            2. Seleccionar producto
            3. Dispensar producto
            4. Salir

            opcion:
            `
        )

        switch(selectedOption){
            case '1':
                vendingMachine.insertMoney()
                break;
            case '2':
                vendingMachine.selectProduct()
                break;
            case '3':
                vendingMachine.dispenseProduct()
                break; 
            case '4':
                console.log('Saliendo del sistema')
                break;     
                default:
                console.log('Opcion no valida')

        }

        await sleep(3000);
    }while(selectedOption === '4');

}

main();