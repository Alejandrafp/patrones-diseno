/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 */

import { COLORS } from '../helpers/colors.ts';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connected: boolean = false;

  // Constructor privado para evitar instancias directas
  private constructor() {
  }

  // Método estático para obtener la instancia única
  public static getInstance(): DatabaseConnection {
    // Completar: implementar el patrón Singleton
    if(!DatabaseConnection.instance){
    DatabaseConnection.instance = new DatabaseConnection();
    console.log('\n%cLa base de datos ha sido conectada.', COLORS.orange);
  }
    return DatabaseConnection.instance; 
  }

  // Método para conectar a la base de datos
  public connect(): void {
    // Completar: si no está conectado, mostrar mensaje de conexión
    if(this.connected){
      console.log(`%cYa estabamos conectados a la base de datos.`, COLORS.blue);
      return;
    }

    this.connected = true;
      console.log(`%cNueva conexion a la base de datos.`, COLORS.green);

  }

  // Método para desconectar de la base de datos
  public disconnect(): void {
    // Completar: desconectar y mostrar mensaje de desconexión
     if(this.connected){
      console.log(`%cDesconectamos la conexion la base de datos.`, COLORS.red);
      this.connected = false;
      return;
    }
      console.log(`%cNo hay una conexion activa a la base de datos.`, COLORS.brown);
  }
}

// Pruebas
function main() {
  const db1 = DatabaseConnection.getInstance();
  db1.connect(); // Debería conectar a la base de datos

  const db2 = DatabaseConnection.getInstance();
  db2.connect(); // Debería mostrar que ya existe una conexión activa

  console.log('Son iguales:', db1 === db2); // Debería mostrar true

  db1.disconnect(); // Debería cerrar la conexión
  db2.disconnect();
  db2.connect(); // Ahora debería conectar de nuevo, ya que se cerró la anterior
}

main();
