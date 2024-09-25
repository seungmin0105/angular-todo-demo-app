import { Component, EventEmitter, Input, Output } from '@angular/core'
import { type Task } from '../task.model'
import { TaskService } from '../task.service'

@Component({
  selector: 'app-task-item-row',
  template: `
      <td> {{ task.taskId }} </td>
      <td> {{ task.contents }} </td>
      <td> {{ task.status ? 'O' : 'X' }} </td>
      <td>
        <button (click)="finishTask()" type="button">Done</button>
        <button (click)="deleteTask()" type="button">Delete</button>
      </td>
  `,
})
export class TaskItemRowComponent {
  @Input({ required: true }) task!: Task
  @Output() onChanged: EventEmitter<number> = new EventEmitter<number>()

  constructor (
    private readonly taskService: TaskService,
  ) {
  }

  finishTask () {
    this.taskService.putTask(this.task.taskId, true)
      .subscribe({
        next: () => {
          this.onChanged.emit(this.task.taskId)
        }
      })
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.taskId)
      .subscribe({
        next: () => {
          this.onChanged.emit(this.task.taskId)
        }
      })
  }
}
