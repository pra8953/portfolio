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
    name: 'Real-Time Cloud IDE',
    description: 'A cloud-based real-time collaborative IDE built with MEAN stack. Supports live coding, collaboration, and cloud execution.',
    githubLink: 'https://github.com/pra8953/-Real-Time_Collaborative_CloUd_IDE.git',
    liveLink: null,
    techStack: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'WebSockets'],
    featured: true,
    year: '2025',
    imageUrl: 'real.png'
  },
  {
    id: 2,
    name: 'sngh.in - Agritech Farming Management System',
    description: 'MERN-based Agritech platform for farm management, crop monitoring, and analytics dashboards.',
    githubLink: 'https://github.com/eduassists/shree_narayan_website.git',
    liveLink: 'https://sngh.in',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    featured: true,
    year: '2025',
    imageUrl: 'sngh.png'
  },
  {
    id: 3,
    name: 'MyEduAssist ERP System',
    description: 'MEAN-based ERP system for educational institutions, managing students, teachers, courses, and reports.',
    githubLink: 'https://github.com/eduassists/production_client_side.git',
    liveLink: 'https://myeduassist.xyz/',
    techStack: ['MongoDB', 'Express.js', 'Angular', 'Node.js'],
    featured: true,
    year: '2025',
    imageUrl: 'edu.png'
  },
  {
    id: 4,
    name: 'Ramanujan College ERP',
    description: 'Laravel-based ERP system for managing college operations, attendance, timetable, and student data.',
    githubLink: 'https://github.com/vaibhav-manacle/college_dev.git',
    liveLink: 'https://erp.ramanujancollege.ac.in',
    techStack: ['Laravel', 'MySQL', 'Bootstrap', 'jQuery'],
    featured: false,
    year: '2023',
    imageUrl: 'erp.png'
  },
  {
    id: 5,
    name: 'Chatting App with Real-Time Video Calling',
    description: 'A real-time chatting application with text messaging and live video call functionality.',
    githubLink: 'https://github.com/pra8953/chat_app.git',
    liveLink: null,
    techStack: ['React', 'Node.js', 'Socket.io', 'WebRTC'],
    featured: false,
    year: '2024',
    imageUrl: 'image.png'
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