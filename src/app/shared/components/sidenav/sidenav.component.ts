import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { suppliersTypes } from 'Core/constants';
import { categoriesTypes } from 'Core/constants/categories';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isOnFocus = false;
  form!: FormGroup;
  search = new FormControl([null]);
  readonly suppliersTypes = suppliersTypes;
  readonly categoriesTypes = categoriesTypes;
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
    return this.form.controls['supplierID'] as FormArray;
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      supplierID: this.fb.array([]),

      categoryID: [null],
    });

    this.suppliersTypes.forEach(el => {
      (<FormArray>this.form.controls['supplierID']).push(
        new FormControl(false)
      );
    });
    const checkboxes = document.querySelectorAll('input[name="supplier"]');

    checkboxes.forEach((checkbox: any, index: number) => {
      checkbox.checked = this.queryParamMap
        .getAll('supplierID')
        .includes(checkbox.value)
        ? true
        : false;
    });

    this.route.queryParamMap.subscribe(params => {
      this.search.patchValue(params.get('search'));
      this.form.patchValue(
        {
          supplierID: this.suppliersTypes.map(el => {
            return params.getAll('supplierID').includes(el.id.toString())
              ? true
              : false;
          }),

          categoryID: Number(params.get('categoryID')),
        },
        {
          emitEvent: false,
        }
      );
    });

    this.form.valueChanges.subscribe(value => {
      let checkedBoxes = document.querySelectorAll(
        'input[name="supplier"]:checked'
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
    const id = document.getElementById('supplier');
    const checkboxes = document.getElementById('checkboxes');

    if (
      !id!.contains(event.target as HTMLElement) &&
      (event.target as HTMLElement).id !== 'supplier'
    ) {
      checkboxes!.classList.remove('active');
      this.expanded = false;
    } else {
      checkboxes!.classList.add('active');
      this.expanded = true;
    }
  }
}
