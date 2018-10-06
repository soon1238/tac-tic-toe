import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', pathMatch: 'full', loadChildren: './modules/tac-tic/tac-tic.module#TacTicModule' },
    { path: '**', redirectTo: '/' }
];


@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }