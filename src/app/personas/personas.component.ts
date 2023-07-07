import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html'
})
export class PersonasComponent implements OnInit {

  personas: Persona[];
  paginador: any;
  personaSeleccionado: Persona;
  
  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.personaService.getPersonas().subscribe(
      personas => this.personas = personas
    );
  }

  delete(persona: Persona): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea eliminar a la persona ${persona.nombre} ${persona.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimnar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.delete(persona.id).subscribe(
          response => {
            this.personas = this.personas.filter(cli => cli != persona)//Eliminar de la lista de personas el registro eliminado
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Persona ${persona.nombre} eliminada con éxito`,
              'success'
            )
          }
        )
      }
    })
  }

}
