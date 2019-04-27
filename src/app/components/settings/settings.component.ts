import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Output() thresholdUpdated = new EventEmitter();
  public thresholdValue = 1;

  constructor() { }

  ngOnInit() {
  }

  public updateThreshold(newThreshold) {
    this.thresholdUpdated.emit(this.thresholdValue);
  }

}
