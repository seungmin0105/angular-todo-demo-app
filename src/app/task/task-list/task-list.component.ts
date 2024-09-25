import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { finalize, Observable } from 'rxjs'
import { TaskService, type Task } from '../task.service'

@Component({
  selector: 'app-task-list',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div *ngIf="isLoading; else loadComplete">
      <app-loading/>
    </div>
    <ng-template #loadComplete>
      <div>
        <input [(ngModel)]="contents" placeholder="Task Contents" />
        <button (click)="createTask()" [disabled]="!contents">Add Task</button>
      </div>
      <table>
        <tr *ngFor="let task of taskList">
          <app-task-item-row [task]="task" (onChanged)="onTaskChange(task.taskId)"></app-task-item-row>
        </tr>
        <tr *ngIf="taskList.length === 0">NO TASKS</tr>
      </table>
    </ng-template>

    <h1 *ngIf="(counter$ | async)! >= 10 && (counter$ | async) as counterVal">{{counterVal}} tasks created! Really large module</h1>
  `
})
export class TaskListComponent implements OnInit {
  isLoading: boolean = true
  taskList: Task[] = []
  contents: string = ''

  constructor (
    private readonly taskService: TaskService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  get counter$ (): Observable<number> {
    return this.taskService.counter$
  }

  ngOnInit () {
    this.search()
  }

  search () {
    this.isLoading = true

    this.taskService.getTaskList()
      .pipe(finalize(this.showFinalize))
      .subscribe({
        next: (data) => {
          this.taskList = data
        },
      })
  }

  onTaskChange(taskId: number) {
    console.log('Updated: ', taskId)
    this.search()
  }

  createTask () {
    if (!this.contents) return

    this.taskService.postTask(this.contents)
      .subscribe({
        next: this.search,
      })
  }

  private readonly showFinalize = (): void => {
    this.isLoading = false
    this.cdr.detectChanges()
  }
}
