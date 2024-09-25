import { Component } from '@angular/core'
import { TaskListComponent } from './task/task-list/task-list.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    TaskListComponent,
  ]
})
export class AppComponent {
}
