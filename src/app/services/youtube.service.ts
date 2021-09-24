import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey = environment.apiKey;
  apiUrl = 'https://www.googleapis.com/youtube/v3/search'
  getOneUrl = 'https://www.googleapis.com/youtube/v3/videos'
  getCommentsUrl = 'https://www.googleapis.com/youtube/v3/commentThreads'

  constructor (public http: HttpClient) { }

  getVideos (query: string): Observable <any> {
    const url = `${this.apiUrl}?q=${query}&key=${this.apiKey}&part=snippet&type=video&maxResults=10`;
    return this.http.get(url)
      .pipe(
        map((response: any) => response.items)
      )
  }

  getVideo (id: string): Observable <any> {
    const url = `${this.getOneUrl}?key=${this.apiKey}&part=player,snippet,statistics&id=${id}`
    return this.http.get(url)
  }

  getComments (videoId) {
    const url = `${this.getCommentsUrl}?key=${this.apiKey}&part=snippet&textFormat=plainText&videoId=${videoId}&maxResults=100`
    return this.http.get(url)
  }


}
