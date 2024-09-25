import { Component, input, output, effect } from '@angular/core'
import { TaskService, type Task } from '../task.service'

@Component({
  selector: 'app-task-item-row',
  standalone: true,
  template: `
      <td> {{ task().taskId }} </td>
      <td> {{ task().contents }} </td>
      <td> {{ task().status ? 'O' : 'X' }} </td>
      <td>
        <button (click)="finishTask()" type="button">Done</button>
        <button (click)="deleteTask()" type="button">Delete</button>
      </td>
  `,
})
export class TaskItemRowComponent {
  task = input.required<Task>()
  onChanged = output<number>()

  constructor (
    private readonly taskService: TaskService,
  ) {
    effect(() => {
      console.log('Changed! : ', this.task().taskId)
    })
  }

  finishTask () {
    this.taskService.putTask(this.task().taskId, true)
      .subscribe({
        next: () => {
          this.onChanged.emit(this.task().taskId)
        }
      })
  }

  deleteTask() {
    this.taskService.deleteTask(this.task().taskId)
      .subscribe({
        next: () => {
          this.onChanged.emit(this.task().taskId)
        }
      })
  }
}
