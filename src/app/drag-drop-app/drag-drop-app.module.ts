import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DragDropAppRoutingModule } from './drag-drop-app-routing.module';
import { FilesPageComponent } from './files-page/files-page.component';

import { FileUploadModule } from "primeng/fileupload";
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    FilesPageComponent
  ],
  imports: [
    CommonModule,
    DragDropAppRoutingModule,
    FileUploadModule,
    ButtonModule
  ],
  providers:[]
})
export class DragDropAppModule { }
