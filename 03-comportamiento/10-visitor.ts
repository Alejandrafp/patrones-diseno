import { COLORS } from '../helpers/colors.ts';
/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void;
    visitHauntedHouse(hauntedHouse: HauntedHouse): void;
    visitFerrisWheel(ferrisWheel: FerrisWheel): void;

}

interface Attraction {
    accept(visitor: Visitor): void;
    getPrice(): number;
}

class RollerCoaster implements Attraction {
    private price: number = 50;

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitRollerCoaster(this);
    }
}

class HauntedHouse implements Attraction {
    private price: number = 40;

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitHauntedHouse(this);
    }

}

class FerrisWheel implements Attraction {
    private price: number = 30;

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitFerrisWheel(this);
    }
}

class ChildVisitor implements Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`
        Niño en Montaña Rusa: Precio con descuento de $${rollerCoaster.getPrice() * 0.5} 
        `);
    }
    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`
        Niño en Casa Embrujada: Precio con descuento de $${hauntedHouse.getPrice() * 0.7} 
        `);
    }
    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`
        Niño en Rueda de la Fortuna: Precio con descuento de $${ferrisWheel.getPrice() * 0.6} 
        `);
    }

}

class AdultVisitor implements Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`
        Adulto en Montaña Rusa: Precio de $${rollerCoaster.getPrice()} 
        `);
    }
    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`
        Adulto en Casa Embrujada: Precio de $${hauntedHouse.getPrice()} 
        `);
    }
    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`
        Adulto en Rueda de la Fortuna: Precio de $${ferrisWheel.getPrice()} 
        `);
    }

}

class SeniorVisitor implements Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`
        Adulto mayor en Montaña Rusa: Precio con descuento de $${rollerCoaster.getPrice() * 0.85} 
        `);
    }
    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`
        Adulto mayor en Casa Embrujada: Precio con descuento de $${hauntedHouse.getPrice() * 0.85} 
        `);
    }
    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`
        Adulto mayor en Rueda de la Fortuna: Precio con descuento de $${ferrisWheel.getPrice() * 0.85} 
        `);
    }

}

function main() {
    const attractions: Attraction[] = [
        new RollerCoaster,
        new HauntedHouse,
        new FerrisWheel,
    ]

    console.log(`Montaña Rusa: ${new RollerCoaster().getPrice()}`);
    console.log(`Casa Embrujada: ${new HauntedHouse().getPrice()}`);
    console.log(`Rueda de la fortuna: ${new FerrisWheel().getPrice()}`);


    console.log(`\n%cVisitante Niño`, COLORS.blue);
    const childVisitor = new ChildVisitor();
    attractions.forEach(attraction => attraction.accept(childVisitor));

    console.log(`\n%cVisitante Adulto`, COLORS.orange);
    const adultVisitor = new AdultVisitor();
    attractions.forEach(attraction => attraction.accept(adultVisitor));

    console.log(`\n%cVisitante Adulto Mayor`, COLORS.purple);
    const seniorVisitor = new SeniorVisitor();
    attractions.forEach(attraction => attraction.accept(seniorVisitor));
}


main();