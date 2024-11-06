import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    const faqHeaders = document.querySelectorAll('.faq .head');

    faqHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const faq = header.parentElement as HTMLElement;
        faq.classList.toggle('active');
      });
    });
  }

}
