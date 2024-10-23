import { Component, OnInit } from '@angular/core';
import { BirthdayService } from './birthday-card.service';
import { Employee } from '../Interface/employee.model';

@Component({
  selector: 'app-birthday-card',
  templateUrl: './birthday-card.component.html',
  styleUrls: ['./birthday-card.component.scss']  // Corrected property name
})
export class BirthdayCardComponent implements OnInit {

 
  todayBirthdays: Employee[] = [];

  constructor(private birthdayService: BirthdayService) { }

  ngOnInit(): void {
    this.birthdayService.getTodayBirthdays().subscribe(
      (employees: Employee[]) => {
        const todayDate = new Date();
        const todayDay = todayDate.getDate();
        const todayMonth = todayDate.getMonth();

        this.todayBirthdays = employees.filter(employee => {
          
          const dob = new Date(employee.dob);
          return dob.getDate() === todayDay && dob.getMonth() === todayMonth;
        })
      },
      (error) => {
        console.error('Failed to fetch today\'s birthdays', error);
      }
    );
  }
}
