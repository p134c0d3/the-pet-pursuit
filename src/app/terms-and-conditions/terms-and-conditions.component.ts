import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  closeTermsConditions() {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
