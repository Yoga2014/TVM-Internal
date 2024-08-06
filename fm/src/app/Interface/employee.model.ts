// export interface Employee
// {
//    id : string;
//    employeeName : string;
//    profilePicture : string;
//    leaveBooked : number;
//    email : string;
//    generalTimining : string;
//    status : 'active' | 'inactive' | 'yet-to-check-in';
//    date?: string; 
//    onLeave?: boolean;
// }

export interface Employee {
   employeeId?: string | any;
   employeeName?: string;
   dob?: string | any;
   profilePicture?: string;
   status?: string;
   generalTimining?: string;
   leaveBooked?: number; 
   image?: string;
   joinDate?: string;
   onLeave?: boolean;
   date?: string;
 }

 