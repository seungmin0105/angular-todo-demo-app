import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { TaskService, type Task } from '../task.service'

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
export class TaskItemRowComponent implements OnChanges {
  @Input({ required: true }) task!: Task
  @Output() onChanged: EventEmitter<number> = new EventEmitter<number>()

  constructor (
    private readonly taskService: TaskService,
  ) {
  }

  ngOnChanges (changes: SimpleChanges) {
    console.log('Changed! : ', changes['task'].currentValue.taskId)
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
