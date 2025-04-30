import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Departamento } from '../../modelos/departamento';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './departament-form.component.html',
  styleUrls: ['./departament-form.component.css']
})
export class DepartamentFormComponent implements OnInit, OnChanges {
  @Input() department?: Departamento;
  @Output() formSubmit = new EventEmitter<Departamento>();
  @Output() cancel = new EventEmitter<void>();

  departmentForm: FormGroup;

  colorOptions = [
    { value: 'blue', label: 'Azul', id: 'color-blue' },
    { value: 'red', label: 'Rojo', id: 'color-red' },
    { value: 'green', label: 'Verde', id: 'color-green' },
    { value: 'indigo', label: 'Indigo', id: 'color-indigo' },
    { value: 'purple', label: 'Púrpura', id: 'color-purple' },
  ];

  constructor(private fb: FormBuilder) {
    this.departmentForm = this.fb.group({
      id: [null, [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      icon: ['',],
      iconColorClass: ['text-blue-500', Validators.required],
      bgColorClass: ['bg-blue-100', Validators.required],
      textColorClass: ['text-blue-700', Validators.required],
      buttonBgClass: ['bg-custom-blue', Validators.required],
      buttonHoverClass: ['hover:bg-custom-blue-hover', Validators.required]
    });
  }

  ngOnInit() {
    if (this.department) {
      this.departmentForm.patchValue(this.department);
    }
  }

  ngOnChanges() {
    if (this.department) {
      this.departmentForm.patchValue(this.department);
    }
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.formSubmit.emit(this.departmentForm.value);
    }
  }

  updateColorClasses(color: string) {
    this.departmentForm.patchValue({
      iconColorClass: `text-${color}-500`,
      bgColorClass: `bg-${color}-100`,
      textColorClass: `text-${color}-700`,
      buttonBgClass: `bg-custom-${color}`,
      buttonHoverClass: `hover:bg-custom-${color}-hover`
    });
  }
}