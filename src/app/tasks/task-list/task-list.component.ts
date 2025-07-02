// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TaskService } from '../task.service';
// import { Task } from '../../shared/models/task.model';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // optional if using <mat-spinner>
// import { TaskFormComponent } from '../task-form/task-form.component'; // ✅ import this
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// @Component({
//   selector: 'app-task-list',
//   standalone: true,
//   imports: [CommonModule, MatProgressSpinnerModule, MatDialogModule], // include required modules here
//   templateUrl: './task-list.component.html',
//   styleUrls: ['./task-list.component.scss'],
// })
// export class TaskListComponent implements OnInit {
//   tasks: Task[] = [];
//   loading = true;

//   constructor(private taskService: TaskService, private dialog: MatDialog) {}

//   ngOnInit(): void {
//     this.taskService.getTasks().subscribe((data: Task[]) => {
//       this.tasks = data;
//       this.loading = false;
//     });
//   }

//   fetchTasks(): void {
//     this.taskService.getTasks().subscribe((data: Task[]) => {
//       this.tasks = data;
//       this.loading = false;
//     });
//   }

//   openAddTaskDialog(): void {
//     const dialogRef = this.dialog.open(TaskFormComponent, {
//       width: '100%',
//       maxWidth: '500px', // ✅ limits max width on large screens
//       height: 'auto', // ✅ adjusts height based on content
//       autoFocus: true, // ✅ focuses the first input
//       disableClose: true, // user must submit or cancel explicitly
//       panelClass: 'custom-dialog-container', // ✅ custom styles if needed
//     });

//     dialogRef.componentInstance.taskAdded.subscribe(() => {
//       this.fetchTasks();
//       dialogRef.close();
//     });
//   }

//   onDelete(id: number): void {
//     this.taskService.deleteTask(id).subscribe(() => {
//       this.tasks = this.tasks.filter((task) => task.id !== id);
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../../shared/models/task.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router'; // ✅ import this
import { AuthService } from '../../auth/auth.service'; // ✅ import AuthService

import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskUpdateComponent } from '../task-update/task-update.component'; // ✅ Update import

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    // ✅ Required for dialog injection
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private auth: AuthService, // ✅ inject
    private router: Router // ✅ inject
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.loading = false;
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      autoFocus: true,
      disableClose: true,
      panelClass: 'custom-dialog-container',
    });

    dialogRef.componentInstance.taskAdded.subscribe(() => {
      this.fetchTasks();
      dialogRef.close();
    });
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskUpdateComponent, {
      width: '100%',
      maxWidth: '549px',
      height: 'auto',
      autoFocus: true,
      disableClose: true,
      panelClass: 'custom-dialog-container',
    });

    dialogRef.componentInstance.task = task;

    dialogRef.afterClosed().subscribe((updated: boolean) => {
      if (updated) {
        this.fetchTasks(); // ✅ Refresh only if task was updated
      }
    });
  }

  onDelete(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
