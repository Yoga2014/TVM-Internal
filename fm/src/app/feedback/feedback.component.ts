import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  selectedTab: string = 'received';
  searchTerm: string = '';
  feedbackData: any[] = [];

  allFeedbackCount: number = 0;
  positiveFeedbackCount: number = 0;
  negativeFeedbackCount: number = 0;
  trainingFeedbackCount: number = 0;
  observationFeedbackCount: number = 0;
  rewardFeedbackCount: number = 0;

  filteredFeedback: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchFeedbackData();
  }

  fetchFeedbackData() {
    this.http.get<any[]>('http://localhost:3000/feedbacks') // Replace with your JSON server or API endpoint
      .subscribe((data: any[]) => {
        this.feedbackData = data;
        this.calculateFeedbackCounts();
        this.filteredFeedback = this.feedbackData;
      });
  }

  setFeedbackCategory(tab: string) {
    this.selectedTab = tab;
    this.filterFeedback(this.searchTerm); // Reapply search filter when changing category
  }

  filterFeedback(type: string) {
    let feedback = this.feedbackData;

    // Filter by feedback type if not 'all'
    if (type !== 'all') {
      feedback = feedback.filter(feedback => feedback.type === type);
    }

    // Filter by search term
    if (this.searchTerm) {
      feedback = feedback.filter(feedback =>
        feedback.content.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredFeedback = feedback;
  }

  calculateFeedbackCounts() {
    this.allFeedbackCount = this.feedbackData.length;
    this.positiveFeedbackCount = this.feedbackData.filter(f => f.type === 'positive').length;
    this.negativeFeedbackCount = this.feedbackData.filter(f => f.type === 'negative').length;
    this.trainingFeedbackCount = this.feedbackData.filter(f => f.type === 'training').length;
    this.observationFeedbackCount = this.feedbackData.filter(f => f.type === 'observation').length;
    this.rewardFeedbackCount = this.feedbackData.filter(f => f.type === 'reward').length;
  }
}
