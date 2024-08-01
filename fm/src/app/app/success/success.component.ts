import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.http.get(`http://localhost:8080/api/${id}`).subscribe(response => {
          this.data = response;
        });
      }
    });
  }
}
