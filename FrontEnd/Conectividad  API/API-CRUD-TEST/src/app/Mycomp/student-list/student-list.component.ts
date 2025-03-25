import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Service/student.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Components/header/header.component';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-student-list',
  imports: [RouterLink, CommonModule, HeaderComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  constructor(public studentService: StudentService){}

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(){
    this.studentService.getStudents().subscribe({
      next: (res) =>{
        this.studentService.students = res;
      },
      error(err) {
        console.log(err);
      }
    })
  }

  deleteStudent(id: any){
    this.studentService.deleteStudent(id).subscribe(res =>{
      console.log(res);
    })
  }

  generatePDFButton() {
    this.generatePDF();
  }

  generatePDF() {
    const doc = new jsPDF();  // Crear un nuevo documento PDF

    // Definir los encabezados de la tabla
    const headers = ['#', 'Name', 'Mail'];
  
    // Extraer los datos de los estudiantes asegurándonos de que sean valores primitivos (string, number)
    const students = this.studentService.students.map((student, index) => [
      index + 1,  // Número de índice (número)
      String(student.title),  // Nombre (string)
      String(student.body),  // Correo electrónico (string)
    ]);
  
    // Usamos jsPDF autoTable para crear la tabla
    autoTable(doc, {
      head: [headers],  // Los encabezados de la tabla
      body: students,  // Los datos de los estudiantes
      startY: 20,  // Posición vertical inicial
      theme: 'striped',  // Estilo de la tabla (striped es una opción que alterna colores)
      headStyles: { fillColor: [22, 160, 133] },  // Estilo para el encabezado de la tabla
      styles: { halign: 'center' },  // Alineación central para las celdas
    });
  
    // Guardar el PDF generado
    doc.save('students.pdf');
  }  
}