import { CommonModule } from '@angular/common'
import { NgModule, Provider } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { TaskService } from './task/task.service'
import { TaskItemRowComponent } from './task/task-item-row/task-item-row.component'
import { TaskListComponent } from './task/task-list/task-list.component'
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component'

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskItemRowComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    TaskService as Provider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
