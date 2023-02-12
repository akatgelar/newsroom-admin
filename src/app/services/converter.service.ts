import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Injectable()
export class ConverterService {

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  formatDateIndoTglJam(date: string) {
    if (date) {
      moment.locale('id');
      const new_date = moment(date).format('DD MMMM YYYY hh:mm:ss') ;
      return new_date;
    } else {
      return null;
    }
  }

  formatDateIndoTgl(date: string) {
    if (date) {
      moment.locale('id');
      const new_date = moment(date).format('DD MMMM YYYY') ;
      return new_date;
    } else {
      return null;
    }
  }

  formatDateDMY(date: string) {
    if (date) {
      moment.locale('id');
      const new_date = moment(date).format('DD-MM-YYYY') ;
      return new_date;
    } else {
      return null;
    }
  }

  formatDateYMD(date: string) {
    if (date) {
      moment.locale('id');
      const new_date = moment(date).format('YYYY-MM-DD') ;
      return new_date;
    } else {
      return null;
    }
  }

  formatRupiah(angka) {
    if (angka) {
      const prefix = 'Rp. ';
      const number_string = angka.toString().replace(/[^,\d]/g, '');
      const split = number_string.split(',');
      const sisa = split[0].length % 3;
      const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
      let rupiah = split[0].substr(0, sisa);

      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        const separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }

      rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;

      // tslint:disable-next-line:radix
      if (parseInt(angka) < 0) {
        return prefix === undefined ? rupiah : (rupiah ? '- Rp. ' + rupiah : '');
      } else {
        return prefix === undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
      }
    } else {
      return 'Rp. 0';
    }
  }

  formatSlug(input: string) {
    const str = input.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text

    return str.substring(0, 30);
  }

  removeHtml(input: string) {
    return input.replace(/(<([^>]+)>)/ig, '');
  }

  safeUrl(value: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
