import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {WebcamImage, WebcamInitError, WebcamUtil, WebcamMirrorProperties} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  form!: FormGroup;
  img!: string;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      poster: this.fb.control(""),
      comment: this.fb.control("")
    })

    this.img = history.state.data

  }

  public post() {
    const formData = new FormData();
    const b64string = this.img;

    formData.set('image', this.dataURItoBlob(b64string))
    formData.set('comment', this.form.value.comment)
    formData.set('poster', this.form.value.poster)
    this.postService.postPost(formData)
  }

  homePage() {
    this.router.navigate([''])
  }

  dataURItoBlob(dataURI: string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;

  }

}
