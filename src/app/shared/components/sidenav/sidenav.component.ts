import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { charactersTypes } from 'Core/constants/characters';
import { genderTypes } from 'Core/constants/gender';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isOnFocus = false;
  form!: FormGroup;
  search = new FormControl([null]);
  readonly charactersTypes = charactersTypes;
  readonly genderTypes = genderTypes;
  get queryParamMap(): ParamMap {
    return this.route.snapshot.queryParamMap;
  }

  @Output() searchValue = new EventEmitter<string>();
  expanded = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  getFormsControls(): FormArray {
    return this.form.controls['character'] as FormArray;
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      character: this.fb.array([]),

      gender: [null],
    });

    this.charactersTypes.forEach(el => {
      (<FormArray>this.form.controls['character']).push(new FormControl(false));
    });
    const checkboxes = document.querySelectorAll('input[name="character"]');

    checkboxes.forEach((checkbox: any, index: number) => {
      checkbox.checked = this.queryParamMap
        .getAll('character')
        .includes(checkbox.value)
        ? true
        : false;
    });

    this.route.queryParamMap.subscribe(params => {
      this.search.patchValue(params.get('search'));
      let charactersIds = params.getAll('character').map(el => {
        return Number(el);
      });
      this.form.patchValue(
        {
          character: this.charactersTypes.map(el => {
            return charactersIds.includes(el.id) ? true : false;
          }),

          gender: params.get('gender'),
        },
        {
          emitEvent: false,
        }
      );
    });

    this.form.valueChanges.subscribe(value => {
      let checkedBoxes = document.querySelectorAll(
        'input[name="character"]:checked'
      );
      let values: any[] = [];
      checkedBoxes.forEach((checkbox: any) => {
        values.push(checkbox.value);
      });

      Object.keys(value).forEach(
        el =>
          (value[el] = value[el]
            ? Array.isArray(value[el])
              ? values
              : value[el]
            : null)
      );

      this.router.navigate([], {
        queryParams: {
          ...value,
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  searchInput(value: string) {
    this.searchValue.emit(value);
  }
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const id = document.getElementById('character');
    const checkboxes = document.getElementById('checkboxes');

    if (
      !id!.contains(event.target as HTMLElement) &&
      (event.target as HTMLElement).id !== 'character'
    ) {
      checkboxes!.classList.remove('active');
      this.expanded = false;
    } else {
      checkboxes!.classList.add('active');
      this.expanded = true;
    }
  }
}
