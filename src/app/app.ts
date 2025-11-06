import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './features/components/navbar/navbar/navbar';
import { Footer } from './features/components/footer/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , Navbar , Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EC-Store');
}
