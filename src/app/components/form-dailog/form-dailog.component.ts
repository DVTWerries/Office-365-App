import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import {FormControl} from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Event } from 'src/app/models/events';

@Component({
  selector: 'app-form-dailog',
  templateUrl: './form-dailog.component.html',
  styleUrls: ['./form-dailog.component.scss']
})
export class FormDailogComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  attendeesCtrl = new FormControl();
  filteredAttendees: Observable<any[]>;
  attendees: any[] = [{
    type: 'optional',
    emailAddress: {
      address: 'AKock@jhb.dvt.co.za'
    }
  }];
  allAttendees: any[];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<FormDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event) {
      this.filteredAttendees = this.attendeesCtrl.valueChanges.pipe(
        startWith(null),
        map((attender: string | null) => attender ? this._filter(attender) : this.data.attendees.slice()));
      this.allAttendees = data.attendees;
    }
    

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.attendees.push({
          type: 'optional',
          emailAddress: {
            address: value.trim()
          }
        });
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.attendeesCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.attendees.indexOf(fruit);
    
    if (index >= 0) {
      this.attendees.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.attendees.push({
      type: 'optional',
      emailAddress: {
        address: event.option.viewValue
      }
    });
    this.fruitInput.nativeElement.value = '';
    this.attendeesCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAttendees.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

}
