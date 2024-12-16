import { Component, OnInit } from '@angular/core';
import { details } from '../AllServices/details.service'; // Adjust the path based on your file structure

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  workers: any[] = [];
  filteredWorkers: any[] = [];
  selectedRows: any[] = [];

  constructor(private details: details) {}

  ngOnInit() {
    this.fetchWorkers();
  }

  fetchWorkers() {
    this.details.EmployeesPostMethod().subscribe(
      (data) => {
        this.workers = Array.isArray(data) ? data : [];
        this.filteredWorkers = [...this.workers];  // Initialize filteredWorkers with all data
        console.log('Workers:', this.workers);
      },
      (error) => {
        console.error('Error fetching workers:', error);
      }
    );
  }

  filterWorkers(activeStatus: string) {
    console.log('Filtering for status:', activeStatus);

    if (activeStatus === 'all') {
      this.filteredWorkers = [...this.workers];  // Show all workers
    } else {
      this.filteredWorkers = this.workers.filter(worker => worker.active === activeStatus); // Filter by active status
    }

    console.log('Filtered Workers:', this.filteredWorkers);
  }

    // Add a getter to determine if all filtered workers are selected
    get allSelected() {
      return this.filteredWorkers.length > 0 && this.filteredWorkers.every(worker => this.selectedRows.includes(worker));
    }
  
    toggleSelection(event: Event, worker: any) {
      if ((event.target as HTMLInputElement).checked) {
        this.selectedRows.push(worker);
      } else {
        const index = this.selectedRows.indexOf(worker);
        if (index !== -1) {
          this.selectedRows.splice(index, 1);
        }
      }
    }
  
    selectAll(event: Event) {
      const isChecked = (event.target as HTMLInputElement).checked;
      this.selectedRows = isChecked ? [...this.filteredWorkers] : [];
    }
  
    // Delete selected rows both from the UI and backend
    deleteSelectedRows() {
      if (confirm('Are you sure you want to delete the selected rows?')) {
        const deleteRequests = this.selectedRows.map(worker => {
          return this.details.deleteWorker(worker.id).toPromise(); // Send DELETE request for each selected worker
        });
  
        Promise.all(deleteRequests).then(() => {
          // After deleting from the backend, remove from the UI
          this.selectedRows.forEach(row => {
            const index = this.workers.indexOf(row);
            if (index !== -1) {
              this.workers.splice(index, 1);
            }
          });
  
          // Update filtered workers after deletion
          this.filteredWorkers = [...this.workers];
  
          // Clear the selection
          this.selectedRows = [];
        }).catch(error => {
          console.error('Error deleting workers:', error);
        });
      }
    }
  
}
