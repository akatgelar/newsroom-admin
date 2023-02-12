import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ErrorMessageService } from '../../../services/error-message.service';
import { SessionService } from '../../../services/session.service';
import { ConverterService } from '../../../services/converter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {Location} from '@angular/common';
import swal from 'sweetalert2';

export class Category {
  category: string;
}

@Component({
  templateUrl: 'video-add.component.html',
  styleUrls: ['video-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class VideoAddComponent implements OnInit {

  public loading = false;
  public url_api = environment.apiUrl.slice(0, -1);
  private url_video = environment.apiUrl + 'video';
  private url_video_category = environment.apiUrl + 'video_category';
  private url_upload = environment.apiUrl + 'upload';

  // data
  rows = {};
  rowsCategory = [];

  // form
  myForm: FormGroup;
  formData: FormData = new FormData();

  // config
  imageWidth = '300';
  summernoteConfig = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
        ['misc', ['undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'link', 'picture', 'video', 'hr', 'codeview']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  };


  constructor(
    private httpClient: HttpClient,
    private errorMessage: ErrorMessageService,
    private session: SessionService,
    public converter: ConverterService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl({value: '', disabled: false}, [Validators.required]),
      category: new FormControl({value: null, disabled: false}, [Validators.required]),
      tags: new FormControl({value: '', disabled: false}, [Validators.required]),
      image: new FormControl({value: '/uploads/sample.jpg', disabled: false}, [Validators.required]),
      link_type: new FormControl({value: '', disabled: false}, [Validators.required]),
      link: new FormControl({value: '', disabled: false}, [Validators.required]),
      desc_short: new FormControl({value: '', disabled: false}, [Validators.required]),
      desc_long: new FormControl({value: '', disabled: false}, [Validators.required]),
      creator: new FormControl({value: '', disabled: false}, [Validators.required]),
      source: new FormControl({value: '', disabled: false}, [Validators.required]),
      notes: new FormControl({value: null, disabled: false}, []),
      is_active: new FormControl({value: true, disabled: false}, [Validators.required]),
    });

    this.getCategory();
  }

  getCategory() {
    const url = this.url_video_category;
    this.loading = true;
    this.httpClient
    .get(url, {
      reportProgress: true,
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.session.getToken().toString()
      })
    })
    .subscribe(
      response => {
        this.loading = false;
        if (response['success'] === true) {
          this.rowsCategory = response['data'].map(item => {
            const temp = new Category();
            temp.category = item.category;
            return temp;
          });
        }
      },
      error => {
        this.loading = false;
      }
    );
  }

  addCategory(name) {
    return { category: name };
  }

  onImage(event) {
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.formData.append('file', file, file.name);

    const params = '';
    const url = this.url_upload + params;

    this.loading = true;
    this.httpClient
    .post(url, this.formData, {
      reportProgress: true,
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.session.getToken().toString()
      })
    })
    .subscribe(
      response => {
        this.loading = false;
        if (response['success'] === true) {
          this.myForm.patchValue({
            image: response['data']['path'],
          });
        } else {
          this.errorMessage.openErrorSwal(response['message']);
        }
      },
      error => {
        this.loading = false;
        try {
          this.errorMessage.openErrorSwal(error['error']['message']);
        } catch (e) {
          this.errorMessage.openErrorSwal(error['message']);
        }
      }
    );
  }

  onSubmit() {
    const params = '';
    const url = this.url_video + params;
    const jsonData = this.myForm.value;

    jsonData['tags'] = jsonData['tags'].toString();

    this.loading = true;
    this.httpClient
    .post(url, jsonData, {
      reportProgress: true,
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.session.getToken().toString()
      })
    })
    .subscribe(
      response => {
        this.loading = false;
        if (response['success'] === true) {
          this.rows = response['data'];
          this.showSuccess(this.rows);
        } else {
          this.errorMessage.openErrorSwal(response['message']);
        }
      },
      error => {
        this.loading = false;
        try {
          this.errorMessage.openErrorSwal(error['error']['message']);
        } catch (e) {
          this.errorMessage.openErrorSwal(error['message']);
        }
      }
    );
  }

  showSuccess(row) {
    swal.fire({
      title: 'Informasi!',
      text: 'Data berhasil ditambahkan.',
      icon: 'success',
      allowOutsideClick: false,
    }).then(() => {
      this.showBack();
    });
  }

  showBack() {
    this._location.back();
  }

}
