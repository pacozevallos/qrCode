import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EliminarItemComponent } from '../eliminar-item/eliminar-item.component';

@Component({
  selector: 'app-lista-items',
  templateUrl: './lista-items.component.html',
  styleUrls: ['./lista-items.component.scss']
})
export class ListaItemsComponent implements OnInit {

  @Input() idNegocio: string;

  displayedColumns = [ 'nombre', 'id', 'categoria', 'precio', 'precioDescuento', 'destacado', 'publicado', 'mas'];
  itemsData = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.itemsData.filter = filterValue;
  }

  constructor(
    private fs: FirebaseService,
    private afs: AngularFirestore,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fs.getAllItemsDocument(this.idNegocio).subscribe( res => {
      this.itemsData.data = res;
    });
  }

  actualizarPublicado(idItem, publicado) {
    // this.fs.updatePublicado(key, e);
    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(idItem).update({publicado});
  }

  openModalDelete(item) {
    const dialogRef = this.dialog.open(EliminarItemComponent, {
      panelClass: 'dialogSmall',
      data: {idNegocio_: this.idNegocio, item_: item}
    });
    dialogRef.afterClosed().subscribe();
  }

  updateDestacado(idNoticia, destacado) {
    this.afs.doc('noticias/' + idNoticia).update({ destacado });
  }

  actualizarDestacado(itemId, $event) {
    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(itemId).update({
      destacado: $event
    });
  }

  trackByPublicado(item) {
    return item.publicado;
  }

}
