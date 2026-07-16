export interface ServiceOption {
  id: string;
  name: string;
  price: number;
  category: "novia" | "social" | "quinceanera" | "ugc" | "automaquillaje";
  includes: string[];
  homeService: boolean;
  description?: string;
  duration?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  services: ServiceOption[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "novia",
    name: "Novia",
    services: [
      {
        id: "novia-civil",
        name: "Paquete de Novia Civil",
        price: 150,
        category: "novia",
        includes: [
          "Maquillaje y Peinado (3 horas)",
          "Pestañas personalizadas",
          "Mascarilla facial",
          "Asesoría de estilo de novia",
        ],
        homeService: true,
        duration: "3h",
      },
      {
        id: "novia-eclesiastico",
        name: "Paquete de Novia Eclesiástico",
        price: 200,
        category: "novia",
        includes: [
          "Maquillaje y Peinado (3 horas)",
          "Pestañas personalizadas",
          "Asesoría de estilo de novia",
          "Mascarilla facial",
          "Prueba de Novia (1 hora)",
          "Kit de Retoque",
        ],
        homeService: true,
        duration: "3h",
      },
      {
        id: "novia-completo",
        name: "Paquete de Novia Civil o Eclesiástico",
        price: 320,
        category: "novia",
        includes: [
          "Maquillaje y Peinado (3 horas)",
          "Pestañas personalizadas",
          "Asesoría de estilo de novia",
          "Maquillaje en escote",
          "Mascarilla facial y Parches de ojos",
          "Prueba de maquillaje de dos propuestas (2 horas)",
          "Kit de retoque",
        ],
        homeService: true,
        duration: "3h",
      },
      {
        id: "novia-familiar",
        name: "Paquete Familiar Civil o Eclesiástico",
        price: 300,
        category: "novia",
        includes: [
          "Maquillaje y peinado mamá",
          "Maquillaje y peinado suegra",
          "Maquillaje y peinado dama 1",
          "Maquillaje y peinado dama 2",
        ],
        homeService: true,
        duration: "3h+",
      },
      {
        id: "novia-prueba",
        name: "Prueba de Novia",
        price: 100,
        category: "novia",
        includes: ["Sesión de prueba de maquillaje"],
        homeService: false,
        duration: "1h",
        description: "Todos los maquillajes de novia tienen domicilio disponible, menos las pruebas.",
      },
    ],
  },
  {
    id: "social",
    name: "Maquillaje Social",
    services: [
      {
        id: "social-maquillaje",
        name: "Maquillaje Social",
        price: 50,
        category: "social",
        includes: ["Maquillaje profesional"],
        homeService: true,
        duration: "1h",
      },
      {
        id: "social-maquillaje-peinado",
        name: "Maquillaje Social + Peinado",
        price: 80,
        category: "social",
        includes: ["Maquillaje profesional", "Peinado"],
        homeService: true,
        duration: "1.5h",
      },
    ],
  },
  {
    id: "quinceanera",
    name: "Quinceañera",
    services: [
      {
        id: "quin-makeup",
        name: "Maquillaje de Quinceañera",
        price: 60,
        category: "quinceanera",
        includes: ["Maquillaje profesional para quinceañera"],
        homeService: true,
        duration: "1h",
      },
      {
        id: "quin-makeup-hair",
        name: "Maquillaje + Peinado Quinceañera",
        price: 100,
        category: "quinceanera",
        includes: ["Maquillaje profesional", "Peinado"],
        homeService: true,
        duration: "1.5h",
      },
      {
        id: "quin-trial",
        name: "Prueba de Quinceañera",
        price: 90,
        category: "quinceanera",
        includes: ["Sesión de prueba de maquillaje"],
        homeService: false,
        duration: "1h",
      },
      {
        id: "quin-mom",
        name: "Quinceañera & Mamá",
        price: 110,
        category: "quinceanera",
        includes: ["Maquillaje para quinceañera", "Maquillaje para mamá"],
        homeService: true,
        duration: "2h",
      },
    ],
  },
  {
    id: "ugc",
    name: "UGC Creator",
    services: [
      {
        id: "ugc-content",
        name: "Contenido UGC",
        price: 0,
        category: "ugc",
        includes: ["Filmación y edición de contenido orgánico"],
        homeService: true,
        duration: "Variable",
        description: "Contenido para marcas. Consulta presupuesto personalizado.",
      },
    ],
  },
  {
    id: "automaquillaje",
    name: "Automaquillaje",
    services: [
      {
        id: "auto-class",
        name: "Clase de Automaquillaje",
        price: 0,
        category: "automaquillaje",
        includes: ["Sesión uno a uno", "Técnicas para tu rostro y estilo"],
        homeService: false,
        duration: "2h",
        description: "Aprende técnicas profesionales adaptadas a ti. Consulta precios.",
      },
    ],
  },
];

export const WHATSAPP_NUMBER = "593983366831";

export const WHATSAPP_MESSAGE =
  "Hola%2C%20estoy%20interesada%20en%20el%20servicio%20de%20";

export const TIME_SLOTS = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30"
] as const;

export const SLOT_DURATION_MINUTES = 90;

export const BANK_ACCOUNTS = [
  {
    bank: "Banco Pichincha",
    type: "Cuenta de Ahorros",
    number: "2210686371",
    holder: "Lesley Fiorella Valencia Garcia",
    email: "valencia.fiorella_1999@hotmail.com",
    id: "0924001829",
  },
  {
    bank: "Banco Produbanco",
    type: "Cuenta de Ahorros",
    number: "20003285853",
    holder: "Lesley Fiorella Valencia Garcia",
    email: "valencia.fiorella_1999@hotmail.com",
    id: "0924001829",
  },
];

export const RESCHEDULE_POLICY =
  "Las reservas pueden reagendarse con hasta 48 horas de anticipación. En caso de cancelación con menos de 24 horas de anticipación, no se realizará reembolso del depósito.";
