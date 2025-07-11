// projects.component.ts
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @ViewChild('projectsContainer') projectsContainer!: ElementRef;
  
  activeFilter: string = 'all';
  isLoading: boolean = true;
  imageLoaded: { [key: number]: boolean } = {};
  visibleProjects: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  skeletonItems = Array(4).fill(0);
  
  filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'open-source', label: 'Open Source' }
  ];

  projects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Complete online store solution with payment processing, inventory management, and analytics dashboard.',
      githubLink: 'https://github.com/username/ecommerce-platform',
      liveLink: 'https://ecommerce.example.com',
      techStack: ['Angular', 'Node.js', 'MongoDB', 'Stripe API'],
      featured: true,
      year: '2023',
      imageUrl: 'assets/images/ecommerce.jpg'
    },
    {
      id: 2,
      name: 'Task Management App',
      description: 'Team collaboration tool with real-time updates, task assignments, and progress tracking.',
      githubLink: 'https://github.com/username/task-manager',
      liveLink: 'https://tasks.example.com',
      techStack: ['React', 'Firebase', 'Tailwind CSS'],
      featured: false,
      year: '2023',
      imageUrl: 'assets/images/task-manager.jpg'
    },
    {
      id: 3,
      name: 'Weather Dashboard',
      description: 'Real-time weather forecasting with interactive maps and 5-day predictions.',
      githubLink: 'https://github.com/username/weather-dashboard',
      liveLink: null,
      techStack: ['Vue.js', 'OpenWeather API', 'Chart.js'],
      featured: false,
      year: '2022',
      imageUrl: 'assets/images/weather.jpg'
    },
    {
      id: 4,
      name: 'Portfolio Website',
      description: 'Modern portfolio showcasing skills, projects, and professional experience.',
      githubLink: 'https://github.com/username/portfolio',
      liveLink: 'https://portfolio.example.com',
      techStack: ['Angular', 'Tailwind CSS', 'GSAP'],
      featured: true,
      year: '2023',
      imageUrl: 'assets/images/portfolio.jpg'
    },
    // Add more projects as needed
  ];

  ngOnInit() {
    // Simulate API loading
    setTimeout(() => {
      this.isLoading = false;
      this.updateVisibleProjects();
      this.setupImageObservers();
    }, 1500);
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  get filteredProjects() {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter(project => 
      this.activeFilter === 'open-source' ? 
      project.githubLink.includes('github.com') : 
      project.techStack.some(tech => 
        this.activeFilter === 'web' ? 
        ['Angular', 'React', 'Vue', 'Next.js'].includes(tech) :
        ['React Native', 'Flutter', 'Swift'].includes(tech)
      )
    );
  }

  get hasMoreProjects(): boolean {
    return this.visibleProjects.length < this.filteredProjects.length;
  }

  trackById(index: number, project: any): number {
    return project.id;
  }

  setFilter(filterId: string) {
    this.isLoading = true;
    this.activeFilter = filterId;
    this.currentPage = 1;
    
    setTimeout(() => {
      this.updateVisibleProjects();
      this.isLoading = false;
      this.setupImageObservers();
    }, 500);
  }

  loadMore() {
    this.currentPage++;
    this.updateVisibleProjects();
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    const projectId = parseInt(img.parentElement?.parentElement?.getAttribute('data-project-id') || '0');
    if (projectId) {
      this.imageLoaded[projectId] = true;
    }
  }

  private updateVisibleProjects() {
    const startIndex = 0;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.visibleProjects = this.filteredProjects.slice(0, endIndex);
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target.querySelector('.lazy-image') as HTMLImageElement;
          if (lazyImage && lazyImage.dataset['src']) {
            lazyImage.src = lazyImage.dataset['src'];
          }
        }
      });
    }, { threshold: 0.1 });

    const projectCards = this.projectsContainer.nativeElement.querySelectorAll('.project-card');
    projectCards.forEach((card: Element) => observer.observe(card));
  }

  private setupImageObservers() {
    setTimeout(() => {
      const images = this.projectsContainer.nativeElement.querySelectorAll('.lazy-image');
      images.forEach((img: HTMLImageElement) => {
        if (img.dataset['src'] && !img.src) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                img.src = img.dataset['src'] || '';
                observer.unobserve(img);
              }
            });
          });
          observer.observe(img);
        }
      });
    }, 100);
  }
}