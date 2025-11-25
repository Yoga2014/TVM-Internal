export interface FamilyMember {
    name: string;
    relationship: string;
    age: string;
    occupation: string;
  }
  
  export interface Language {
    language: string;
    speak: boolean;
    read: boolean;
    write: boolean;
  }
  
  export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    employeePhoto: string;
    bloodGroup: string;
    mobileNumber: number;
    homeNumber: number;
    emergencyNumber: number;
    email: string;
    presentAddress: string;
    city: string;
    district: string;
    country: string;
    locality: string;
    pincode: string;
    state: string;
    passport: string;
    passportNumber: string;
    landmark: string;
    visa: string;
    maritalStatus: string;
    familyMembers: FamilyMember[];
    languages: Language[];
    onboardingStatus:string;
    department:string;
    active:string;

  }
  
  export interface ProfileData {
    profile: Profile[];
  }
  