import { Component, Output, EventEmitter, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../../shared/models/task.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<void>();

  private dialogRef = inject(MatDialogRef<TaskFormComponent>); // ✅ Inject dialog ref (Angular 14+ inject syntax)

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const task = this.taskForm.value as Task;
    this.taskService.addTask(task).subscribe(() => {
      this.taskForm.reset();
      this.taskAdded.emit();         // ✅ For optional external usage
      this.dialogRef.close();        // ✅ Close the modal after submission
    });
  }

  onCancel(): void {
    this.dialogRef.close();          // ✅ Close modal on cancel
  }
}
