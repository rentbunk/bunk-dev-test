import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  { path: 'result', component: ResultComponent },
  { path: 'list', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
