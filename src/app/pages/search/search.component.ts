import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {fromEvent} from 'rxjs';
import {debounceTime,  map,  distinctUntilChanged, filter} from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  videos: any[]
  isSearching = false


  constructor(
    private utube: YoutubeService
  ) { }

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      filter(res => res.length > 1),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text: string) => {

      this.isSearching = true;
      this.utube.getVideos(text).subscribe((res) => {
        this.isSearching = false;
        this.videos = res
      }, (err) => {
        console.log('error: ' + err)
        this.isSearching = false;
      })
    })
  }


}
