import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material File input
// import { MaterialFileInputModule } from 'ngx-material-file-input'

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule,  MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    // MaterialFileInputModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    // MaterialFileInputModule,
    MatTabsModule
  ],
  providers: [
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MatBottomSheetRef, useValue: {} },
  ]
})
export class MaterialModule { }
