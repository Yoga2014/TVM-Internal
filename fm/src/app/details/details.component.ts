
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  workers: any[] = [];
  isUpdateModalVisible = false;
  isModalVisible = false;
  selectedWorker: any = null;
  selectedFilter: string = 'active';
  addEmployeeForm: FormGroup;
  updateEmployeeForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.addEmployeeForm = this.fb.group({
      postAppliedFor:[''],
      firstName: [''],
      lastName: [''],
      telephone: [''],
      email: [''],
      activeState: ['active'],  // Default value set to "active"
      onboarding: ['pending']  // Default value set to "pending"
    });

    this.updateEmployeeForm = this.fb.group({
      team: [''],
      project: [''],
      projectDescription:['']
    });
  }

  ngOnInit() {
    // Fetch the default filter data (active employees) on component initialization
    this.filterWorkers(this.selectedFilter);
  }

  filterWorkers(status: string) {
    this.selectedFilter = status; // Update the selected filter
    let apiUrl = '';

    if (status === 'active') {
      apiUrl = 'http://localhost:8080/api/status/active';
    } 
    else if (status === 'onboarded') {
      apiUrl = 'http://localhost:8080/api/status/onboard/onboarded';
    }

    this.http.get<any[]>(apiUrl).subscribe(data => {
      this.workers = data;
    });
  }

  toggleSelection(event: any, worker: any) {
    worker.selected = event.target.checked;
  }

  updateSelectedRows() {
    const selectedWorkers = this.workers.filter(worker => worker.selected);
    selectedWorkers.forEach(worker => {
      this.http.put(`http://localhost:8080/api/delete/employee/${worker.id}`, {})
        .subscribe(() => {
          this.filterWorkers(this.selectedFilter); // Refresh the list after updating based on the current filter
        });
    });
  }

  terminate(id: number){
    this.http.put(`http://localhost:8080/api/terminate/employee/${id}`, {}).subscribe(
      () => {
        alert('Employee terminated successfully');
        this.filterWorkers('onboarded');
      },
      error => {
        console.error('Error terminating employee', error);
        alert('Failed to terminate employee');
      }
    );
  }
  

  showAddEmployeeModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  submitAddEmployee() {
    const newEmployee = this.addEmployeeForm.value;
    this.http.post('http://localhost:8080/api/personal-data', newEmployee).subscribe(() => {
      this.filterWorkers('active'); // Refresh the list after adding
      this.closeModal(); // Close the modal
    });
    this.addEmployeeForm.reset();
  }

  openUpdateModal(worker: any) {
    this.selectedWorker = worker;
    this.isUpdateModalVisible = true;
  }

  
  closeUpdateModal() {
    this.isUpdateModalVisible = false;
    this.selectedWorker = null;
  }

  submitUpdateEmployee() {
    const updatedDetails = this.updateEmployeeForm.value;
    const { team, project ,projectDescription} = updatedDetails;
    const id = this.selectedWorker.id;

    this.http.put(`http://localhost:8080/api/update/employee/${id}?project=${project}&team=${team}&projectDescription=${projectDescription}`, {})
      .subscribe(() => {
        this.filterWorkers(this.selectedFilter); // Refresh the list after updating based on the current filter
        this.closeUpdateModal();
        this.updateEmployeeForm.reset(); // Close the modal
      });

      
  }
}

