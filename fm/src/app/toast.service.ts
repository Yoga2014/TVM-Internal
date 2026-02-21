import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {

  private toastSubject = new Subject<{msg:string,type:'success'|'error'}>();
  toastState$ = this.toastSubject.asObservable();

  success(msg:string){
    this.toastSubject.next({msg,type:'success'});
  }

  error(msg:string){
    this.toastSubject.next({msg,type:'error'});
  }
}