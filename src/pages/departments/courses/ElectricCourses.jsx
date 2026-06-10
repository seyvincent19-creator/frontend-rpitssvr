
const electric = {
  id: "electric",
  title: "ដេប៉ាតឺម៉ង់ អគ្គិសនី",
  images: ["/images/edc1.jpg", "/images/edc2.jpg", "/images/edc3.jpg"],
  description: "ដេប៉ាតឺម៉ង់អគ្គិសនី មានបំណងផ្តល់ជំនាញ...",
  skills: [
    "តំឡើងនិងថែទាំប្រព័ន្ធអគ្គិសនីក្នុងអគារ និងឧស្សាហកម្ម",
    "គូសគំនូរប្រព័ន្ធអគ្គិសនីដោយប្រើកម្មវិធី CAD",
    "ប្រើប្រាស់ឧបករណ៍ត្រួតពិនិត្យស្វ័យប្រវត្តិ និង PLC",
    "ធ្វើការសិក្សាស្រាវជ្រាវនិងអភិវឌ្ឍបច្ចេកវិទ្យាថ្មីៗក្នុងវិស័យអគ្គិសនី"
  ],
  courses: ElectricCourses
};


const ElectricCourses = [
  {
    year: "Year 1",
    semesters: {
      semester1: [
        "Mathematics I",
        "Physics I",
        "Computer Fundamentals",
        "Technical Drawing",
        "Khmer Studies"
      ],
      semester2: [
        "Mathematics II",
        "Physics II",
        "Basic Electricity",
        "Introduction to Programming",
        "English I"
      ]
    }
  },
  {
    year: "Year 2",
    semesters: {
      semester1: [
        "Electrical Machines I",
        "Digital Electronics",
        "Engineering Mechanics",
        "English II",
        "AutoCAD Electrical"
      ],
      semester2: [
        "Electrical Machines II",
        "Microcontrollers",
        "PLC Programming",
        "Power Systems",
        "Electromagnetism"
      ]
    }
  },
  {
    year: "Year 3",
    semesters: {
      semester1: [
        "Electrical Installation Design",
        "Control Systems",
        "Instrumentation",
        "Electrical Safety",
        "Project Management"
      ],
      semester2: [
        "SCADA Systems",
        "Renewable Energy Systems",
        "Industrial Automation",
        "Research Methodology",
        "Elective Course"
      ]
    }
  },
  {
    year: "Year 4",
    semesters: {
      semester1: [
        "Advanced Power Electronics",
        "Smart Grid Technology",
        "Entrepreneurship",
        "Capstone Project I"
      ],
      semester2: [
        "Capstone Project II",
        "Professional Internship",
        "Technical Report Writing"
      ]
    }
  }
];

export default ElectricCourses;
