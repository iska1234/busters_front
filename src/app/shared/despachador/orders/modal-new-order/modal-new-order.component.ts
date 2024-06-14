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
import { ClientService } from '../../../../core/services/client.service';
import { IClient } from '../../../../core/models/IClient';


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
  addNewClientForm!: FormGroup;
  users$!: Observable<IUsersRes[]>;
  isSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<ModalNewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private ordersService: OrdersService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.addNewClientForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      reference: [this.data.placeName],
    });
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
    if (this.addNewClientForm.valid && this.addNewOrderGroup.valid) {
      this.isSubmitting = true;
      const { name, phone, reference } = this.addNewClientForm.value;
      this.clientService.registerClient({ name, phone, reference }).subscribe(
        (clientResponse: any) => {
          const clientId = clientResponse.data.id;
          const { userId, lat, lng } = this.addNewOrderGroup.value;
          this.ordersService.addNewOrder(userId, clientId || 0, lat, lng).subscribe(
            (orderResponse) => {
              this.toastr.success('Orden creada exitosamente');
              this.dialogRef.close(orderResponse);
              this.isSubmitting = false;
            },
            (error) => {
              console.error('Error al crear la orden:', error);
              this.toastr.error('Error al crear la orden');
              this.isSubmitting = false;
            }
          );
        },
        (error) => {
          console.error('Error al registrar el cliente:', error);
          this.toastr.error('Error al registrar el cliente');
          this.isSubmitting = false;
        }
      );
    }
  }
}
