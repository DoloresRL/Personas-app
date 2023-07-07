import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonasComponent } from './personas/personas.component';
import { RouterModule, Routes} from '@angular/router';
import { FormComponent } from './personas/form.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
 
  {path: 'personas', component: PersonasComponent},
  {path: 'personas/form', component: FormComponent},
  {path: 'personas/form/:id', component: FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PersonasComponent,
    FormComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
