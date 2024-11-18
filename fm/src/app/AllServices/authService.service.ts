import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class EmployeeAuthService{
    private employee = {
        employeeId :'TVM01',
        employeeName : 'Sivaneshwaran',
        email:'siva.tvm@gmail.com'
    };
     getAuthenticatedEmployee(){
        return this.employee;
     } 
     getLoggedInUserId() {
        return this.employee;
     }  

}