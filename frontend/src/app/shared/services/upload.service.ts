import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private http = inject(HttpClient);

  uploadImage(file: File): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', environment.cloudinary.uploadPreset);
    data.append('cloud_name', environment.cloudinary.cloudName);

    const url = `https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`;

    return this.http.post(url, data);
  }
}
