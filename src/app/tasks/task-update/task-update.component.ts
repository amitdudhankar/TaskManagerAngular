import { Component, Input, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../shared/models/task.model';
import { TaskService } from '../task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss'],
})
export class TaskUpdateComponent implements OnInit {
  @Input() task!: Task;

  private dialogRef = inject(MatDialogRef<TaskUpdateComponent>);
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.task) {
      this.taskForm.patchValue(this.task); // ✅ Pre-fill values
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const updatedTask: Task = {
      ...this.task,
      title: this.taskForm.value.title ?? '',
      description: this.taskForm.value.description ?? '',
    };

    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.dialogRef.close(true); // ✅ Close and return success flag
    });
  }

  onCancel(): void {
    this.dialogRef.close(); // ❌ Close without update
  }
}
