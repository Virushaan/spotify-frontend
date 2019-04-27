import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';

interface State {
  name: string;
}

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.scss']
})

export class SearchSongComponent implements OnInit {

  public test: string;

  public searchControl = new FormControl();

  filteredStates: Observable<State[]>;

  // TODO prefill
  public states: State[] = [
    {
      name: 'Song name'
    },
    {
      name: 'New song'
    },
    {
      name: 'Untitled song 1'
    },
    {
      name: 'Untitled song 2'
    }
  ];

  constructor() {
    this.filteredStates = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnInit() {
  }


}
