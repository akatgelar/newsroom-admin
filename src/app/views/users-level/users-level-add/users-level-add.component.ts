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
  templateUrl: 'users-level-add.component.html',
  styleUrls: ['users-level-add.component.scss']
})
export class UsersLevelAddComponent implements OnInit {

  public loading = false;
  private url_user_level = environment.apiUrl + 'user_level';
  private url_upload = environment.apiUrl + 'upload';

  rows = {};
  width = '300';

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

    this.myForm = new FormGroup({
      name: new FormControl({value: '', disabled: false}, [Validators.required]),
      description: new FormControl({value: '', disabled: false}, [Validators.required]),
      is_active: new FormControl({value: true, disabled: false}, [Validators.required]),
    });
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
    const url = this.url_user_level + params;
    const jsonData = this.myForm.value;

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
