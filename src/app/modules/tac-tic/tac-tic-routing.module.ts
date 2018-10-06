import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrapperComponentComponent } from './components/wrapper-component/wrapper-component.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TacTicRoutingModule { }
