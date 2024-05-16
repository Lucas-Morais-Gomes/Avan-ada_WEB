import { Routes, RouterModule } from "@angular/router";
import { MentorComponent } from "../mentor/mentor.component";
import { StudentComponent } from "../student/student.component";
import { ProductComponent } from "../product/product.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo:'/product', pathMatch: 'full'},
    {path: 'product', component: ProductComponent},
    {path: 'mentors', component: MentorComponent},
    {path: 'students', component: StudentComponent}
];

export const myrouting = RouterModule.forRoot(APP_ROUTES);