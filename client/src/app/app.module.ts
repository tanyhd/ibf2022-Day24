import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostItemComponent } from './post-item/post-item.component';
import {WebcamModule} from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SnapShotComponent } from './snap-shot/snap-shot.component';

const  appRoutes: Routes = [
  { path: "", component: SnapShotComponent},
  { path: "post", component: PostItemComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    PostItemComponent,
    SnapShotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
