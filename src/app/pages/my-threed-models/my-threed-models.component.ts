import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ModelService } from '../../services/model.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ModelAddEditDialogComponent } from '../../components/model-add-edit-dialog/model-add-edit-dialog.component';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-my-threed-models',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './my-threed-models.component.html',
  styleUrl: './my-threed-models.component.css'
})
export class MyThreedModelsComponent implements OnInit{

  ngOnInit(): void {
    this.getModels();
  }

  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  
  displayedColumns:String[]=[
    'id',
    'name',
    'category',
    'description',
    'price',
    'createdAt',
    'action',
  ];

  _mdlService=inject(ModelService);
  _dialog=inject(MatDialog);
  _coreService=inject(CoreService);

  getModels(){
    this._mdlService.getModels().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error: console.log,

    });

  }
  openAddModelForm(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    const dialogRef=this._dialog.open(ModelAddEditDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getModels();
        }
      }
    });

  }
  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

  }
  openEditForm(data:any){
   

    const dialogRef=this._dialog.open(ModelAddEditDialogComponent,{data},);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getModels();
        }
      }
    });

  }
  deleteModel(id:String){
    this._mdlService.deleteModeling(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar('3d Model deleted!','done');
        this.getModels();
      },
      error:(error)=>{
        this._coreService.openSnackBar('Error deleting','done.')
      }
    })

  }

}
