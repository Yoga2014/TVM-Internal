import { Component } from '@angular/core';

@Component({
  selector: 'app-department-tree',
  templateUrl: './department-tree.component.html',
  styleUrl: './department-tree.component.scss'
})
export class DepartmentTreeComponent {
  employees!: any[];

  ngOnInit() {
    this.employees = [
      {
        label: 'Arul (CEO)',
        children: [
          { label: 'IT-TEAM',
            children: [
            ]
          },
          {
            label: 'HR-TEAM',
            children: [
            
            ]
          },
          {
            label: 'FRONT_END-TEAM',
            children: [
            ]
          },
          {
            label: 'BACK_END-TEAM',
            children: [
            
            ]
          },
        ]
      }
    ];
  }
}
