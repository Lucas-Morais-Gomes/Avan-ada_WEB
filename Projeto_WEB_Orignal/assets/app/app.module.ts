import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentComponent } from '../student/student.component';
import { RouterOutlet } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { MentorComponent } from '../mentor/mentor.component';
import { myrouting } from './app.routing';
import { StudentService } from '../../services/student.service';
import { SubjectComponent } from '../subject/subject.component';
import { SubjectService } from '../../services/subject.service';
import { MentorService } from '../../services/mentor.service';


@NgModule({
    declarations: [
        AppComponent,
        StudentComponent,
        HeaderComponent,
        MentorComponent,
        SubjectComponent
    ],
    imports: [BrowserModule, FormsModule, HttpClientModule, HttpModule, myrouting],
    providers: [StudentService, MentorService, SubjectService],
    bootstrap: [AppComponent]
})
export class AppModule {

}