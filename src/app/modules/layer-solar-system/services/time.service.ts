import { Injectable } from '@angular/core';

/**
 * Stores the value of the current selection of the moment in time.
 */
@Injectable()
export class TimeService {

  private _selectedTime: Date;

  constructor() {
    this._selectedTime = new Date();
  }

  public get selectedTime(): Date {
    return this._selectedTime;
  }

  public set selectedTime(time: Date) {
    this._selectedTime = time;
  }

}
