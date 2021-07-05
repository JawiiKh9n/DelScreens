import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';


@Component(
{
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{

  form: FormGroup;
  showError = false;
  error: string;
  constructor(private router: Router, private service: ServiceService, private formBuilder: FormBuilder ) 
  { 
  }

  ngOnInit(): void 
  {
    this.form = this.formBuilder.group(
  {
    EmailAddress: ['', Validators.required],
    Password: ['', Validators.required],
  });
  }

  register()
  {
    this.router.navigate(["register"])
  }
  login(form)
  {
    this.service.Login(form).subscribe((res:any) => 
      { 
      console.log(res)
        if (!res.Error)
        {
        this.router.navigate(["report"]);    
        this.showError = false;
        }
      })
  }

}
