import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl: string = 'https://jsonplaceholder.typicode.com/posts'
  students: Student[];

  constructor(private httpClient: HttpClient) { 
    this.students = [];
  }

  getStudents() : Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseUrl);
  }

  saveStudent(student: Student) : Observable<Student>{
    var url = this.baseUrl;
    return this.httpClient.post<Student>(url, student)
  }

  getStudent(id: any) : Observable<Student> {
    var url = this.baseUrl + '/' + id;
    return this.httpClient.get<Student>(url);
  }

  updateStudent(student: Student, id:any) : Observable<Student> {
    var url = this.baseUrl + '/' + id;
    return this.httpClient.put<Student>(url, student);
  }

  deleteStudent(id: any){
    var url = this.baseUrl + '/' + id;
    return this.httpClient.delete<Student>(url);
  }
}
