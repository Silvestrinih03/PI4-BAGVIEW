import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatExpansionModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  panel1Open = false;
  panel2Open = false;
  panel3Open = false;
}
