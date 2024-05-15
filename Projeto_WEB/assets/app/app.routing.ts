import { Routes, RouterModule } from "@angular/router";
import { MentorComponent } from "../mentor/mentor.component";
import { StudentComponent } from "../student/student.component";
import { SubjectComponent } from "../subject/subject.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo:'/subjects', pathMatch: 'full'},
    {path: 'subjects', component: SubjectComponent},
    {path: 'mentors', component: MentorComponent},
    {path: 'students', component: StudentComponent}
];

export const myrouting = RouterModule.forRoot(APP_ROUTES);