import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatPaginator as MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource as MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EliminarItemComponent } from '../eliminar-item/eliminar-item.component';
import { EditarItemComponent } from '../editar-item/editar-item.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/classes/item';
import { MatSlideToggleChange as MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Negocio } from 'src/app/classes/negocio';
import { CrearItemComponent } from '../crear-item/crear-item.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  value;

  user;

  displayedColumns = [ 'imagen', 'nombre', 'categoria', 'destacado', 'publicado', 'opciones'];
  itemsData = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.itemsData.filter = filterValue;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.itemsData.filter = filterValue.trim().toLowerCase();
  }



  constructor(
    private fs: FirebaseService,
    private afs: AngularFirestore,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {

    this.afAuth.authState.subscribe( user => {
      this.user = user;

      this.afs.collection('negocios').valueChanges().subscribe( (res: Negocio[]) => {
        const negocioRef = res.find( (find: Negocio) => find.autorId === this.user.uid );
        this.negocio = negocioRef;
        this.idNegocio = this.negocio.id;
        this.fs.getAllItemsDocument(this.idNegocio).subscribe( data => {
          this.itemsData.data = data;
        });
        
      });

    });


    this.itemsData.paginator = this.paginator;

    // this.sort.sort(({
    //   id: 'categoria',
    //   start: 'asc'
    // }) as MatSortable);
    // this.itemsData.sort = this.sort;


    // this.fs.getAllItemsDocument(this.idNegocio).subscribe( res => {
    //   this.items = res;
    //   this.itemsGroup = this.items.reduce((prev, { categoria, ...items }) => {
    //     const id = prev.findIndex((item) => item.categoria === categoria);
    //     const cat = 'xxx';
    //     id >= 0
    //       ? prev[id].items.push({...items, categoria})
    //       : prev.push({categoria, items: [{...items, categoria}]});
    //     return prev;
    //   }, []);
    // });

     // Para filtrar objetos anidados, incluye minusculas
    this.itemsData.filterPredicate = (data: any, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

  }

  clearFilters() {
    this.itemsData.filter = '';
    this.value = '';
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
      data: this.negocio
    });
  }

  actualizarPublicado(idItem, change: MatSlideToggleChange) {
    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(idItem).update({
      publicado: change.checked
    });
  }

  openModalEdit(item) {
    this.bottomSheet.open(EditarItemComponent, {
      data: {
        idNegocio: this.negocio.id,
        item
      }
    });
  }

  openModalDelete(item) {
    const dialogRef = this.dialog.open(EliminarItemComponent, {
      panelClass: 'dialogSmall',
      data: {
        idNegocio: this.idNegocio,
        item
      }
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

// https://firebasestorage.googleapis.com/v0/b/qrcode-3b121.appspot.com/o/imagesItems%2FInqd05TPL5eKWV2t0Xga%2FJ2CgzGSeAsEOZElFX6W8.jpg?alt=media&token=504e56b3-a74d-4cb3-bcb5-d8442c4a5940

// https://firebasestorage.googleapis.com/v0/b/qrcode-3b121.appspot.com/o/imagesItems%2Fnovotel-cusco%2FJ2CgzGSeAsEOZElFX6W8.jpg?alt=media&token=00891eb3-c4cd-4803-9d69-5aff9907eada
