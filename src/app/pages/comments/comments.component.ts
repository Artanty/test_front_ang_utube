import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute,Router} from "@angular/router";
import {YoutubeService} from "@services/youtube.service";
import {Location} from "@angular/common";
import {skipWhile, map} from "rxjs/operators";
import {format, parseISO} from 'date-fns';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  id: string
  comments: any
  error: any = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utube: YoutubeService,
    private _sanitizer: DomSanitizer,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      skipWhile((a: any) => a== undefined)).subscribe(params => {
      this.id = params['id']
      if (params['id']) {
        this.getComments(params['id'])
      }
    })
  }

  getComments (id) {
    this.utube.getComments(id).pipe(
      map((e: any) => e.items)
      ).subscribe((res: any) => {
        this.comments = res.map((el: any) => {
            el.publishedAt = format(parseISO(el.snippet.topLevelComment.snippet.publishedAt),'dd-MM-yyyy HH:mm')
            el.likes = el.snippet.topLevelComment.snippet.likeCount
            return el
          })

    }, (err) => {
      console.log('error: ' + err)
      this.error = err.message
    })
  }
}
