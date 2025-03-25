import { Routes } from '@angular/router';
import { StudentListComponent } from './Mycomp/student-list/student-list.component';
import { StudentCreateComponent } from './Mycomp/student-create/student-create.component';
import { StudentEditComponent } from './Mycomp/student-edit/student-edit.component';

export const routes: Routes = [
    { path: '', component: StudentListComponent },
    { path: 'crear', component: StudentCreateComponent },
    { path:'students/:id', component: StudentEditComponent }
];
