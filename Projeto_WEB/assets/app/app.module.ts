import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../header/header.component';
import { StudentComponent } from '../student/student.component';
import { MentorComponent } from '../mentor/mentor.component';
import { ProductComponent } from '../product/product.component';
import { myrouting } from './app.routing'; // Importe o arquivo de rotas

import { StudentService } from '../../services/student.service';
import { MentorService } from '../../services/mentor.service';
import { ProductService } from '../../services/product.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        StudentComponent,
        MentorComponent,
        ProductComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        myrouting // Adicione o RouterModule com as rotas
    ],
    providers: [StudentService, MentorService, ProductService],
    bootstrap: [AppComponent]
})
export class AppModule {}
