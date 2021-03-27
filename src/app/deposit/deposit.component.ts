import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
=======
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
>>>>>>> Stashed changes

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

<<<<<<< Updated upstream
  constructor() { }
=======
  constructor(
      private creadorFormulario: FormBuilder,
      private router: Router,
  ) { }
>>>>>>> Stashed changes

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
