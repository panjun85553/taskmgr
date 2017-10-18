import {Inject, Injectable} from '@angular/core';
import {HttpHeaders, HttpParams, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Project, TaskList, Task} from '../domain';

@Injectable()
export class TaskListService {
  private readonly domain = 'taskLists';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(@Inject('BASE_CONFIG') private config: {uri: string},
              private http: HttpClient) {
  }

  add(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post<TaskList>(uri, JSON.stringify(taskList), {headers: this.headers});
  }

  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    };
    return this.http
      .patch<TaskList>(uri, JSON.stringify(toUpdate), {headers: this.headers});
  }

  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http
      .delete(uri)
      .mapTo(taskList);
  }

  // GET /tasklist
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams()
      .set('projectId', projectId);
    return this.http
      .get<TaskList[]>(uri, {params});
  }

  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}/swapOrder`;
    return this.http.post<TaskList[]>(
      uri,
      {'srcListId': <string>src.id, 'targetListId': <string>target.id},
      {headers: this.headers});
  }
}
