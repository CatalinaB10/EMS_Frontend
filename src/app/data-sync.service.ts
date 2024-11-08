import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSyncService {
  private userDeletedSource = new Subject<void>();
  userDeleted$ = this.userDeletedSource.asObservable();

  notifyUserDeleted() {
    this.userDeletedSource.next();
  }
}
