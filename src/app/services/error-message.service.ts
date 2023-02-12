import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable()

export class ErrorMessageService {

    constructor(private router: Router) { }

    // error message action
    errorserver() {
        swal.fire(
            'Infomation!',
            'Can\'t connect to server.',
            'error'
        );
    }

    // not found
    notfound() {
        swal.fire(
            'Infomation!',
            'Data not found.',
            'error'
        );
    }

    // success notification
    openSuccessSwal(message) {
        swal.fire({
            title: 'Information!',
            text: message,
            icon: 'success',
            allowOutsideClick: false
        });
    }

    // success notification
    openErrorSwal(message) {
        if (message === 'Email is already taken.') {
            message = 'Username sudah dipakai.';
        }
        swal.fire({
            title: 'Information!',
            text: message,
            icon: 'error',
            allowOutsideClick: false
        });
    }



}
