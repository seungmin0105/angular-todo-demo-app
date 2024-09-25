import { Injectable } from '@angular/core';
import { Observable, of, take, EMPTY, delay, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: Task[]
  counter$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  constructor() {
    this.taskList = [
      { taskId: 0, status: false, contents: '서버팀 세미나 참석' },
      { taskId: 1, status: false, contents: '서버팀 회식' }
    ]
    this.counter$.next(2)
  }

  // Mock post request
  postTask (contents: string): Observable<void> {
    const nextTaskId = this.counter$.getValue() + 1
    this.counter$.next(nextTaskId)
    const newTask = {
      taskId: nextTaskId,
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

export interface Task {
  taskId: number
  contents: string
  status: boolean
}
