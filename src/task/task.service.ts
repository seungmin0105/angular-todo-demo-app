import { Injectable } from '@angular/core';
import { Observable, of, take, EMPTY, delay } from 'rxjs'
import { type Task } from './task.model'

@Injectable()
export class TaskService {
  counter: number
  taskList: Task[]
  constructor() {
    this.taskList = [
      { taskId: 0, status: false, contents: '서버팀 세미나 참석' },
      { taskId: 1, status: false, contents: '서버팀 회식' }
    ]
    this.counter = 2
  }

  // Mock post request
  postTask (contents: string): Observable<void> {
    const newTask = {
      taskId: this.counter++,
      contents,
      status: false,
    }
    this.taskList.push(newTask)
    return EMPTY
  }

  // Mock put request
  putTask (taskId: number, status: boolean): Observable<void> {
    const targetTask = this.taskList.find((task) => task.taskId === taskId)
    targetTask!.status = status
    return EMPTY
  }

  deleteTask (taskId: number): Observable<void> {
    const idx = this.taskList.findIndex((task) => task.taskId === taskId)
    this.taskList.splice(idx, 1)
    return EMPTY
  }

  // Mock get request
  getTaskList (): Observable<Task[]> {
    return of<Task[]>(this.taskList).pipe(take(1), delay(500))
  }
}
