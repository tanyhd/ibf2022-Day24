import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WebcamImage } from "ngx-webcam";
import { lastValueFrom } from "rxjs";

@Injectable()
export class PostService {

  constructor(private http: HttpClient) {}

  postPost(data: any) {
    return (lastValueFrom(
      this.http.post("http://localhost:8080/post/s3", data)
    ))
  }
}
