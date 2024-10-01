
export interface Employee {
    positionAppliedFor: any;
    createdDate: string | number | Date;
    employeeId?: string | any;
    dob?: string | any;
    status?: string;
    joinDate?: string;
    generalTimining?: string;
    leaveBooked?: number;
    onLeave?: boolean;
    date?: string;
    profilePicture?: string;  //imgedata
    postAppliedFor?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    presentHomeMailingAddress?: Address;
    permanentHomeMailingAddress?: Address;
    email?: string;
    birthDate?: string;
    birthPlace?: string;
    gender?: string;
    age?: number;
    maritalStatus?: string;
    marriageDate?: string;
    nativeState?: string;
    religion?: string;
    nationality?: string;
    stateOfDomicile?: string;
    category?: string;
    languagesKnown?: Language[];
    height?: string;
    weight?: string;
    bloodGroup?: string;
    passportNo?: string;
    passportIssueDate?: number;
    validUptoDate?: number;
    countryOfIssue?: string;
    validVisaDetails?: string;
    panNumber?: string;
    familyDetails?: FamilyDetails[];
    emergencyContact?: EmergencyContact;
    healthData?: HealthData;
    education?: Education[];
    membershipOfProfessionalInstitute?: MembershipOfProfessionalInstitute;
    trainingCertification?: TrainingCertification;
    extraCurricularActivity?: ExtraCurricularActivity;
    skillsSummary?: SkillsSummary;
    workExperience?: WorkExperience;
    generalData?: GeneralData;
    activeState?: string;
    onborading?: string;
    declaration?: Declaration;
    vaccinationDTO?: VaccinationDTO;
    cell?:string;
  }
  
  
   export interface Address {
    address?: string;
    pinCode?: number;
    cell?: number;
    telephoneCode?: number;
    telephone?: number;
  }
  
  export interface Language {
    languageId?: number;
    languageName?: string;
    speakeLanguage?: boolean;
    readLanguage?: boolean;
    writeLanguage?: boolean;
  }
  
  export interface FamilyDetails {
    id?: number;
    name?: string;
    relationship?: string;
    qualification?: string;
    organization?: string;
    designationAndPosition?: string;
  }
  
  export interface EmergencyContact {
    id?: number;
    name?: string;
    relation?: string;
    address?: string;
    telephoneNo?: string;
  }
  
  export interface HealthData {
    id?: number;
    height?: number;
    weight?: number;
    bloodGroup?: string;
    eyesightRight?: number;
    eyesightLeft?: number;
    physicalDisability?: string;
    identificationMarks?: string;
  }
  
  export interface Education {
    id?: number;
    examinationPassed?: string;
    specialisation?: string;
    schoolCollegeInstitution?: string;
    universityBoard?: string;
    courseCorres?: string;
  }
  
  export interface MembershipOfProfessionalInstitute {
    id?: number;
    nameOfInstitute?: string;
    typeOfMembershipAndPositionHeld?: string;
    period?: string;
    fromDate?: string;
    toDate?: string;
  }
  
  export interface TrainingCertification {
    id?: number;
    nameOfTrainingCourse?: string;
    duration?: string;
    year?: string;
    instituteOrganization?: string;
    certificateAwarded?: boolean;
  }
  
  export interface ExtraCurricularActivity {
    id?: number;
    activity?: string;
    institutionAssociationSocietyClub?: string;
    year?: string;
    positionHeld?: string;
    prizesWon?: string;
  }
  
  export interface SkillsSummary {
    id?: number;
    projectTitle?: string;
    role?: string;
    teamSize?: number;
    duration?: string;
    languagePlatformOS?: string;
  }
  
  export interface WorkExperience {
    id?: number;
    employerNameAndAddress?: string;
    durationPeriod?: string;
    durationFrom?: string;
    durationTo?: string;
    lastPositionHeldDesignation?: string;
    natureOfDuties?: string;
    immediateSuperiorNameAndDesignation?: string;
    basicAtTimeOfJoining?: number;
    fixedAtTimeOfJoining?: number;
    variableAtTimeOfJoining?: number;
    grossAtTimeOfJoining?: number;
    lastDrawnFixed?: number;
    lastDrawnVariable?: number;
    lastDrawnGross?: number;
    significantAchievementsAndsuitedForPosition?: string;
    
  }
  
  export interface GeneralData {
    id?: number;
    criminalRecord?: string;
    interviewedByTVM?: boolean;
    dateYear?: string;
    position?: string;
    companyName?: string;
    name?: string;
    relativesPosition?: string;
    howDidYouComeToKnow?: string;
    relationship?: string;
    companyTelephoneNos?: number;
    howDidYouKnowPosition?: string;
    engagedInPersonalBusiness?: boolean;
    natureOfBusiness?: string;
    hasContractBond?: boolean;
    contractBondDetails?: string;
    whenCanYouJoin?: number;
    superior1Name?: string;
    superior1Address?: string;
    superior1TelephoneNos?: string;
    superior1Company?: string;
    superior1Position?: string;
    superior2Name?: string;
    superior2Address?: string;
    superior2TelephoneNos?: string;
    superior2Company?: string;
    superior2Position?: string;
    superiorEmailId1?: string;
    superiorEmailId2?: string;
  }
  
  export interface Declaration {
    id?: number;
    isPartnerOrRelativeOfDirector?: boolean;
    place?: string;
    date?: number;
    applicantSignature?: string;
    connectedWithDirector?: boolean;
    directorOfTheCompany?: boolean;
  }
  
  export interface VaccinationDTO {
    id?: number;
    vaccineName?: string;
    dateOfDose?: string;
    vaccinationStatus?: string;
  }
  