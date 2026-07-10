export type Barber = {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: string;
  reviews: number;
  image: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  icon: string;
};

export type Booking = {
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  createdAt: string;
};

export const barbers: Barber[] = [
  {
    id: "marco",
    name: "Marco Aurelio",
    role: "Master Barber",
    experience: "12 anos exp.",
    rating: "4.9",
    reviews: 120,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQIkmqXPWnCo2sLFDzMqW8lIsGJtSMqpo614z1rjEMj8-89r8whzBic7Rb2Vvx-94R14LmMCXk56m6Hq3OL0tZIF4p5FGBQjFhAZxfq5beuQsca4Zt2oskwJF9Wuy_AABzBURTYSB-NpsaN3N0M4Kz2GKt05FB6Z7K7Y9wEQ2EsA2nTeqkID_OewaEI2eIJFwqaVgy3B-8Pp8cA0U1bQ32csxHxxcDZbi6mHAOy5Tk2XHVhqNcgIIg"
  },
  {
    id: "ana",
    name: "Ana Clara",
    role: "Senior Stylist",
    experience: "8 anos exp.",
    rating: "4.8",
    reviews: 85,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuByMAjC3hVEYaYV2k4NKPVQblynkenGtwAZCybYlKiGH573ytvy2yvoeGEW2Joc0anzW74XmJoucZK0zZxq1cY-mUdJhk08PcevfpfvQ7ESqt0A4EESw4YNtaADKS74I2EKXmh2rY4vh_V4P61wP67Z1vf5SQ3-AX2dMlYcEBJ7lgvlldVK9M-poeOdmrfHwClFrbFEmlCsoWWz88OVb8RgaO3fhRcInZCZuk2-U9jal6fGf9BzBGmD"
  },
  {
    id: "vitor",
    name: "Vitor Hugo",
    role: "Fade Specialist",
    experience: "5 anos exp.",
    rating: "5.0",
    reviews: 42,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACjaI_EcuErTlHcjV13Jgfti7WL5cvvfNy3YlCaHkLnGfiYZ2_PYcohlA22yN5j3Eb7qm8uLCBhYg1yDOQHEJ_r1saHu9fhooGIMWMctPT-Z861P4txpzlGG2rAyafB8K1JCcg7PwXgqM2_bk2-Np9RUrxS9N6l7pv8nWq1NZVWHT0Tv2JhMHMfg-i0MaL2vNTP9nT_2ciT9UvZ-6Dnl5JFrSfK0qMZeK61X7-iOOMXPNlswdalN70"
  }
];

export const services: Service[] = [
  {
    id: "corte-premium",
    name: "Corte Premium",
    description: "Corte com tesoura e maquina + lavagem especial",
    price: 85,
    duration: 45,
    icon: "content_cut"
  },
  {
    id: "barba-executiva",
    name: "Barba Executiva",
    description: "Modelagem com toalha quente e oleos essenciais",
    price: 60,
    duration: 30,
    icon: "face"
  },
  {
    id: "combo-barberpro",
    name: "Combo BarberPro",
    description: "Corte + barba + massagem capilar relaxante",
    price: 130,
    duration: 75,
    icon: "stars"
  }
];

export const dates = [
  "2026-07-10",
  "2026-07-11",
  "2026-07-13",
  "2026-07-14",
  "2026-07-15",
  "2026-07-16"
];

export const times = ["09:00", "09:45", "11:15", "14:00", "14:45", "15:30", "16:15", "17:00"];

export const bookingStorageKey = "barberpro:last-booking";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

export function findBookingParts(booking: Booking | null) {
  return {
    barber: booking ? barbers.find((barber) => barber.id === booking.barberId) ?? null : null,
    service: booking ? services.find((service) => service.id === booking.serviceId) ?? null : null
  };
}
