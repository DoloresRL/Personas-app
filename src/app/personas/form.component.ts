import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { Router,ActivatedRoute} from '@angular/router';
import swall from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public persona:Persona = new Persona();
  public titulo:string = "Crear persona";
  public errores:string[];

  constructor(private personaService:PersonaService, private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPersona()
  }

  cargarPersona(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id =params['id']
      if(id){
        console.log("EL IDE ES:",id);
        this.personaService.getPersona(id).subscribe( (persona) => this.persona = persona )
      }
    })
  }

  public create(): void{
    console.log("Clicked!");
    console.log(this.persona);
    this.personaService.create(this.persona)
    .subscribe(Persona => {
      this.router.navigate(['/personas'])
      swall.fire('Nuevo Registro',`Persona ${Persona.nombre} creada con éxito`,'success')
    },
    err =>{
      this.errores = err.error.errors as string[];

      console.error("Código del error desde el backend: "+err.status);
      console.error(err.error.errors);
    })
  }

  update(): void{
    console.log("Entró a update");
    this.personaService.update(this.persona)
    .subscribe(response => {
      this.router.navigate(['/personas'])
      swall.fire('Registro Actualizado',`  ${response.mensaje}:${response.persona.nombre} `,'success')
    },
    err =>{
      this.errores = err.error.errors as string[];

      console.error("Código del error desde el backend: "+err.status);
      console.error(err.error.errors);
    })
  }

}
