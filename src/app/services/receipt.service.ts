import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceiptModel } from '../models/receipt';
import { MessageModel } from '../models/message';
import baseUrl from '../helpers/URL';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {


constructor(private http: HttpClient) { }

createReceipt(value: ReceiptModel) {
  return this.http.post<MessageModel>(`${baseUrl}/admin/receipt`,value);
}

}
