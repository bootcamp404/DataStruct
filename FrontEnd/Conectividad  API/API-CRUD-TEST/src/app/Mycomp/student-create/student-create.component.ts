import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../Components/header/header.component';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../Service/student.service';

@Component({
  selector: 'app-student-create',
  imports: [RouterLink, HeaderComponent, FormsModule],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent {

  title!: String
  body!: string
  number!: Number

  constructor(private studentService: StudentService){}

  saveStudentData(){
    if(this.title === '' || this.body === ''){
      alert('Los campos deben ser rellenados');
      return false;
    }

    var student = {id:0, title: this.title, body: this.body, number: this.number}
    this.studentService.saveStudent(student).subscribe(res => {
      console.log(student)
    })
  }  
}

