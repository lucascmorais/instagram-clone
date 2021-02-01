import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'instagram-clone';

  constructor(private router: Router) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token !== undefined && token !== null) {
      this.router.navigate(['/home'])
    }
  }
}
