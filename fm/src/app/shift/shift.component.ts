import { Component, OnInit } from '@angular/core';
import { CheckinCheckoutService } from '../checkin-checkout.service';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  standalone: false,
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  isCheckedIn: boolean = false;
  isCheckedOut: boolean = false;
  checkInTime: string | null = null;
  checkOutTime: string | null = null;
  shiftId: number | null = null; // Store shift ID to update check-out time

  // Counter variables
  counterInterval: any;
  elapsedTime: string = '00:00:00';
  checkInTimestamp: number | null = null;
  totalElapsedMs: number = 0;

  constructor(private checkinService: CheckinCheckoutService) {}

  ngOnInit(): void {
    this.loadShiftStatus();
  }

  loadShiftStatus(): void {
    const savedStatus = localStorage.getItem('shiftStatus');
    if (savedStatus) {
      const status = JSON.parse(savedStatus);
      this.checkInTime = status.checkInTime;
      this.checkOutTime = status.checkOutTime;
      this.shiftId = status.shiftId;
      this.checkInTimestamp = status.checkInTimestamp;
      this.isCheckedIn = status.isCheckedIn;
      this.isCheckedOut = status.isCheckedOut;
  
      if (this.isCheckedIn && !this.isCheckedOut && this.checkInTimestamp) {
        this.startCounter();
      } else if (this.isCheckedOut) {
        this.stopCounter();
      }
    } else {
      this.checkinService.getLatestShift().subscribe((shift) => {
        if (shift.length > 0) {
          const latestShift = shift[0];
          this.shiftId = latestShift.id;
          this.checkInTime = latestShift.checkInTime;
          this.checkOutTime = latestShift.checkOutTime;
  
          if (this.checkInTime && !this.checkOutTime) {
            this.isCheckedIn = true;
            this.checkInTimestamp = new Date(this.checkInTime).getTime();
            this.startCounter();
          } else if (this.checkOutTime) {
            this.isCheckedIn = false;
            this.isCheckedOut = true;
            this.stopCounter();
          }
        }
      });
    }
  }


  checkIn(): void {
    if (!this.isCheckedIn) {
      // Get the current time in IST format
      const currentDateTime = new Date();
      this.checkInTime = currentDateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      this.checkInTimestamp = Date.now();
      this.isCheckedIn = true;
      this.isCheckedOut = false;
  
      this.checkinService.checkIn(this.checkInTime).subscribe((response) => {
        this.shiftId = response.id; // Store the shift ID for later check-out
        this.startCounter();
        this.saveShiftStatus();
      });
    } else {
      console.log('Already checked in!');
    }
  }

  checkOut(): void {
    if (this.isCheckedIn && !this.isCheckedOut && this.shiftId) {
      // Get the current time in IST format
      const currentDateTime = new Date();
      this.checkOutTime = currentDateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      this.isCheckedOut = true;
  
      this.checkinService.checkOut(this.shiftId, this.checkOutTime).subscribe(() => {
        this.stopCounter();
        this.saveShiftStatus();
      });
    } else if (!this.isCheckedIn) {
      console.log('You must check in first!');
    } else if (this.isCheckedOut) {
      console.log('Already checked out!');
    }
  }


saveShiftStatus(): void {
  localStorage.setItem('shiftStatus', JSON.stringify({
    checkInTime: this.checkInTime,
    checkOutTime: this.checkOutTime,
    shiftId: this.shiftId,
    checkInTimestamp: this.checkInTimestamp,
    isCheckedIn: this.isCheckedIn,
    isCheckedOut: this.isCheckedOut
  }));
}

  startCounter(): void {
    if (this.counterInterval) {
      clearInterval(this.counterInterval);
    }

    this.counterInterval = setInterval(() => {
      if (this.checkInTimestamp) {
        const elapsedMs = Date.now() - this.checkInTimestamp;
        this.elapsedTime = this.formatElapsedTime(elapsedMs);
      }
    }, 1000);
  }

  stopCounter(): void {
    if (this.counterInterval) {
      clearInterval(this.counterInterval);
    }
  }

  formatElapsedTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  clearShiftStatus(): void {
    localStorage.removeItem('shiftStatus');
    this.checkInTime = null;
    this.checkOutTime = null;
    this.shiftId = null;
    this.checkInTimestamp = null;
    this.isCheckedIn = false;
    this.isCheckedOut = false;
    this.elapsedTime = '00:00:00';
    this.stopCounter();
  }
}
