import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ErrorMessageService } from '../../../services/error-message.service';
import { SessionService } from '../../../services/session.service';
import { ConverterService } from '../../../services/converter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {Location} from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import swal from 'sweetalert2';

@Component({
  templateUrl: 'users-data-edit.component.html',
  styleUrls: ['users-data-edit.component.scss']
})
export class UsersDataEditComponent implements OnInit {

  public loading = false;
  public url_api = environment.apiUrl.slice(0, -1);
  private url_user_data = environment.apiUrl + 'user';
  private url_user_category = environment.apiUrl + 'user_level';
  private url_upload = environment.apiUrl + 'upload';

  id = '0';
  rows = {};
  rowsCategory = [];
  width = '300';
  isDisabledPassword = true;

  myForm: FormGroup;
  formData: FormData = new FormData();

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
    private deviceService: DeviceDetectorService,
    private _location: Location
  ) { }

  ngOnInit() {
    const sessionData = JSON.parse(this.session.getData());

    this.id = this.route.snapshot.paramMap.get('id');
    this.myForm = new FormGroup({
      user_level_id: new FormControl({value: '', disabled: false}, [Validators.required]),
      email: new FormControl({value: '', disabled: false}, [Validators.required]),
      phone: new FormControl({value: '', disabled: false}, [Validators.required]),
      username: new FormControl({value: '', disabled: false}, [Validators.required]),
      password: new FormControl({value: '', disabled: true}),
      nama: new FormControl({value: '', disabled: false}, [Validators.required]),
      jenis_kelamin: new FormControl({value: '', disabled: false}, [Validators.required]),
      tempat_lahir: new FormControl({value: '', disabled: false}, [Validators.required]),
      tanggal_lahir: new FormControl({value: '', disabled: false}, [Validators.required]),
      alamat: new FormControl({value: '', disabled: false}, [Validators.required]),
      foto: new FormControl({value: environment.apiUrl + 'uploads/sample.jpg', disabled: false}, [Validators.required]),
      is_active: new FormControl({value: true, disabled: false}, [Validators.required]),
    });

    this.getData();
    this.getCategory();
  }

  changeEnablePassword() {
    this.isDisabledPassword = !this.isDisabledPassword;
    if (this.isDisabledPassword) {
      this.myForm.get('password').disable();
    } else {
      this.myForm.get('password').enable();
    }
  }

  getData() {
    const params = '/' + this.id;
    const url = this.url_user_data + params;
    const jsonData = {};

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
          this.rows = response['data'];
          this.setForm(this.rows);
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

  setForm(row) {
    this.myForm.patchValue({
      user_level_id: row['user_level_id'],
      email: row['email'],
      phone: row['phone'],
      username: row['username'],
      nama: row['nama'],
      jenis_kelamin: row['jenis_kelamin'],
      tempat_lahir: row['tempat_lahir'],
      tanggal_lahir: row['tanggal_lahir'],
      alamat: row['alamat'],
      is_active: row['is_active'],
      foto: row['foto'],
    });
  }

  getCategory() {
    const where = {
      is_active: true
    };
    let params = '';
    params = params + '?where=' + JSON.stringify(where);
    params = params + '&sort=name:asc';
    const url = this.url_user_category + params;
    const jsonData = {};

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
          this.rowsCategory = response['data'];
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
            foto: response['data']['path'],
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
    const params = '/' + this.id;
    const url = this.url_user_data + params;
    const jsonData = this.myForm.value;

    if (!this.isDisabledPassword) {
      delete jsonData['paswword'];
    }

    this.loading = true;
    this.httpClient
    .put(url, jsonData, {
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
      text: 'Data berhasil diubah.',
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
