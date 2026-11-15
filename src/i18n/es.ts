import type { Messages } from "./types";

export const es: Messages = {
  meta: {
    title: "MedElite International Health — Atención médica de élite en México",
    description:
      "MedElite International Health, con sede en Vancouver, lo conecta con hospitales de primer nivel y especialistas reconocidos en México. Cuidado personalizado, precios transparentes y soporte total en cada paso.",
  },
  skip: "Saltar al contenido",
  nav: {
    aria: "Principal",
    menu: "Abrir menú",
    close: "Cerrar menú",
    specialties: "Especialidades",
    packages: "Paquetes",
    quote: "Estimación",
    journey: "Recorrido",
    snowbirds: "Snowbirds",
    trust: "Confianza",
    network: "Red",
    faq: "Preguntas",
    contact: "Contacto",
    privacy: "Privacidad",
    terms: "Términos",
  },
  langAria: "Idioma",
  notice:
    "Estimaciones, no cotizaciones. El cirujano en México confirma el plan por escrito.",
  hero: {
    kicker: "MedElite International Health · Vancouver, BC",
    title: "Atención médica de élite en México para canadienses",
    lede:
      "Coordinamos atención electiva en México para pacientes de Canadá, desde una oficina en Vancouver. El socio ancla es Grupo Médico Joya, con nueve sedes. El acto médico ocurre en México. Esta página no sustituye una consulta.",
    ctaQuote: "Estime un rango",
    ctaHow: "Cómo funciona",
    illAlt: "Ilustración de la Bahía de Banderas al atardecer. No es una fotografía.",
    illCap: "Ilustración, no una fotografía del hospital.",
    route: "Vancouver (YVR) – Puerto Vallarta (PVR), vuelo directo de unas 5 horas.",
    metrics: [
      { value: "105,529", label: "Canadienses atendidos fuera del país en 2025 (Fraser Institute, estimación)" },
      { value: "32.2 sem", label: "Espera mediana en Columbia Británica, del médico familiar al tratamiento (Fraser 2025)" },
      { value: "~5 h", label: "Vuelo directo Vancouver – Puerto Vallarta (Air Canada, WestJet, Flair)" },
      { value: "490 mil+", label: "Canadienses llegados a Jalisco por avión en 2024 (SECTUR Jalisco)" },
    ],
  },
  role: {
    kicker: "Qué hacemos",
    title: "Una oficina de coordinación, no un hospital",
    body: "MedElite International Health acompaña el recorrido administrativo y logístico: estimación, videollamada informativa con el cirujano en México, viaje, estancia y el informe para su médico de familia. No diagnosticamos, no prescribimos y no operamos.",
    points: [
      "El equipo de Vancouver recopila su cuestionario. No hace triaje clínico.",
      "La decisión de operar la toma el cirujano en el hospital, en México.",
      "La red puede sumar más hospitales mexicanos. Hoy el socio que nombramos es Grupo Médico Joya.",
    ],
  },
  verticals: {
    kicker: "Especialidades",
    title: "Tres verticales, y el resto a solicitud",
    deck: "Durante esta etapa concentramos la coordinación en tres grupos de procedimientos y los asociamos a sedes Joya como referencia de ruta. No es una acreditación del hospital: es el mapa con el que MedElite organiza los casos.",
    focus: "Ruta de coordinación",
    request: "A solicitud",
    items: [
      {
        title: "Ortopedia: cadera y rodilla",
        body: "Reemplazos articulares para quien ya está en lista de espera. La estancia prevista después de la cirugía es de 7 a 10 días, con certificado de aptitud para volar antes del regreso.",
        sites: "Marina Vallarta, Riviera Nayarit, Chapala (Ajijic) y San Miguel de Allende.",
        request: false,
      },
      {
        title: "Cirugía bariátrica",
        body: "Procedimientos metabólicos y de pérdida de peso. La misma estancia de 7 a 10 días aplica antes de volar. El cirujano decide si el caso puede viajar.",
        sites: "Guadalajara y Querétaro.",
        request: false,
      },
      {
        title: "Cirugía plástica y oftalmología",
        body: "Cirugía plástica, reconstructiva y oftalmología, con recuperación según la instrucción del cirujano. El rango publicado de esta página es el de rodilla, no el precio de estos procedimientos.",
        sites: "Cancún y Playa del Carmen.",
        request: false,
      },
      {
        title: "Otras especialidades",
        body: "Cardiología, oncología, columna, dental, fertilidad y el resto se revisan solo a solicitud. No publicamos un precio y no los presentamos como centros de excelencia de esta etapa.",
        sites: "Se confirma por escrito si hay una sede adecuada.",
        request: true,
      },
    ],
  },
  packages: {
    kicker: "Paquetes",
    title: "Tres niveles para un reemplazo de rodilla",
    deck: "Los rangos son para un reemplazo total de rodilla, en dólares canadienses. Dicen «desde» porque el cirujano puede cambiar el número. No incluyen un vuelo que usted compre por su cuenta, salvo que el acuerdo escrito lo diga.",
    from: "Desde",
    range: "Rango de planeación",
    example: "Reemplazo total de rodilla, en dólares canadienses. Sujeto a valoración médica. No es una cotización.",
    note: "medeliteofficial.com publica ahorros de 50–70 % frente a Canadá. Es una declaración comercial de la empresa, no una auditoría independiente. El único precio es la cotización escrita.",
    payment:
      "El modelo previsto es un anticipo del 30 % (Interac e-Transfer o tarjeta) y el 70 % por transferencia 15 días antes de viajar, a la cuenta que nombre el acuerdo escrito. Este sitio no cobra y no guarda números de tarjeta.",
    items: {
      snowbird: {
        name: "Snowbird",
        who: "Para quien ya está en México: Puerto Vallarta, Riviera Nayarit, Ajijic, La Peñita o San Miguel de Allende.",
        points: [
          "Cirugía y, si hay implante, el implante que nombre la cotización.",
          "Dos noches de hospital en el reemplazo de rodilla.",
          "El diseño del paquete prevé un seguro de complicaciones, válido solo si la cotización lo nombra y confirma al cirujano.",
          "Visitas de enfermería en domicilio e inicio de fisioterapia, según el plan de rodilla.",
          "Intérprete en la coordinación y seguimiento por video al volver a Canadá.",
          "Sin hotel, sin traslados de aeropuerto y sin vuelos: la persona ya está en México.",
        ],
      },
      essential: {
        name: "Essential",
        who: "Para quien viaja desde Canadá y quiere salir de la lista de espera con un paquete claro.",
        points: [
          "Todo lo del nivel Snowbird.",
          "Siete noches de hotel de cuatro estrellas, en habitación accesible, en el reemplazo de rodilla.",
          "Traslados privados aeropuerto–hospital–hotel.",
          "Intérprete en la coordinación.",
          "Seguimiento por video al volver a Canadá.",
          "Gestión del certificado de aptitud para volar antes del regreso.",
        ],
      },
      executive: {
        name: "Executive",
        who: "Para quien viaja con acompañante y quiere una estancia más holgada.",
        points: [
          "Habitación de hospital tipo suite, según disponibilidad nombrada en la cotización.",
          "Ocho noches de hotel de cinco estrellas, con desayuno, en el reemplazo de rodilla.",
          "Enfermería diaria en el hotel y cuatro sesiones de fisioterapia en México, en el reemplazo de rodilla.",
          "Intérprete, traslados y seguimiento por video al volver a Canadá.",
        ],
      },
    },
  },
  wizard: {
    kicker: "Estimación",
    title: "Cuestionario de coordinación",
    deck: "Cuatro datos — procedimiento, salud básica, fechas y contacto — y un rango cuando existe uno publicado. Si lo envía, se abre su correo hacia info@medeliteofficial.com. Nada se manda a un servidor de esta página.",
    admin:
      "Esto es un cuestionario administrativo para armar un expediente de coordinación. No es una valoración médica y no es un triaje clínico en Canadá. El cirujano en México revisa el caso.",
    emergency: "Si es una urgencia, llame a los servicios de emergencia de donde esté. MedElite no es una ambulancia ni un servicio de urgencias.",
    steps: ["Procedimiento", "Paquete", "Salud", "Fechas", "Contacto", "Rango"],
    progress: "Paso {current} de {total}",
    back: "Atrás",
    next: "Continuar",
    clear: "Borrar respuestas de esta sesión",
    procedureLegend: "¿Qué procedimiento le interesa?",
    procedures: {
      knee: { label: "Reemplazo de rodilla", hint: "Ruta de ortopedia en la red Joya." },
      hip: { label: "Reemplazo de cadera", hint: "Misma ruta. El rango publicado es el de rodilla." },
      bariatric: { label: "Cirugía bariátrica", hint: "Guadalajara o Querétaro. El precio se confirma por escrito." },
      plastic: { label: "Cirugía plástica", hint: "Cancún o Playa del Carmen. Sin banda publicada en esta página." },
      ophthalmology: { label: "Oftalmología", hint: "Cancún o Playa del Carmen. Sin banda publicada en esta página." },
      other: { label: "Otra especialidad", hint: "A solicitud. No hay rango en esta página." },
    },
    packageLegend: "¿Qué nivel quiere comparar?",
    healthLegend: "Datos básicos para el cirujano",
    age: "Rango de edad",
    ages: ["18–39", "40–54", "55–69", "70 o más"],
    bmi: "Rango de IMC, si lo conoce",
    bmis: ["Menos de 30", "30–34", "35–39", "40 o más"],
    conditions: "Marque lo que corresponda. No escriba diagnósticos ni estudios.",
    conditionOpts: ["Diabetes", "Enfermedad cardiaca", "Anticoagulantes", "Ninguna de estas"],
    inMexico: "¿Ya está en México?",
    yes: "Sí",
    no: "No",
    datesLegend: "Fechas",
    month: "Mes preferido",
    monthHint: "Dentro de los próximos 24 meses.",
    flexible: "Mis fechas son flexibles",
    companion: "¿Viaja con acompañante?",
    contactLegend: "Cómo le contactamos",
    first: "Nombre",
    last: "Apellido",
    email: "Correo electrónico",
    phone: "Teléfono",
    city: "Ciudad y provincia en Canadá",
    cityPh: "Vancouver, BC",
    note: "Nota opcional, sin datos clínicos detallados ni tarjetas",
    notePh: "Cuéntenos en general cómo ayudarle. No incluya diagnósticos, estudios ni números de tarjeta.",
    adult: "Confirmo que tengo 18 años o más.",
    consent:
      "Consiento que MedElite use estos datos para coordinar mi solicitud y, si hace falta, los comparta con el hospital y el cirujano en México. Entiendo la transferencia transfronteriza bajo PIPEDA y la PIPA de Columbia Británica, y el tratamiento en México bajo la LFPDPPP. He leído el aviso de privacidad.",
    errors: {
      required: "Complete los campos marcados.",
      email: "Escriba un correo válido.",
      phone: "Escriba un teléfono con al menos 10 dígitos.",
      consent: "La casilla de consentimiento es necesaria para continuar.",
      adult: "Este formulario es solo para mayores de 18 años.",
      card: "No incluya números de tarjeta.",
      month: "Elija un mes dentro de los próximos 24 meses.",
      past: "Ese mes ya pasó.",
      conditions: "Marque al menos una opción de salud.",
      conflict: "Si marca «ninguna», no marque otras opciones.",
    },
    resultTitle: "Su rango estimado",
    fromLabel: "Desde",
    onRequest:
      "Para este procedimiento no hay una banda publicada. Un coordinador en Vancouver le escribe con un rango después de que el cirujano en México revise el caso.",
    kneeBasis: "Banda de planeación para un reemplazo total de rodilla. Sujeta a valoración médica. No es una cotización.",
    hipBasis:
      "La única banda publicada es la del reemplazo total de rodilla. La cadera usa la misma banda hasta que el cirujano revise el caso.",
    complexity:
      "El tope del rango sube un 8 % porque marcó una condición o un IMC de 40 o más. Es una regla de esta página, no un honorario clínico.",
    snowFlag:
      "Snowbird no incluye hotel ni vuelos: es para quien ya está en México. Si viaja desde Canadá, compare Essential.",
    notQuote: "Un coordinador revisa el mensaje en horario de Vancouver y responde, como meta, en un día hábil. La cotización escrita reemplaza este rango.",
    send: "Abrir el correo a info@medeliteofficial.com",
    sent: "Si su correo no se abrió, escríbanos a info@medeliteofficial.com. Usted decide si envía el mensaje.",
    subject: "Estimación MedElite — solicitud de coordinación",
    leadIntro: "Solicitud de coordinación desde medelite.com.mx. No es una cotización.",
    leadConsent: "Consentimiento: la persona aceptó PIPEDA, PIPA (C.B.) y LFPDPPP para esta solicitud.",
    leadDisclaimer: "El rango, si aparece, es una estimación sujeta a valoración médica en México.",
  },
  journey: {
    kicker: "Recorrido",
    title: "De la estimación al seguimiento en casa",
    deck: "Ocho pasos. Los tiempos los confirma el hospital. Si el cirujano considera que no es seguro viajar, no se arma un viaje.",
    steps: [
      { title: "Estimación", body: "El cuestionario de esta página produce un rango cuando hay banda publicada, o marca el caso como a solicitud." },
      { title: "Videollamada con el cirujano", body: "La sesión con el cirujano mexicano es informativa. No es ejercicio de la medicina en Canadá. El diagnóstico y la indicación ocurren en México." },
      { title: "Reserva", body: "Si el caso sigue, recibe una cotización escrita. El pago, si lo acepta, se hace fuera de este sitio, según ese documento." },
      { title: "Viaje", body: "Le orientamos sobre vuelos directos, entrada a México, acompañante y traslados. Usted compra sus vuelos, salvo que el acuerdo diga otra cosa." },
      { title: "Cirugía", body: "La cirugía se hace en el hospital en México, por el cirujano de ese hospital. MedElite no opera." },
      { title: "Recuperación de 7 a 10 días", body: "En cadera, rodilla y bariátrica el plan es permanecer en México de 7 a 10 días antes de volar. Otros procedimientos siguen la instrucción del cirujano." },
      { title: "Aptitud para volar", body: "Antes del vuelo de regreso, el cirujano valora si puede volar. Las aerolíneas pueden pedir ese certificado por el riesgo de trombosis." },
      { title: "Seguimiento en casa", body: "El diseño del recorrido incluye un resumen de alta para su médico de familia y contacto de seguimiento. El expediente clínico vive en el hospital." },
    ],
  },
  snow: {
    kicker: "Snowbirds",
    title: "Si el invierno ya lo pasa en México",
    paragraphs: [
      "Una parte de los canadienses que MedElite puede acompañar no sale de Vancouver para operarse: ya pasa el invierno en Puerto Vallarta, Nuevo Vallarta, Bucerías, Ajijic, La Peñita o San Miguel de Allende. Grupo Médico Joya tiene hospital en esas zonas.",
      "Un directorio de snowbirds estima que el 4 % de los snowbirds canadienses inverna en Puerto Vallarta. The Globe and Mail ha descrito la bahía como un destino de invierno consolidado, con «miles» de canadienses. Son descripciones de terceros, no un censo de MedElite.",
      "El paquete Snowbird es en el lugar: no incluye hotel ni vuelos. Sirve para quien ya está ahí y quiere coordinar una cirugía electiva, un chequeo o la ruta hacia el hospital Joya de esa zona. No es un seguro de viaje ni un servicio de ambulancia.",
    ],
    alt: "Ilustración de una navegadora con diadema. No es una fotografía de una persona real.",
    cap: "Ilustración. La coordinación en Vancouver es humana; esta imagen no retrata a una empleada.",
  },
  metc: {
    kicker: "Impuestos",
    title: "Crédito fiscal por gastos médicos (METC)",
    paragraphs: [
      "La Agencia de Ingresos de Canadá (CRA) administra el Medical Expense Tax Credit. Algunos gastos médicos pagados fuera de Canadá pueden ser elegibles. El alojamiento turístico, los vuelos y la coordinación logística en general no lo son.",
      "El modelo de MedElite es separar en los comprobantes lo clínico de lo que es hotel y logística, para que su contador distinga las partidas. Eso no garantiza que la CRA acepte un monto.",
    ],
    disclaimer: "Esto no es asesoría fiscal ni legal. Consulte a un contador (CPA) y la página de la CRA antes de declarar.",
    link: "Página de la CRA sobre gastos médicos",
  },
  trust: {
    kicker: "Confianza",
    title: "Lo que afirmamos y lo que no",
    deck: "La confianza se construye con límites claros. Estas son las reglas públicas de esta página.",
    items: [
      {
        title: "Facilitador, no tratante",
        body: "MedElite coordina. El hospital y el cirujano en México son responsables del acto médico. No hay relación médico-paciente con MedElite por usar este sitio.",
      },
      {
        title: "Videollamadas",
        body: "Una sesión virtual con un médico mexicano es una orientación informativa. No es ejercicio de la medicina en Columbia Británica ni en el resto de Canadá, y no incluye prescripción para uso en Canadá.",
      },
      {
        title: "Sin acreditaciones obtenidas",
        body: "No afirmamos JCI, CLACS, CSG, GHA ni MTA para MedElite ni para Grupo Médico Joya. GHA y MTA son estándares hacia los que MedElite trabaja. No están obtenidos.",
      },
      {
        title: "Seguro de complicaciones",
        body: "El diseño del paquete prevé una póliza de complicaciones. Solo existe si su cotización nombra a la aseguradora y confirma que el cirujano y el hospital están registrados. Hasta entonces, no dé la póliza por contratada.",
      },
      {
        title: "Dos relojes de espera",
        body: "Fraser Institute, 2025: 32.2 semanas en C.B. del médico familiar al tratamiento, y 48.6 semanas nacionales en ortopedia. El Ministerio de Salud de C.B. midió otro tramo para 2025–2026: 97,963 personas en lista quirúrgica y 6.0 semanas desde la programación hasta la cirugía. No mezclamos esas cifras.",
      },
      {
        title: "Planes provinciales",
        body: "Los planes provinciales no suelen cubrir cirugía electiva en el extranjero. Algunos seguros privados sí revisan ciertos gastos. Pregunte a su aseguradora; MedElite no promete un reembolso.",
      },
    ],
    standards: "Credenciales, tecnología y resultados se revisan caso por caso antes de una cotización escrita. No publicamos un directorio de médicos en esta página.",
  },
  network: {
    kicker: "Red",
    title: "Nueve sedes de Grupo Médico Joya",
    deck: "Datos tomados de hospitaljoya.com (consulta del 14 de noviembre de 2026). MedElite no habla en nombre del hospital. La red está abierta a más hospitales mexicanos; un nombre aparece aquí solo con un acuerdo. Hoy el socio ancla es este grupo.",
    open: "El grupo anuncia, sin inaugurar en la información consultada, sedes en Tulum, Manzanillo y Mérida, y un Centro Oncológico en Bahía de Banderas. No se coordinan como hospitales abiertos.",
    future: "En septiembre de 2026, Grupo Médico Joya y HM Hospitales (España) anunciaron un acuerdo marco. Es un acuerdo entre esos dos grupos, no una acreditación de MedElite.",
    hm: "Comunicado de HM Hospitales, 10 de septiembre de 2026",
    view: "Ficha del hospital",
    opened: "Año que publica el grupo: {year}",
    logoAlt: "Logotipo de Hospital Joya, red hospitalaria aliada",
    source: "Direcciones y teléfonos según las fichas y la página de contacto del grupo. Para Playa del Carmen, Chapala y La Peñita se usan los números de esa página de contacto.",
    phones: "Teléfono",
    focus: {
      orthopedics: "Ruta: ortopedia",
      bariatric: "Ruta: bariátrica",
      plastic: "Ruta: plástica y oftalmología",
      general: "En la red, sin vertical asignada",
    },
    blurbs: {
      marina: "El grupo lo describe como el primer hospital de tercer nivel de la Bahía de Banderas, abierto en 2000, con urgencias, terapia intensiva y hemodinamia. Ruta preferente de MedElite para ortopedia mayor.",
      riviera: "Abierto en 2011. El grupo lo presenta ligado al turismo médico de la zona. Ruta de ortopedia junto con Marina, Chapala y San Miguel.",
      guadalajara: "El grupo lo describe como hospital de tercer nivel, de más de 6,500 m². Ruta de bariátrica, junto con Querétaro.",
      sma: "Inaugurado en marzo de 2021, según la ficha del grupo. Ruta de ortopedia para quien inverna en San Miguel de Allende.",
      queretaro: "Abrió en 2022, según la ficha del grupo. Ruta de bariátrica, junto con Guadalajara.",
      cancun: "Inaugurado en diciembre de 2022, según la ficha del grupo. Ruta de cirugía plástica y oftalmología, junto con Playa del Carmen.",
      playa: "Sede en la Riviera Maya. Ruta de cirugía plástica y oftalmología. El teléfono publicado aquí es el de la página de contacto del grupo.",
      chapala: "En Ajijic, junto al lago de Chapala. Ruta de ortopedia para snowbirds de esa zona.",
      penita: "Sede costera en La Peñita de Jaltemba. Forma parte de las nueve sedes; en esta etapa no tiene una vertical asignada.",
    },
  },
  facts: {
    kicker: "Contexto",
    title: "Cifras públicas, con su fuente",
    deck: "No son resultados de MedElite ni tarifas de Hospitales Joya.",
    caption: "Cifras citadas en esta página",
    columns: ["Indicador", "Dato", "Fuente"],
    rows: [
      {
        ind: "Canadienses atendidos en el extranjero, 2025",
        fig: "105,529 (2.1 % de los procedimientos). El estudio advierte que puede ser una subestimación.",
        src: "Fraser Institute",
      },
      {
        ind: "Columbia Británica y Ontario",
        fig: "C.B.: 25,698 pacientes y 32.2 semanas de espera mediana. Ontario: 51,538 pacientes y 19.2 semanas. Canadá: 28.6 semanas.",
        src: "Fraser Institute, Waiting Your Turn 2025",
      },
      {
        ind: "Ortopedia en Canadá",
        fig: "48.6 semanas, la espera nacional más larga entre las especialidades quirúrgicas habituales que publica el estudio.",
        src: "Fraser Institute, 2025",
      },
      {
        ind: "Otro tramo en Columbia Británica",
        fig: "97,963 personas en lista quirúrgica y 6.0 semanas desde la programación hasta la cirugía, 2025–2026. No incluye la espera para ver al especialista.",
        src: "Ministerio de Salud de C.B., citado en esta página",
      },
      {
        ind: "Puente aéreo YVR–PVR",
        fig: "Unas 5 a 5 horas 10 minutos. En la semana del 16 al 22 de noviembre de 2026, Directflights.com reportaba unos 26 vuelos semanales sin escalas (WestJet, Air Canada, Flair).",
        src: "Directflights.com; SECTUR Jalisco sobre frecuencias de Air Canada",
      },
      {
        ind: "Canadienses a Jalisco, 2024",
        fig: "Más de 490 mil por avión; 24.5 % de los turistas extranjeros de Jalisco.",
        src: "SECTUR Jalisco, vía El Informador (junio 2025)",
      },
    ],
  },
  about: {
    kicker: "Nosotros",
    title: "Oficina en Vancouver, atención en México",
    lead: "Elegir atención médica es una decisión personal. MedElite existe para ordenar el camino entre Canadá y la red Joya: con claridad sobre el precio, el papel de cada quien y lo que esta página no puede prometer.",
    storyTitle: "Quién aparece en el sitio oficial",
    story: [
      "En medeliteofficial.com, Erika Cruz Joya figura como fundadora y directora ejecutiva. El texto dice que dirige la visión, las alianzas y la operación, y que tiene una relación cercana con la red de Hospitales Joya.",
      "En la misma página, la Dra. Ana Carolina Belloso aparece como representante médica oficial de Joya Hospitals en México: coordina a pacientes y prestadores y acompaña el itinerario clínico. No publicamos aquí un retrato suyo.",
    ],
    teamTitle: "Equipo publicado",
    erikaRole: "Fundadora y directora ejecutiva",
    erika:
      "Según la página About Us de medeliteofficial.com. No añadimos cargos, premios ni cifras de pacientes que esa página no publique.",
    erikaAlt: "Fotografía de Erika Cruz Joya, fundadora y directora ejecutiva, publicada con el equipo de MedElite.",
    anaName: "Dra. Ana Carolina Belloso",
    anaRole: "Representante médica oficial de Joya Hospitals en México",
    ana: "Cargo tomado de la página About Us de medeliteofficial.com. La valoración clínica de un caso la hace el cirujano tratante en México.",
  },
  faq: {
    kicker: "Preguntas",
    title: "Preguntas frecuentes",
    deck: "Respuestas alineadas con el papel de MedElite: coordinar, no tratar.",
    items: [
      {
        q: "¿Cubre esto el seguro canadiense?",
        a: "Los planes provinciales no suelen cubrir cirugías electivas fuera del país. Algunos seguros privados revisan ciertos procedimientos o gastos de viaje. Consúltelo con su aseguradora. MedElite no promete un reembolso.",
      },
      {
        q: "¿Es seguro volar después de la cirugía?",
        a: "El plan es que el cirujano valore la aptitud para volar antes de la salida. En cadera, rodilla y bariátrica la estancia prevista en México es de 7 a 10 días. La aerolínea puede exigir el certificado.",
      },
      {
        q: "¿Qué pasa al volver a Canadá?",
        a: "El diseño del recorrido incluye un resumen para su médico de familia y un canal de seguimiento con el equipo en México. El sistema público atiende urgencias vitales; un cirujano en Canadá puede negarse a manejar complicaciones menores de una cirugía hecha en el extranjero. Por eso la estancia y el informe importan.",
      },
      {
        q: "¿MedElite es el hospital?",
        a: "No. MedElite es la oficina de coordinación en Vancouver. Grupo Médico Joya es el socio hospitalario ancla. El acto médico es del hospital y del cirujano en México.",
      },
      {
        q: "¿La videollamada es una consulta médica en Canadá?",
        a: "No. Es una orientación informativa con el médico en México. No crea una práctica médica en Columbia Británica y no autoriza una prescripción para Canadá.",
      },
      {
        q: "¿Tienen JCI, CLACS, CSG, GHA o MTA?",
        a: "No lo afirmamos. Esas siglas no se presentan como acreditaciones obtenidas. GHA y MTA son estándares hacia los que MedElite trabaja.",
      },
      {
        q: "¿El rango del cuestionario es el precio?",
        a: "No. Es el rango publicado de rodilla, o un aviso de que el caso es a solicitud. La cotización escrita, después de la valoración del cirujano, es el único precio.",
      },
      {
        q: "¿Puedo deducir la cirugía en mis impuestos?",
        a: "Tal vez una parte médica, si cumple las reglas del crédito METC de la CRA. Hotel y logística normalmente no. Pídale la opinión a su contador. Esta página no es asesoría fiscal.",
      },
      {
        q: "¿Puede viajar un familiar?",
        a: "Sí. El nivel Executive está pensado con acompañante. El documento escrito dice qué incluye su estancia.",
      },
      {
        q: "¿En qué idioma se coordina?",
        a: "Esta página está en español, inglés y francés. El grupo describe atención en inglés y español en varias sedes. Si necesita francés en el hospital, lo pedimos al coordinar; no lo damos por garantizado en cada sede.",
      },
    ],
  },
  audio: {
    kicker: "Audio",
    title: "Una presentación breve",
    deck: "Voz generada por inteligencia artificial, con transcripción. No es la voz de una persona del equipo.",
    heading: "Qué es MedElite",
    body: "Locución en el idioma de esta página. Voz sintética.",
    transcript: "Transcripción",
    text: "MedElite International Health es un servicio canadiense de coordinación médica, con oficina en Vancouver. Conecta a pacientes de Canadá con la red aliada Hospitales Joya, en México. El cuestionario de esta página no es una valoración clínica. La decisión médica la toma el cirujano en México. Esta locución fue generada con inteligencia artificial.",
  },
  contact: {
    kicker: "Contacto",
    title: "Oficina de coordinación en Vancouver",
    deck: "Lunes a viernes, 9:00 a 17:00, hora de Vancouver. La meta publicada es responder en un día hábil. No envíe estudios, diagnósticos ni números de tarjeta por este medio.",
    email: "Correo",
    phone: "Teléfono",
    hours: "Horario",
    hoursValue: "Lun–vie, 9:00–17:00 (hora de Vancouver)",
    response: "info@medeliteofficial.com · +1 (604) 442-8475",
    city: "Vancouver, BC, Canadá. No publicamos dirección de calle.",
  },
  footer: {
    tag: "Coordinación de atención electiva entre Canadá y México.",
    about:
      "MedElite International Health es una empresa canadiense con oficina de coordinación en Vancouver. Hospital Joya es la red hospitalaria aliada. MedElite no habla en nombre del hospital.",
    fine: "Nada en esta página es una cotización, un diagnóstico ni una promesa de resultado. El acuerdo escrito, si usted sigue, reemplaza estos textos.",
    follow: "Redes",
    contact: "Contacto",
    legal: "Legal",
    copy: "© 2026 MedElite International Health.",
    pwa: "Puede instalar este sitio desde el navegador. Se actualiza solo cuando se publica una versión nueva.",
    photos: "Fotografías: Grupo Médico Joya, usadas con autorización.",
    official: "Sitio oficial",
  },
  sourcesTitle: "Fuentes",
  privacy: {
    kicker: "Aviso",
    title: "Aviso de privacidad",
    updated: "Versión del 14 de noviembre de 2026.",
    sections: [
      {
        heading: "Quién es responsable",
        paragraphs: [
          "MedElite International Health opera una oficina de coordinación en Vancouver, Columbia Británica, Canadá. Este sitio, medelite.com.mx, es el portal público de esa coordinación.",
          "Contacto de privacidad: info@medeliteofficial.com y +1 (604) 442-8475, de lunes a viernes de 9:00 a 17:00, hora de Vancouver.",
        ],
      },
      {
        heading: "Este sitio no guarda un expediente",
        paragraphs: [
          "No hay base de datos de pacientes en este sitio y no hay claves de API en el código. El cuestionario abre el programa de correo de su dispositivo, dirigido a info@medeliteofficial.com. Usted decide si envía el mensaje.",
        ],
      },
      {
        heading: "Qué puede escribir",
        paragraphs: [
          "Nombre, apellido, correo, teléfono, ciudad y provincia, procedimiento de interés, nivel de paquete, mes aproximado, si ya está en México, si viaja con acompañante, y datos administrativos de salud: rango de edad, rango de IMC y las condiciones que marque (diabetes, enfermedad cardiaca, anticoagulantes).",
          "Esos datos de salud son información personal sensible. No le pedimos estudios, imágenes ni números de tarjeta. Si los escribe, el formulario los rechaza cuando detecta un número de tarjeta.",
        ],
      },
      {
        heading: "Para qué",
        paragraphs: [
          "Para mostrarle un rango de planeación, cuando existe, y para que un coordinador en Vancouver pueda responder su solicitud. El rango no es una cotización ni una valoración médica.",
        ],
      },
      {
        heading: "Consentimiento y transferencia",
        paragraphs: [
          "La casilla del cuestionario es el consentimiento para usar esos datos en la solicitud y, si hace falta para coordinarla, compartirlos con el hospital y el cirujano en México que correspondan.",
          "En Canadá aplican la ley federal PIPEDA y, por la oficina en Columbia Británica, la Personal Information Protection Act (PIPA) de esa provincia. Si usted vive en otra provincia, también puede aplicar la ley local de privacidad, como la PHIPA en Ontario.",
          "En México, los datos personales sensibles se rigen por la LFPDPPP. Si llega a existir un expediente clínico, lo lleva el hospital conforme a la NOM-004-SSA3-2012. Este aviso no sustituye el aviso de privacidad del hospital.",
        ],
      },
      {
        heading: "Su navegador",
        paragraphs: [
          "Mientras la pestaña sigue abierta, el cuestionario puede guardar las respuestas en sessionStorage para no perderlas. Esa copia no sale de su dispositivo. El botón de borrar la elimina. El idioma elegido se guarda en localStorage y no incluye datos de salud.",
        ],
      },
      {
        heading: "Sus derechos",
        paragraphs: [
          "Puede pedir acceso, corrección o retirar el consentimiento escribiendo a info@medeliteofficial.com. Retirar el consentimiento frena usos futuros que dependan de él. No borra automáticamente un mensaje que usted ya envió, ni el expediente que el hospital ya tenga, salvo lo que la ley aplicable obligue.",
        ],
      },
      {
        heading: "Menores y seguridad",
        paragraphs: [
          "Este sitio no se dirige a menores de 18 años. El cuestionario pide confirmación de mayoría de edad.",
          "El sitio se sirve por HTTPS, con una política de seguridad de contenido que no permite scripts de terceros. Eso reduce el riesgo de que un script ajeno lea el formulario. No es una garantía absoluta.",
        ],
      },
    ],
  },
  terms: {
    kicker: "Términos",
    title: "Términos de uso",
    updated: "Versión del 14 de noviembre de 2026.",
    sections: [
      {
        heading: "MedElite coordina",
        paragraphs: [
          "MedElite International Health es un facilitador de coordinación entre pacientes de Canadá y hospitales en México. No es un hospital, no es un médico, no es una aseguradora y no es una agencia que venda el acto médico.",
          "Usar este sitio no crea una relación médico-paciente con MedElite. La responsabilidad clínica del procedimiento, si usted lo acepta, es del cirujano y del hospital en México.",
        ],
      },
      {
        heading: "Sesiones virtuales",
        paragraphs: [
          "Las videollamadas con médicos en México son orientaciones informativas y educativas. No son el ejercicio de la medicina en Columbia Británica ni en otra provincia de Canadá.",
          "El diagnóstico definitivo, la prescripción y la cirugía ocurren en territorio mexicano. Un médico mexicano no queda, por esta página, autorizado a practicar medicina en Canadá.",
          "El personal de Vancouver actúa como coordinador de navegación del paciente: recoge el cuestionario y organiza la logística. No hace triaje clínico ni da consejo médico.",
        ],
      },
      {
        heading: "Estimaciones",
        paragraphs: [
          "Los rangos en dólares canadienses son el plan publicado de un reemplazo total de rodilla (Snowbird, Essential y Executive). Están sujetos a valoración médica. No son una oferta, no reservan un quirófano y no garantizan que usted sea candidato.",
          "Si el procedimiento no tiene banda publicada, el cuestionario lo marca como a solicitud. La cotización escrita posterior sustituye cualquier cifra de esta página.",
        ],
      },
      {
        heading: "Acreditaciones",
        paragraphs: [
          "MedElite no declara obtenidas las acreditaciones JCI, CLACS, CSG, GHA ni MTA, ni las declara obtenidas para Grupo Médico Joya.",
          "GHA (Global Healthcare Accreditation) y MTA (Medical Tourism Association) se mencionan solo como estándares hacia los que la empresa trabaja.",
        ],
      },
      {
        heading: "Pagos, viaje y seguro",
        paragraphs: [
          "Este sitio no procesa pagos. El modelo previsto —anticipo del 30 % y saldo por transferencia— solo obliga si un acuerdo escrito lo dice.",
          "La estancia de 7 a 10 días y el certificado de aptitud para volar son parte del diseño del recorrido para cadera, rodilla y bariátrica. El cirujano puede alargar la estancia o desaconsejar el vuelo.",
          "Un seguro de complicaciones forma parte del diseño del paquete y no se considera vigente hasta que la cotización nombre la póliza y confirme el registro del cirujano y del hospital.",
        ],
      },
      {
        heading: "Impuestos y urgencias",
        paragraphs: [
          "Los textos sobre el crédito METC de la CRA son informativos. No son asesoría fiscal. Consulte a un contador.",
          "Si tiene una urgencia, contacte los servicios de emergencia locales. No use este sitio para eso.",
        ],
      },
      {
        heading: "El acuerdo escrito manda",
        paragraphs: [
          "Si usted continúa, el contrato de coordinación es un documento aparte. Ese documento, y no esta página, fija precio, inclusiones, cancelación y ley aplicable.",
          "La oficina de coordinación está en Vancouver. Esta nota se publica desde ahí.",
        ],
      },
    ],
  },
  notFound: {
    title: "Esta página no está",
    body: "El enlace no corresponde a una sección de este sitio.",
    home: "Volver al inicio",
  },
};
