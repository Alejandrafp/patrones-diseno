/**
 * ! Patron builder
 * **/

import { COLORS } from "../helpers/colors.ts";

class Computer {
  public cpu: string = "cpu - not defined";
  public ram: string = "ram - not defined";
  public storage: string = "storage - not defined";
  public gpu: string = "gpu - not defined";

  displayConfiguration() {
    console.log(`Configuracion de la computadora:
            CPU${this.cpu}
            RAM${this.ram}
            STORAGE${this.storage}
            GPU${this.gpu}
            `);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  build() {
    return this.computer;
  }
}

function main(){
    const basicComputer: Computer = new ComputerBuilder()
        .setCPU(' Intel Core 2 Dúo')
        .setRAM(' 4GB')
        .setStorage(' 256GB')
        .build();

        console.log('%c\nComputadora basica:\n', COLORS.violet);
        basicComputer.displayConfiguration();


        const gamerComputer: Computer = new ComputerBuilder()
        .setCPU(' Intel Core i7')
        .setRAM(' 16GB')
        .setStorage(' 1TB M2')
        .setGPU(' Nvidia RTX 5090')
        .build();

        console.log('%c\nComputadora Gamer:\n', COLORS.violet);
        gamerComputer.displayConfiguration();
}


main();