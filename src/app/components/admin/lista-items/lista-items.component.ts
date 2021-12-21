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

  displayedColumns = [ 'nombre', 'categoria', 'precio', 'precioDescuento', 'publicado'];
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
      data: item
    });
    dialogRef.afterClosed().subscribe();
  }

  trackByPublicado(item) {
    return item.publicado;
  }

}
