import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'mobile', 'edit', 'delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public userService: UserService,
              private router: Router,
              private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  deleteDriver(id: number) {
    this.userService.deleteUser(id);
  }

  editDriver(id: number) {
    this.router.navigate(['../users/edit/' + id], { relativeTo: this.aRoute});
  }
  
  addDriver() {
    this.router.navigate(['/users/edit/new'], { relativeTo: this.aRoute});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 }
