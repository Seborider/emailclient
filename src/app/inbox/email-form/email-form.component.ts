import { Component, OnInit, Input, } from '@angular/core';
import { Email } from '../email';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  emailForm!: FormGroup
  @Input() email!: Email

  constructor() { }

  ngOnInit(): void {
    const { subject, from, to, text } = this.email

    this.emailForm = new FormGroup({
      to: new FormControl(to),
      from: new FormControl(from),
      subject: new FormControl(subject),
      text: new FormControl(text)
    })
  }

}
