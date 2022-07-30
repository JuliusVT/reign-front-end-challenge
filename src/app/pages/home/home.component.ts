import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  navigation$ = this.activatedRoute.firstChild?.url.pipe(map(([{ path }]) => path));
  
  radio: FormControl = new FormControl()
 
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.navigation$?.subscribe(path => { this.radio.setValue(path)})
  }
  
  handleViewChange() {
    this.router.navigate([`/news/${this.radio.value}`]);
  }
}
