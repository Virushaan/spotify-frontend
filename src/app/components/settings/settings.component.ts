import { Component, OnInit } from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public autoTicks = false;
  public disabled = false;
  public invert = false;
  public max = 100;
  public min = 0;
  public showTicks = false;
  public step = 1;
  public thumbLabel = true;
  public value;
  public vertical = false;
  private privateTickInterval = 1;

  constructor() { }

  ngOnInit() {
  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this.privateTickInterval) : 0;
  }
  set tickInterval(value) {
    this.privateTickInterval = coerceNumberProperty(value);
  }

}
