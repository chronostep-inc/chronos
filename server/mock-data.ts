export interface Role {
  id: number;
  name: string;
  type: number;
};

export type Employee = {
  id: number;
  name: string;
  image_url: string;
  role: Role;
}

export const roles: Role[] = [
  {
    id: 1,
    name: 'Chief Executive Officer',
    type: 1
  },
  {
    id: 2,
    name: 'Chief Technology Officer',
    type: 2
  },
  {
    id: 3,
    name: 'Chief Operating Officer',
    type: 2
  },
  {
    id: 4,
    name: 'Head Office Manager',
    type: 3
  },
  {
    id: 5,
    name: 'Quality Assurance Engineer',
    type: 4
  },
  {
    id: 6,
    name: 'Senior Engineer',
    type: 5
  },
  {
    id: 7,
    name: 'Software Engineer',
    type: 6
  }  
]
export const employees:Employee[] = [
  {
    id: 1,
    name: 'Kazunari Mino',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/mino.jpg',
    role: {
      id: 1,
      name: 'Chief Executive Officer',
      type: 1
    }
  },
  {
    id: 2,
    name: 'Hideo Meguro',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/hide.jpg',
    role: {
      id: 2,
      name: 'Chief Technology Officer',
      type: 2
    }
  },
  {
    id: 3,
    name: 'Shena Marie Dabalos',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 3,
      name: 'Chief Operating Officer',
      type: 2
    }
  },
  {
    id: 4,
    name: 'Marissa Dumayac',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 4,
      name: 'Head Office Manager',
      type: 3
    }
  },
  {
    id: 5,
    name: 'Mae Cristy Cabague',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 5,
      name: 'Quality Assurance Engineer',
      type: 4
    }
  },
  {
    id: 6,
    name: 'Kenneth Bacarisas',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 5,
      name: 'Quality Assurance Engineer',
      type: 4
    }
  },
  {
    id: 7,
    name: 'Joe John Ferrolino',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 6,
      name: 'Senior Engineer',
      type: 5
    }
  },
  {
    id: 8,
    name: 'Daniel Cisneros',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 6,
      name: 'Senior Engineer',
      type: 5
    }
  },
  {
    id: 9,
    name: 'Ian John Baid',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 6,
      name: 'Senior Engineer',
      type: 5
    }
  },
  {
    id: 10,
    name: 'Ericka Jane Quitorio',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 6,
      name: 'Senior Engineer',
      type: 5
    }
  },
  {
    id: 11,
    name: 'Ret Karlo Ferrolino',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 6,
      name: 'Senior Engineer',
      type: 5
    }
  },
  {
    id: 12,
    name: 'Nigel dela Riarte',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 13,
    name: 'Julcarl Selma',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 14,
    name: 'Bryan Asperer',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 15,
    name: 'Fel Reind Entica',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 16,
    name: 'Brian Salo',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 17,
    name: 'Kevin Abrenica',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 18,
    name: 'Vince Caballero',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 19,
    name: 'Gerand Parawan',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 20,
    name: 'Natalie Sagnoy',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 21,
    name: 'Eleasar Patot',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 22,
    name: 'Loraine Cuadero',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 23,
    name: 'Jan Niño Baoc',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 24,
    name: 'Josh Algadipe',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 25,
    name: 'Joma Mier Mumar',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 26,
    name: 'Jesse Paradero',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  },
  {
    id: 27,
    name: 'Paul Batombakal',
    image_url: 'https://www.chronostep.com/cswp/wp-content/uploads/2022/03/jul.png',
    role: {
      id: 7,
      name: 'Software Engineer',
      type: 6
    }
  }
]
