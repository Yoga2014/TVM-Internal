import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoalService } from '../AllServices/goal.service';
import { Comment } from '../Interface/Goals.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  newComment: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { goalId: number },
    private goalService: GoalService
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.goalService.getComments(this.data.goalId).subscribe({
      next: (data: Comment[]) => this.comments = data,
      error: (err) => console.error(err)
    });
  }

  addComment(): void {
    if (this.newComment.trim()) {
      const comment: Comment = {
        id: Math.floor(Math.random() * 10000),
        text: this.newComment,
        author: 'Current User',
        createdAt: new Date()
      };

      this.goalService.addComment(this.data.goalId, comment).subscribe({
        next: (comment: Comment) => {
          this.comments.push(comment);
          this.newComment = '';
        },
        error: (err) => console.error(err)
      });
    }
  }
}
