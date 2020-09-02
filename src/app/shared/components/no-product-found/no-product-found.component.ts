import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-no-product-found',
  templateUrl: './no-product-found.component.html',
  styleUrls: ['./no-product-found.component.css']
})
export class NoProductFoundComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() goToMessage: string;
  @Input() goToLink: string;

  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

}
