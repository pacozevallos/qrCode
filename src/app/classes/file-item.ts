export class FileItem {

  archivo: File;
  nameArchivo: string;
  typeArchivo: string;
  sizeArchivo: number;
  url: string;
  estaSubiendo: boolean;
  progreso: any;
  imgUrl: any;

  constructor( archivo: File ) {
    this.archivo = archivo;
    this.nameArchivo = archivo.name;
    this.typeArchivo = archivo.type;
    this.sizeArchivo = archivo.size;
    this.estaSubiendo = false;
    this.progreso = 0;
  }

}