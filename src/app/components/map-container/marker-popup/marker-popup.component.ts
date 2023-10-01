import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class MarkerPopupComponent implements OnInit {
  public concreteSpecies: any;
  public creationDate: any;
  public description: any;
  public id: any;
  public image: any;
  public incidentType: any;
  public spieciesCategory: any;
  public x: any;
  public y: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MarkerPopupComponent>,
    public cdr: ChangeDetectorRef
  ) {
    console.log(this.data);
    if (this.data) {
    }

    setTimeout(() => {
      const {
        concreteSpecies,
        creationDate,
        description,
        id,
        image,
        incidentType,
        spieciesCategory,
        x,
        y,
      } = this.data;

      this.concreteSpecies = concreteSpecies;
      this.creationDate = creationDate;
      this.description = description;
      this.id = id;
      this.image = image;
      this.incidentType = incidentType;
      this.spieciesCategory = spieciesCategory;
      this.x = x;
      this.y = y;
    });
  }

  public ngOnInit(): void {
    console.log(this.data);
  }

  public getContent(): void {
    console.log(1231414);
    return this.concreteSpecies ? this.concreteSpecies[0] : '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
