import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/URL';
import { NotificationModel } from '../models/notification';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getListNotificationOfUser(){
    return this.http.get<Pagination<NotificationModel>>(`${baseUrl}/notification/list`);
  }

  updateNotification(notification:NotificationModel,  notificationId:number){
    return this.http.put(`${baseUrl}/notification/${notificationId}`,notification);
  }
}
