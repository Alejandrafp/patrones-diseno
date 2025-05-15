import Logger from "https://deno.land/x/logger@v1.1.7/logger.ts";

// TODO: Implementar el LoggerAdapter


interface ILoggerAdapter {
    file: string;

    writeLog: (msg: string) => void;
    writeWarning: (msg: string) => void;
    writeError: (msg: string) => void;

}


export class DenoLoggerAdapter implements ILoggerAdapter{
    public file: string;
    private logger = new Logger();

    constructor(file: string){
        this.file = file;
    }

    writeLog(msg: string){
        this.logger.info(`[${this.file} Log ] ${ msg }`);
    };

    writeWarning(msg: string){
        this.logger.warn(`[${this.file} Warning ] ${ msg }`);
    };
    writeError(msg: string){
        this.logger.error(`[${this.file} Error ] ${ msg }`);
    };
}

// const logger = new Logger();