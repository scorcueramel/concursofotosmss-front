import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  wait(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere un momento por favor...'
    });
    Swal.showLoading();
  }

  close(): void {
    Swal.close();
  }

  error(mensaje: string): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'error',
      text: mensaje
    });
  }

  success( mensaje: string, fn: () => void ): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      text: mensaje
    }).then(() => fn() );
  }

  confirm( titulo: string, mensaje: string, fn: () => void ): void {
    Swal.fire({
      icon: 'question',
      title: titulo,
      html: mensaje,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        fn();
      }
    });
  }
}
