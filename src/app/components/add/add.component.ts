import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/http/query.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  public form = this.buildForm();
  public concreteSpecies;
  public spieciesCategory;
  public incidentType;
  public incidentTypes = ['Information', 'Warning', 'Danger'];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public dataService: DataService,
    public queryService: QueryService,
    public dialogService: DialogService
  ) {}

  buildForm(): FormGroup {
    console.log(this.router.getCurrentNavigation()?.extras?.state);
    const { concreteSpecies, spieciesCategory, incidentType, image } =
      this.router.getCurrentNavigation().extras.state;

    this.concreteSpecies = concreteSpecies.map((word) =>
      this.capitalizeWords(word)
    );
    this.spieciesCategory = spieciesCategory.map((word) =>
      this.capitalizeWords(word)
    );

    this.incidentType = incidentType;
    console.log(this.concreteSpecies[0]);

    console.log(image);
    return this.fb.group({
      concreteSpecies: [this.concreteSpecies[0]],
      spieciesCategory: [this.spieciesCategory[0]],
      incidentType: [this.getIncidentLevel(this.incidentType?.incidentLevel)],
      description: [''],
      image: [image],
    });
  }

  public capitalizeWords(str: string) {
    // Split the string into an array of words
    const wordsArray = str.split(' ');

    // Map over the array and capitalize the first letter of each word
    const capitalizedWordsArray = wordsArray.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the capitalized words back into a string
    const capitalizedString = capitalizedWordsArray.join(' ');

    return capitalizedString;
  }

  public getIncidentLevel(level: number): string {
    if (level == 2) {
      return 'Danger';
    }

    if (level == 1) {
      return 'Warning';
    }

    return 'Information';
  }

  public getIncidentType(level: string): number {
    if (level == 'Danger') {
      return 2;
    }

    if (level == 'Warning') {
      return 1;
    }

    return 0;
  }

  public submit(): void {
    this.dataService.getPosition().subscribe(({ lat, lng }) => {
      console.log(2);
      const {
        concreteSpecies,
        spieciesCategory,
        incidentType,
        description,
        image,
      } = this.form.value;

      this.queryService
        .postPoint(
          lat,
          lng,
          spieciesCategory,
          [concreteSpecies],
          incidentType,
          this.getIncidentType(incidentType),
          description,
          image
        )
        .subscribe(() => {
          const callback = () => this.router.navigate(['/map']);

          this.dialogService.openSuccessDialog(callback());
        });
    });
  }
}
