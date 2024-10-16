import { ChangeDetectorRef, Component } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performance-feedback',
  templateUrl: './performance-feedback.component.html',
  styleUrl: './performance-feedback.component.scss'
})
export class PerformanceFeedbackComponent {
  selectedRole: string = 'All';
  feedbackTypeTitle: string = 'All';
  showAllFeedbackDetails: boolean = false;
  allFeedbackResponse: any;
  managerResponse: any;
  allManager: any;
  allTl: any;
  allFeedBackDetails: any;
  selectedFeedback: any;
  selectedFeedbackDetails: any;
  addFeedbackDetails : any;
  positiveFeedbackCount: number = 0;
  negativeFeedbackCount: number = 0;
  trainingFeedbackCount: number = 0;
  observationFeedbackCount: number = 0;
  rewardFeedbackCount: number = 0;
  feedbackProvider: string = '';
  feedbackType: string = '';
  feedbackDescription: string = '';
  isFeedbackModalOpen : boolean = false;

  constructor(private feedBack: FeedbackService, private router : Router) {
    this.getFeedMethod();
  }

  setRole(role: string) {
    this.allFeedbackResponse = this.allFeedBackDetails;
    this.selectedRole = role;
    if (role === 'All') {
      this.showAllFeedbackDetails = true;
      this.filterFeedback(role);
    }
    else if (role == "Manager") {
      this.feedbackTypeTitle = 'Manager';
      this.showAllFeedbackDetails = true;
      this.allFeedbackResponse = this.allFeedbackResponse?.filter((res: any) => res?.name == 'Manager')
    }
    else if (role == "TL") {
      this.feedbackTypeTitle = 'TL';
      this.showAllFeedbackDetails = true;
      this.allFeedbackResponse = this.allFeedbackResponse?.filter((res: any) => res?.name == 'TL')
    }
    else {
      this.allFeedbackResponse = this.allFeedbackResponse;
    }

  }

  filterFeedback(type: string) {
    switch (type) {
      case 'All':
        this.feedbackTypeTitle = 'All Feedback';
        this.allFeedbackResponse = this.allFeedBackDetails;
        break;
      case 'Positive':
        this.feedbackTypeTitle = 'Positive Feedback';
        this.allFeedbackResponse = this.allFeedBackDetails?.filter((res: any) => res?.isPositive === true);
        break;
      case 'Negative':
        this.feedbackTypeTitle = 'Negative Feedback';
        this.allFeedbackResponse = this.allFeedBackDetails?.filter((res: any) => res?.isPositive === false);
        break;
      case 'Training':
        this.feedbackTypeTitle = 'Training Feedback';
        this.allFeedbackResponse = this.allFeedBackDetails?.filter((res: any) => res?.isTraining === true);
        break;
      case 'Observation':
        this.feedbackTypeTitle = 'Observation Feedback';
        this.allFeedbackResponse = this.allFeedBackDetails?.filter((res: any) => res?.isObservation === true);
        break;
      case 'Rewards':
        this.feedbackTypeTitle = 'Rewards Feedback';
        this.allFeedbackResponse = this.allFeedBackDetails?.filter((res: any) => res?.isRewards === true);
        break;
    }
  }

  showFeedbackDetails() {
    this.showAllFeedbackDetails = true;
  }

  getFeedMethod() {
    this.feedBack?.getFeedBackData()?.subscribe((res: any) => {
      this.allFeedbackResponse = res;
      this.allFeedBackDetails = res;
      this.positiveFeedbackCount = res?.filter((feedback: any) => feedback?.isPositive)?.length;
      this.negativeFeedbackCount = res?.filter((feedback: any) => !feedback?.isPositive).length;
      this.trainingFeedbackCount = res?.filter((feedback: any) => feedback?.isTraining).length;
      this.observationFeedbackCount = res?.filter((feedback: any) => feedback?.isObservation).length;
      this.rewardFeedbackCount = res?.filter((feedback: any) => feedback?.isRewards).length;
      this.allManager = res?.filter((res: any) => res?.name == 'Manager');
      this.allTl = res?.filter((res: any) => res?.name == 'TL')
    })
  }

  getFeedbackDetails(feedback: any) {
    this.selectedFeedback = true;
    this.selectedFeedbackDetails = feedback;
  }

  openProvideFeedbackModal(){
    this.isFeedbackModalOpen = true;
  }

  submitFeedback(feedbackProvider: string, feedbackType: string, feedbackDescription: string) {
    const newFeedback = {
      id: this.allFeedbackResponse?.length + 1,
      name: feedbackProvider,
      isPositive: feedbackType === 'Positive',
      isTraining: feedbackType === 'Training',
      isObservation: feedbackType === 'Observation',
      isRewards: feedbackType === 'Rewards',
      details: feedbackDescription
    };
    this.feedBack?.addFeedBackData(newFeedback)?.subscribe(
      (response: any) => {
        this.allFeedbackResponse?.push(newFeedback);
        this.allFeedBackDetails?.push(newFeedback);
        if (newFeedback?.isPositive) {
          this.positiveFeedbackCount++;
        } else {
          this.negativeFeedbackCount++;
        }
        if (newFeedback?.isTraining) {
          this.trainingFeedbackCount++;
        }
        if (newFeedback?.isObservation) {
          this.observationFeedbackCount++;
        }
        if (newFeedback?.isRewards) {
          this.rewardFeedbackCount++;
        }
        this.resetForm();
        this.closeModal();
      },
    );
  }

  closeModal() {
    this.selectedFeedbackDetails = null;
    this.isFeedbackModalOpen = false;
  }

  resetForm() {
    this.feedbackProvider = '';
    this.feedbackType = ''; 
    this.feedbackDescription = ''; 
  }
}