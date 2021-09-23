import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() currentComponent = 'search'
  @Input() currentId: string
  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    console.log(this.currentComponent)
  }

  goToVideo () {
    this.router.navigateByUrl('/video/' + this.currentId)
  }
  goToComments () {
    this.router.navigateByUrl('/comments/' + this.currentId)
  }
  goToSearch () {
    this.router.navigateByUrl('/search')
  }
  back(): void {
    this.location.back()
  }

}
