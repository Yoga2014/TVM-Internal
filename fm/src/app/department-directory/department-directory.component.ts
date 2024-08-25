import { Component } from '@angular/core';

@Component({
  selector: 'app-department-directory',
  templateUrl: './department-directory.component.html',
  styleUrl: './department-directory.component.scss'
})
export class DepartmentDirectoryComponent {
  employees!: any[];

  ngOnInit() {
    this.employees = [
      {
        label: 'Arul (CEO)',
        children: [
          { label: 'TEAM A',
            children: [
              { label: 'THOPICA(TEAM LEAD)' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
            ]
          },
          {
            label: 'TEAM B',
            children: [
              { label: 'AAA-BBB-CCC(TEAM LEAD)' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
            ]
          },
          {
            label: 'TEAM C',
            children: [
              { label: 'CCC-CCC(TEAM LEAD)' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
            ]
          },
          {
            label: 'TEAM JAVA',
            children: [
              { label: 'AAA-BBB-CCC(TEAM LEAD)' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
              { label: 'AAA-BBB-CCC' },
            ]
          },
        ]
      }
    ];
  }
}
