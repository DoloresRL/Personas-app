import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map, catchError} from  'rxjs/operators';
import { Persona } from './persona';
import swal from 'sweetalert2';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndPoint:string = 'http://localhost:8080/api/personas';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http : HttpClient,private router: Router) { }

  getPersonas():Observable<Persona[]>{
    return this.http.get<Persona[]>(this.urlEndPoint);

  }

  create(persona:Persona): Observable<Persona>{
    return this.http.post(this.urlEndPoint,persona,{headers:this.httpHeaders}).pipe(
      map((response:any) => response.persona as Persona),
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        console.error(e.error.error);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  delete(id: number):Observable<Persona>{
    return this.http.delete<Persona>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
          swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  getPersona(id): Observable<Persona>{
    return this.http.get<Persona>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/personas']);
        console.error(e.error.mensaje);
        swal.fire('Error',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  update(persona:Persona):Observable <any>{
    return this.http.put<any>(`${this.urlEndPoint}/${persona.id}`,persona,{headers:this.httpHeaders}).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }

}
