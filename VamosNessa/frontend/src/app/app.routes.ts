import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './student/student.component';
import { MentorComponent } from './mentor/mentor.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
  { path: 'students', component: StudentComponent },
  { path: 'mentors', component: MentorComponent },
  { path: 'products', component: ProductComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
