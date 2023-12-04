import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'files',
    loadChildren: ()=> import('./drag-drop-app/drag-drop-app.module').then((m)=>m.DragDropAppModule)
  },
  {
    path: '**',
    redirectTo: 'files'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
