import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
}
document.addEventListener('DOMContentLoaded', () => {
  const faqHeaders = document.querySelectorAll('.faq .head');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const faq = header.parentElement as HTMLElement;
      faq.classList.toggle('active');
    });
  });
});
