import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component(
{
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit 
{
  form: FormGroup;

  constructor(private router: Router, private service: ServiceService, private formBuilder: FormBuilder ) 
  { 
  }

  ngOnInit(): void 
  {
    this.form = this.formBuilder.group(
    {
      Name: ['', Validators.required],
      EmailAddress: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  login()
  {
    this.router.navigate(["login"])
  }
  
  register(form)
  {
    this.service.Register(form).subscribe((res:any) => 
    { 
      this.router.navigate(["login"]);    
    });
  }


}
