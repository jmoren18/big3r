// Glossari per a l'ajuda de traducció. El web és sempre en català: quan
// l'alumne tria un idioma, aquestes paraules queden subratllades i en
// tocar-les es veu la traducció.
//
// `formes` són totes les maneres com la paraula pot aparèixer al text.
// Idiomes: es castellà, uk ucraïnès, ru rus, ar àrab, ur urdú, hi hindi, pa panjabi.
// Les traduccions no les ha revisat cap parlant nadiu: cal validar-les.
export const GLOSSARI = [
  { formes: ['cèl·lula', 'cèl·lules'], es: 'célula', uk: 'клітина', ru: 'клетка', ar: 'خلية', ur: 'خلیہ', hi: 'कोशिका', pa: 'ਸੈੱਲ' },
  { formes: ['teixit', 'teixits'], es: 'tejido', uk: 'тканина', ru: 'ткань', ar: 'نسيج', ur: 'بافت', hi: 'ऊतक', pa: 'ਟਿਸ਼ੂ' },
  { formes: ['òrgan', 'òrgans'], es: 'órgano', uk: 'орган', ru: 'орган', ar: 'عضو', ur: 'عضو', hi: 'अंग', pa: 'ਅੰਗ' },
  { formes: ['ésser viu', 'éssers vius'], es: 'ser vivo', uk: 'жива істота', ru: 'живое существо', ar: 'كائن حي', ur: 'جاندار', hi: 'सजीव', pa: 'ਸਜੀਵ' },
  { formes: ['mucosa bucal'], es: 'mucosa bucal', uk: 'слизова оболонка рота', ru: 'слизистая оболочка рта', ar: 'الغشاء المخاطي للفم', ur: 'منہ کی اندرونی جھلی', hi: 'मुँह की भीतरी झिल्ली', pa: 'ਮੂੰਹ ਦੀ ਅੰਦਰਲੀ ਝਿੱਲੀ' },
  { formes: ['microscopi', 'microscopis'], es: 'microscopio', uk: 'мікроскоп', ru: 'микроскоп', ar: 'مجهر', ur: 'خوردبین', hi: 'सूक्ष्मदर्शी', pa: 'ਖੁਰਦਬੀਨ' },
  { formes: ['laboratori'], es: 'laboratorio', uk: 'лабораторія', ru: 'лаборатория', ar: 'مختبر', ur: 'تجربہ گاہ', hi: 'प्रयोगशाला', pa: 'ਪ੍ਰਯੋਗਸ਼ਾਲਾ' },
  { formes: ['fitxa', 'fitxes'], es: 'ficha', uk: 'робочий аркуш', ru: 'рабочий лист', ar: 'ورقة عمل', ur: 'ورک شیٹ', hi: 'वर्कशीट', pa: 'ਵਰਕਸ਼ੀਟ' },
  { formes: ['dibuix', 'dibuixos'], es: 'dibujo', uk: 'малюнок', ru: 'рисунок', ar: 'رسم', ur: 'ڈرائنگ', hi: 'चित्र', pa: 'ਚਿੱਤਰ' },
  { formes: ['preguntes curtes'], es: 'preguntas cortas', uk: 'короткі запитання', ru: 'короткие вопросы', ar: 'أسئلة قصيرة', ur: 'مختصر سوالات', hi: 'छोटे प्रश्न', pa: 'ਛੋਟੇ ਸਵਾਲ' },
  { formes: ['exit tiquet'], es: 'ticket de salida', uk: 'підсумкове запитання', ru: 'итоговый вопрос', ar: 'سؤال الختام', ur: 'آخری سوال', hi: 'अंतिम प्रश्न', pa: 'ਆਖਰੀ ਸਵਾਲ' },
  { formes: ['feina a casa'], es: 'deberes', uk: 'домашнє завдання', ru: 'домашнее задание', ar: 'واجب منزلي', ur: 'گھر کا کام', hi: 'गृहकार्य', pa: 'ਘਰ ਦਾ ਕੰਮ' },
  { formes: ['autoavaluació'], es: 'autoevaluación', uk: 'самооцінювання', ru: 'самооценка', ar: 'تقييم ذاتي', ur: 'خود جائزہ', hi: 'स्व-मूल्यांकन', pa: 'ਸਵੈ-ਮੁਲਾਂਕਣ' },
  { formes: ['sessió', 'sessions'], es: 'sesión', uk: 'урок', ru: 'урок', ar: 'حصة', ur: 'سبق', hi: 'पाठ', pa: 'ਪਾਠ' },
  { formes: ['votació'], es: 'votación', uk: 'голосування', ru: 'голосование', ar: 'تصويت', ur: 'ووٹنگ', hi: 'मतदान', pa: 'ਵੋਟਿੰਗ' },
  { formes: ['exercicis'], es: 'ejercicios', uk: 'вправи', ru: 'упражнения', ar: 'تمارين', ur: 'مشقیں', hi: 'अभ्यास', pa: 'ਅਭਿਆਸ' },
  { formes: ['materials'], es: 'materiales', uk: 'матеріали', ru: 'материалы', ar: 'مواد', ur: 'مواد', hi: 'सामग्री', pa: 'ਸਮੱਗਰੀ' },
  { formes: ['aula'], es: 'aula', uk: 'клас', ru: 'класс', ar: 'قاعة الدرس', ur: 'کلاس روم', hi: 'कक्षा', pa: 'ਕਲਾਸਰੂਮ' },
  { formes: ['nivell', 'nivells'], es: 'nivel', uk: 'рівень', ru: 'уровень', ar: 'مستوى', ur: 'سطح', hi: 'स्तर', pa: 'ਪੱਧਰ' },
  { formes: ['matèria inerta'], es: 'materia inerte', uk: 'нежива речовина', ru: 'неживое вещество', ar: 'مادة غير حية', ur: 'بے جان مادہ', hi: 'निर्जीव पदार्थ', pa: 'ਨਿਰਜੀਵ ਪਦਾਰਥ' },
  { formes: ['matèria'], es: 'materia', uk: 'речовина', ru: 'вещество', ar: 'مادة', ur: 'مادہ', hi: 'पदार्थ', pa: 'ਪਦਾਰਥ' },
  { formes: ['àtom', 'àtoms'], es: 'átomo', uk: 'атом', ru: 'атом', ar: 'ذرة', ur: 'ایٹم', hi: 'परमाणु', pa: 'ਪਰਮਾਣੂ' },
  { formes: ['molècula', 'molècules'], es: 'molécula', uk: 'молекула', ru: 'молекула', ar: 'جزيء', ur: 'مالیکیول', hi: 'अणु', pa: 'ਅਣੂ' },
  { formes: ['organisme', 'organismes'], es: 'organismo', uk: 'організм', ru: 'организм', ar: 'كائن حي', ur: 'جاندار', hi: 'जीव', pa: 'ਜੀਵ' },
  { formes: ['aparell', 'aparells'], es: 'aparato', uk: 'система органів', ru: 'система органов', ar: 'جهاز', ur: 'نظام', hi: 'तंत्र', pa: 'ਪ੍ਰਣਾਲੀ' },
  { formes: ['sistema', 'sistemes'], es: 'sistema', uk: 'система', ru: 'система', ar: 'جهاز', ur: 'نظام', hi: 'तंत्र', pa: 'ਪ੍ਰਣਾਲੀ' },
  { formes: ['població', 'poblacions'], es: 'población', uk: 'популяція', ru: 'популяция', ar: 'جماعة أحيائية', ur: 'آبادی', hi: 'समष्टि', pa: 'ਆਬਾਦੀ' },
  { formes: ['comunitat'], es: 'comunidad', uk: 'угруповання', ru: 'сообщество', ar: 'مجتمع أحيائي', ur: 'حیاتیاتی برادری', hi: 'समुदाय', pa: 'ਭਾਈਚਾਰਾ' },
  { formes: ['ecosistema', 'ecosistemes'], es: 'ecosistema', uk: 'екосистема', ru: 'экосистема', ar: 'نظام بيئي', ur: 'ماحولیاتی نظام', hi: 'पारिस्थितिकी तंत्र', pa: 'ਈਕੋਸਿਸਟਮ' },
  { formes: ['biosfera'], es: 'biosfera', uk: 'біосфера', ru: 'биосфера', ar: 'المحيط الحيوي', ur: 'حیاتی کرہ', hi: 'जैवमंडल', pa: 'ਜੀਵ-ਮੰਡਲ' },
  { formes: ['llibreta'], es: 'cuaderno', uk: 'зошит', ru: 'тетрадь', ar: 'دفتر', ur: 'کاپی', hi: 'कॉपी', pa: 'ਕਾਪੀ' },
  { formes: ['estoig'], es: 'estuche', uk: 'пенал', ru: 'пенал', ar: 'مقلمة', ur: 'پنسل بکس', hi: 'पेंसिल बॉक्स', pa: 'ਪੈਨਸਿਲ ਬਾਕਸ' },
  { formes: ['avaluació'], es: 'evaluación', uk: 'оцінювання', ru: 'оценивание', ar: 'تقييم', ur: 'جائزہ', hi: 'मूल्यांकन', pa: 'ਮੁਲਾਂਕਣ' },
  { formes: ['trimestre'], es: 'trimestre', uk: 'триместр', ru: 'триместр', ar: 'فصل دراسي', ur: 'سہ ماہی', hi: 'तिमाही', pa: 'ਤਿਮਾਹੀ' },
  { formes: ['espècie', 'espècies'], es: 'especie', uk: 'вид', ru: 'вид', ar: 'نوع', ur: 'نوع', hi: 'प्रजाति', pa: 'ਪ੍ਰਜਾਤੀ' }
]
