import {Component} from '@angular/core';
/*Decorador -> component:
Decorador de rol que cumplirá la clase*/
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls:['./footer.component.css']
})

export class FooterComponent {
  public autor: any = {nombre:'Dolores', apellido: 'Reyes'};
}