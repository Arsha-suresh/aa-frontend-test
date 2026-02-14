import { Component } from '@angular/core';
import { Search } from '../components/search/search';
import { Header } from '../components/header/header';

@Component({
  selector: 'app-layout',
  imports: [Header,Search],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
