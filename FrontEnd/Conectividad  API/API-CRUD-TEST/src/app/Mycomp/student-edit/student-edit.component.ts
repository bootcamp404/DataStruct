import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Service/student.service';
import { HeaderComponent } from '../../Components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent {

  studentId: any
  student: any
  loading: boolean = true;
  constructor(private route: ActivatedRoute, private studentService: StudentService){}

  ngOnInit(){
    this.studentId = this.route.snapshot.paramMap.get('id');

    this.studentService.getStudent(this.studentId).subscribe(res =>{
      this.student = res;
      console.log(res);
      this.loading = false;
    })
  }

  updateStudentData(id: any){

    var data = {
      id: this.studentId,
      body: this.student.body,
      title: this.student.title,
      number: this.student.number
    }

    this.studentService.updateStudent(data, id).subscribe(res =>{
      console.log(res)
    })
  }
}
