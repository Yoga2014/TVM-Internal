import { Component } from '@angular/core';
import { ToastService } from '../toast.service';

@Component({
  selector:'app-toast',
  templateUrl:'./toast.component.html',
  styleUrls:['./toast.component.scss']
})
export class ToastComponent{

  message='';
  type:'success'|'error'='success';
  visible=false;

  constructor(private toast:ToastService){

    this.toast.toastState$.subscribe(t=>{
      this.message=t.msg;
      this.type=t.type;
      this.show();
    });

  }

  private show(){
    this.visible=true;
    setTimeout(()=>this.visible=false,3000);
  }
}