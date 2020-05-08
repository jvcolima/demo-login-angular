import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-home',
  templateUrl: './private-home.component.html',
  styleUrls: ['./private-home.component.css']
})
export class PrivateTasksComponent implements OnInit {

  privateTasks = [];
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.taskService.getPrivateTasks()
      .subscribe(
        res => this.privateTasks = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
  }

}
