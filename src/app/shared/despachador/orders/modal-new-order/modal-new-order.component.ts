import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { WInput } from '../../../ui/input/input.component';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IUsersRes } from '../../../../core/models/IUsersRes';
import { OrdersService } from '../../../../core/services/orders.service';


@Component({
  selector: 'app-modal-new-order',
  standalone: true,
  imports: [    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    WInput,
    ReactiveFormsModule,
    CommonModule,
    MatProgressBarModule],
  templateUrl: './modal-new-order.component.html',
  styleUrl: './modal-new-order.component.css'
})
export class ModalNewOrderComponent {
  addNewOrderGroup!: FormGroup;
  users$!: Observable<IUsersRes[]>;
  isSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<ModalNewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.addNewOrderGroup = this.formBuilder.group({
      userId: [''],
      lat: [this.data.lat],
      lng: [this.data.lng],
    });

    this.loadUsers();
  }

  loadUsers(): void {

    this.users$ = this.ordersService.getAllDrivers();
  }

  onSubmit(): void {
    if (this.addNewOrderGroup.valid) {
      this.isSubmitting = true;
      const { userId, lat, lng } = this.addNewOrderGroup.value;

      this.ordersService.addNewOrder(userId, lat, lng).subscribe(
        response => {
          this.toastr.success('Orden creada exitosamente');
          this.dialogRef.close(response);
          this.isSubmitting = false;
        },
        error => {
          this.toastr.error('Error al crear la orden');
          this.isSubmitting = false;
        }
      );
    }
  }

}
