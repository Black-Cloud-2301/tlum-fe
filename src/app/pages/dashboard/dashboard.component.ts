import {Component, inject, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {User} from "../../models/user/user";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user$: Observable<User> | null = null;

  constructor(private store: Store<{ user: User }>) {
  }

  ngOnInit() {
    this.store.pipe(select('user')).subscribe((user: User) => {
      console.log('user', user)
    });
  }
}
