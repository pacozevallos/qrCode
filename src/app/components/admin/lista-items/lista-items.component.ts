import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EliminarItemComponent } from '../eliminar-item/eliminar-item.component';
import { EditarItemComponent } from '../editar-item/editar-item.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/classes/item';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Negocio } from 'src/app/classes/negocio';
import { CrearItemComponent } from '../crear-item/crear-item.component';

@Component({
  selector: 'app-lista-items',
  templateUrl: './lista-items.component.html',
  styleUrls: ['./lista-items.component.scss']
})
export class ListaItemsComponent implements OnInit {

  // @Input() idNegocio: string;
  idNegocio: string;
  negocio: Negocio;
  items: Item[] = [];
  itemsGroup = [];

  displayedColumns = [ 'imagen', 'nombre', 'categoria', 'destacado', 'publicado', 'mas'];
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
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.idNegocio = params.id;
      this.afs.doc('negocios/' + this.idNegocio).valueChanges().subscribe( (res: Negocio) => {
        this.negocio = res;
      });
    });


    this.fs.getAllItemsDocument(this.idNegocio).subscribe( res => {
      this.itemsData.data = res;
    });

    this.itemsData.paginator = this.paginator;

    // this.sort.sort(({
    //   id: 'categoria',
    //   start: 'asc'
    // }) as MatSortable);
    // this.itemsData.sort = this.sort;


    this.fs.getAllItemsDocument(this.idNegocio).subscribe( res => {
      this.items = res;
      console.log(this.items);
      this.itemsGroup = this.items.reduce((prev, { categoria, ...items }) => {
        const id = prev.findIndex((item) => item.categoria === categoria);
        const cat = 'xxx';
        id >= 0
          ? prev[id].items.push({...items, categoria})
          : prev.push({categoria, items: [{...items, categoria}]});
        return prev;
      }, []);
      console.log(this.itemsGroup);
    });

  }

  duplicarItems() {

    this.items.forEach( item => {
      return this.afs.collection('negocios').doc('yahis-fofuras').collection('items').doc().set(item)
      .then( () => {
        console.log('item copiado');
      });
    });

  }

  agregarItem() {
    this.bottomSheet.open(CrearItemComponent, {
      // panelClass: 'myBottomSheetFull',
      data: this.negocio
    });
  }

  actualizarPublicado(idItem, change: MatSlideToggleChange) {
    // this.fs.updatePublicado(key, e);
    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(idItem).update({
      publicado: change.checked
    });
  }

  openModalEdit(item) {
    this.bottomSheet.open(EditarItemComponent, {
      data: {
        idNegocio: this.idNegocio,
        item
      }
    });
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
