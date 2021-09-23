import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {YoutubeService} from "../../services/youtube.service";

import {map, skipWhile} from 'rxjs/operators';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';



@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  id: number
  video: any
  safeURL: SafeResourceUrl
  ready = false

  constructor(
    private route: ActivatedRoute,
    private utube: YoutubeService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      skipWhile((a: any) => a== undefined)).subscribe(params => {
      this.id = params['id']
      if (params['id']) {
        this.getVideo(params['id'])
      }
    })
  }

  getVideo (id) {
    this.utube.getVideo(id).pipe(
      map((e: any) => e.items)
    ).subscribe((res) => {
      this.video = res[0]
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.id)
      this.ready = true
    }, (err) => {
      console.log('error: ' + err)
    })
  }

}
