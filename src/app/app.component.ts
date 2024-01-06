import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {AuthService} from "./core/auth/auth.service";
import {setUser} from "./shared/store/user.actions";
import {Store} from "@ngrx/store";
import {User} from "./models/user/user";
import {NzAvatarComponent} from "ng-zorro-antd/avatar";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzBreadCrumbComponent} from "ng-zorro-antd/breadcrumb";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzAvatarComponent, NzPopoverDirective, NzButtonComponent, RouterLink, NzBreadCrumbComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TLU';

  isCollapsed = false;

  user: User | null = null;
  contentTemplate: any = "";

  constructor(
    private authService: AuthService,
    private store: Store<{ user: User }>,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUserInfo()
    if(this.user) {
      this.store.dispatch(setUser({user: this.user}));
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then(r => console.log(r));
  }

  updateUser() {

  }
}
