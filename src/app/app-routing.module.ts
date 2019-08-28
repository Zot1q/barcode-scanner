import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertContainerInLocationComponent } from './insert-container-in-location/insert-container-in-location.component';


const routes: Routes = [
  { path: 'container',      component: InsertContainerInLocationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
