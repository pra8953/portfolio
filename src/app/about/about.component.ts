import { NgFor } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [NgFor],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  skills = [
    { name: 'Web development', percentage: 80 },
    { name: 'DSA', percentage: 80 },
    { name: 'ML', percentage: 60 },
    { name: 'Angular', percentage: 96 },
  ];
  
  education = [
    {
      year: '2023 - 2027',
      title: 'B.Voc(Software Development)',
      description: 'Pursuing Bachelor of Vocation in Software Development from Ramanujan College, University of Delhi. Gained hands-on experience in software engineering principles, full-stack development, and real-world projects. Maintained a strong academic record with a current SGPA of 8.64 in the 3rd semester.',
    },
    {
      year: '2020 - 2023',
      title: 'Higher Secondary School',
      description: 'Completed 12th with Physics, Chemistry, and Mathematics under the UP Board in 2023. Built a strong foundation in logical reasoning and problem-solving which laid the groundwork for software development and programming.',
    },
  ];

  experience = [
    {
    year: '06/2025 – Present',
    title: 'Full Stack Developer (Real-time Cloud IDE)',
    description: `Working on a real-time cloud-based IDE platform using the MEAN stack. Implemented live code editor, real-time collaboration, cloud execution, authentication, and role-based access. Focused on scalability, performance, and seamless developer experience.`,
  },
  {
    year: '05/2025 – Present',
    title: 'Full Stack Developer (sngh.in)',
    description: `Developed sngh.in, a MERN-based Agritech web application. Built modules for farm management, crop monitoring, and analytics dashboards. Implemented secure authentication, RESTful APIs, responsive UI, and collaborated with agritech clients for real-world deployment.`,
  },
  {
    year: '04/2025 – Present',
    title: 'Full Stack Developer',
    description: `Working as a Full Stack Developer on MERN-based HRMS, ERP, and educational systems. Developed scalable modules for employee management, attendance, payroll, and dashboards. Implemented secure authentication, role-based access, RESTful APIs, and responsive UIs while collaborating with clients on real-world deployments.`,
  },
  {
    year: '01/2024 – 03/2024',
    title: 'Full Stack Developer',
    description: `Built a Laravel-based educational platform at Ramanujan College (Kalkaji, Delhi). Used Laravel, MySQL, Bootstrap, jQuery, and Ajax to develop features like user login, study materials, previous year questions (PYQs), and online test systems.`,
  },
  {
    year: '11/2023 – 12/2023',
    title: 'React Developer',
    description: `Worked with Lock Uthaan Pahal Foundation on an NGO project. Developed a React-based website (SAMIP) to offer secure UI and smooth navigation for home services.`,
  },
  {
    year: '2023 – 09/2023',
    title: 'Junior Software Engineer',
    description: `Contributed to college ERP modules at APC – Ramanujan College, Delhi. Built and optimized web features like Attendance and Timetable using Laravel, Bootstrap, and MySQL, focusing on user-friendly and scalable academic solutions.`,
  },
  ];

  carPosition = 0;
  timelineHeight = 0;
  timelineOffsetTop = 0;

  ngAfterViewInit() {
    this.calculateTimelineDimensions();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.updateCarPosition();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.calculateTimelineDimensions();
    this.updateCarPosition();
  }

  calculateTimelineDimensions() {
    const timelineElement = document.querySelector('.timeline-container');
    if (timelineElement) {
      this.timelineHeight = timelineElement.clientHeight;
      this.timelineOffsetTop = timelineElement.getBoundingClientRect().top + window.scrollY;
    }
  }

  updateCarPosition() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Calculate position relative to timeline
    const relativePosition = scrollPosition - this.timelineOffsetTop + (windowHeight * 0.3);
    
    // Calculate percentage (0 to 1) of scroll through timeline
    let scrollPercent = relativePosition / this.timelineHeight;
    scrollPercent = Math.max(0, Math.min(1, scrollPercent)); // Clamp between 0 and 1
    
    // Update car position
    this.carPosition = scrollPercent * 100;
  }
}