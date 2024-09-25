import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { finalize, Observable } from 'rxjs'
import { TaskItemRowComponent } from '../task-item-row/task-item-row.component'
import { LoadingComponent } from '../../loading/loading.component'
import { TaskService, type Task } from '../task.service'

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    LoadingComponent,
    TaskItemRowComponent,
    CommonModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(isLoading()) {
      <app-loading/>
    } @else {
      <div>
        <input [(ngModel)]="contents" placeholder="Task Contents" />
        <button (click)="createTask()" [disabled]="!contents">Add Task</button>
      </div>
      <table>
        @for(task of taskList; track task.taskId) {
          <tr>
            <app-task-item-row [task]="task" (onChanged)="onTaskChange($event)"></app-task-item-row>
          </tr>
        }
        @if(taskList.length === 0){
          <tr>NO TASKS</tr>
        }
      </table>
    }

    @if (counter$ | async; as counterVal) {
      @defer(when counterVal >= 10) {
        <h1>{{counterVal}} tasks created! Really large module</h1>
      }
    }
  `
})
export class TaskListComponent implements OnInit {
  isLoading = signal<boolean>(true)
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
    this.isLoading.set(true)

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
    this.isLoading.set(false)
  }
}
