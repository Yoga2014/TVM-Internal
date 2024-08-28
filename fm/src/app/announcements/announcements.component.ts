import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from '../announcement.service';
import { Announcement, AnnouncementWithUI } from '../announcement.model';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  
  

  announcements: Announcement[] = [];
  announcementForm!: FormGroup;
  isAnnouncementFormVisible = false;
  editMode = false;
  isSearchActive = false;
  isFilterPopupActive = false;
  searchTerm: string = '';
  selectedAnnouncementId: number | null = null;
  selectedAnnouncement: any;
  newComment: string = '';
  likedAnnouncements: Set<number> = new Set();
  currentUserName: string = 'John Doe';
  selectedCommentForEdit: any = null;
  editingComment: any = null;
  saveAnnouncement: any;

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.announcementForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required],
      attachment: ['', [this.validateFile]],
      category: ['', Validators.required],
      expiry: ['', Validators.required],
      location: ['', Validators.required],
      commentsDisabled: [false],
      pinned: [false],
      notifyAll: [false],
      notifyOthers: ['']
    });

    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.announcementService.getAnnouncements().subscribe(data => {
      this.announcements = data;
    });
  }

  addAnnouncement(): void {
    this.isAnnouncementFormVisible = true;
    this.editMode = false;
    this.announcementForm.reset(); // Reset the form before adding a new announcement
  }

  editAnnouncement(id: number): void {
    this.announcementService.getAnnouncementById(id).subscribe((announcement) => {
      this.selectedAnnouncementId = id;
      this.announcementForm.patchValue(announcement);
      this.isAnnouncementFormVisible = true;
      this.editMode = true;
    });
  }

  submitAnnouncement(): void {
    if (this.announcementForm.valid) {
      const announcement = this.announcementForm.value;

      if (this.editMode && this.selectedAnnouncementId) {
        announcement.id = this.selectedAnnouncementId;
        this.announcementService.updateAnnouncement(announcement).subscribe(() => {
          this.loadAnnouncements();
          this.hideAnnouncementForm();
        });
      } else {
        this.announcementService.addAnnouncement(announcement).subscribe(() => {
          this.loadAnnouncements();
          this.hideAnnouncementForm();
        });
      }
    } else {
      this.announcementForm.markAllAsTouched(); // Highlight all fields with errors
    }
  }

  hideAnnouncementForm(): void {
    this.isAnnouncementFormVisible = false;
    this.editMode = false;
    this.selectedAnnouncementId = null;
  }

  toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
  }

  toggleFilterPopup(): void {
    this.isFilterPopupActive = !this.isFilterPopupActive;
  }

  applyFilter(): void {
    // Add filter logic here
  }

  resetFilter(): void {
    // Reset filter logic
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      this.announcementForm.patchValue({
        attachment: selectedFile.name // Or handle file upload logic here
      });
    }
  }

  validateFile(control: any): { [key: string]: boolean } | null {
    const file = control.value;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        return { invalidFileType: true };
      }
    }
    return null;
  }


  showPopup(announcement: any) {
    this.selectedAnnouncement = { ...announcement };
  }

  closePopup() {
    this.selectedAnnouncement = null;
  }

  deleteAnnouncement(id: number) {
    this.announcementService.deleteAnnouncement(id).subscribe(() => {
      this.announcements = this.announcements.filter(a => a.id !== id);
      if (this.selectedAnnouncement && this.selectedAnnouncement.id === id) {
        this.closePopup();
      }
    });
  }
  
  likeAnnouncement(announcement: any) {
    announcement.likes++;
    this.announcementService.updateAnnouncement(announcement).subscribe(() => {
      if (this.selectedAnnouncement && this.selectedAnnouncement.id === announcement.id) {
        this.selectedAnnouncement.likes = announcement.likes;
      }
    });
  }


  toggleCommentInput() {
    if (this.selectedAnnouncement) {
      this.selectedAnnouncement.showCommentInput = !this.selectedAnnouncement.showCommentInput;
    }
  }


  addComment() {
    if (this.selectedAnnouncement) {
      this.selectedAnnouncement.comments.push({
        author: 'Your Name',// Replace with actual author name
        text: this.selectedAnnouncement.newComment
      });
      this.selectedAnnouncement.newComment = '';
    }
  }

  editComment(comment: any) {
    this.selectedCommentForEdit = { ...comment };
  }

  // Add deleteComment method
  deleteComment(comment: any) {
    if (this.selectedAnnouncement) {
      const index = this.selectedAnnouncement.comments.indexOf(comment);
      if (index > -1) {
        this.selectedAnnouncement.comments.splice(index, 1);
        this.announcementService.updateAnnouncement(this.selectedAnnouncement).subscribe();
      }
    }
  }

  saveEditedComment(): void {
    if (this.editingComment) {
      const index = this.selectedAnnouncement.comments.findIndex((c: any) => c.id === this.editingComment.id);
      if (index > -1) {
        this.selectedAnnouncement.comments[index] = this.editingComment;
        this.editingComment = null;
        this.saveAnnouncement(this.selectedAnnouncement);
      }
    }
  }

  cancelEdit() {
    this.selectedCommentForEdit = null;
  }
}
