import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorMessageService } from '../../services/error-message.service';
import { SessionService } from '../../services/session.service';
import { ConverterService } from '../../services/converter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {Location} from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import swal from 'sweetalert2';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public loading = false;
  private url_profile = environment.apiUrl + 'profile';
  private url_user_data = environment.apiUrl + 'user';
  private url_user_category = environment.apiUrl + 'user_level';
  private url_upload = environment.apiUrl + 'upload';
  environment = environment;

  rows = {};
  rowsCategory = [];

  myForm: FormGroup;
  formData: FormData = new FormData();

  isMobile: boolean;
  isPassword: boolean;
  width = '300';
  id = '0';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
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
    const sess = JSON.parse(this.session.getData());
    this.id = sess['id'].toString();
    this.myForm = new FormGroup({
      user_level_id: new FormControl({value: '', disabled: false}, [Validators.required]),
      email: new FormControl({value: '', disabled: false}, [Validators.required]),
      phone: new FormControl({value: '', disabled: false}, [Validators.required]),
      username: new FormControl({value: '', disabled: false}, [Validators.required]),
      nama: new FormControl({value: '', disabled: false}, [Validators.required]),
      jenis_kelamin: new FormControl({value: '', disabled: false}, [Validators.required]),
      tempat_lahir: new FormControl({value: '', disabled: false}, [Validators.required]),
      tanggal_lahir: new FormControl({value: '', disabled: false}, [Validators.required]),
      alamat: new FormControl({value: '', disabled: false}, [Validators.required]),
      foto: new FormControl({value: environment.apiUrl + 'uploads/sample.jpg', disabled: false}, [Validators.required]),
      is_active: new FormControl({value: true, disabled: false}, [Validators.required]),
    });
    this.isMobile = this.deviceService.isMobile();
    if (this.isMobile) {
      this.width = '150';
    }
    this.isPassword = false;
    this.getData();
    this.getCategory();
  }

  changeStatPassword() {
    this.isPassword = !this.isPassword;
  }

  getData() {
    const params = '/' + this.id;
    const url = this.url_profile;
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
          this.id = response['data']['id'];
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
    const params = '/' + this.id;
    const url = this.url_user_data + params;
    const jsonData = this.myForm.value;

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
    this.router.navigate(['dashboard']);
  }


}
