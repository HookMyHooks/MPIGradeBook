import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-average',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './average.component.html',
  styleUrls: ['./average.component.scss'],
})
export class AverageComponent implements OnChanges {
  @Input() grades: { value: number }[] = [];
  average = 0;

  ngOnChanges() {
    if (this.grades.length > 0) {
      const total = this.grades.reduce((sum, g) => sum + g.value, 0);
      this.average = total / this.grades.length;
    }
  }
}
