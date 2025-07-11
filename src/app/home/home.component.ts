import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 titles: string[] = ['Software Engineer ', 'Full Stack Developer ', 'DevOps Engineer ','ML Engineer ','Freelancer '];
  currentTitleIndex = 0;
  currentIndex = 0;
  typedText: string = '';
  isDeleting = false;

  ngOnInit() {
    this.typeLoop();
  }

  typeLoop() {
    const currentTitle = this.titles[this.currentTitleIndex];

    if (this.isDeleting) {
      this.typedText = currentTitle.substring(0, this.currentIndex--);
    } else {
      this.typedText = currentTitle.substring(0, this.currentIndex++);
    }

    let typingSpeed = this.isDeleting ? 100 : 150;

    if (!this.isDeleting && this.currentIndex === currentTitle.length) {
      // Pause after full word
      typingSpeed = 1500;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentIndex === 0) {
      // Move to next word
      this.isDeleting = false;
      this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
      typingSpeed = 500;
    }

    setTimeout(() => this.typeLoop(), typingSpeed);
  }
}
