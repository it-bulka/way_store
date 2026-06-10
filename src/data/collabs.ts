import Collab1 from '@/assets/collaborations/collab_1.jpg'
import Collab2 from '@/assets/collaborations/collab_2.jpg'
import Collab3 from '@/assets/collaborations/collab_3.jpg'
import Collab4 from '@/assets/collaborations/collab_4.jpg'
import CollabHero2 from '@/assets/collaboration/collab-1.jpg'
import CollabHero3 from '@/assets/collaboration/collab-3.jpg'
import CollabHero4 from '@/assets/collaboration/collab-5.jpg'

const CDN = 'https://images.unsplash.com/photo'
const q = '?auto=format&fit=crop&w=1200&q=85'

export const collabs = [
  {
    id: '1',
    src: Collab1,
    title: 'way x gena gorin',
    content: [
      `Геня Горін — київський стиліст і дизайнер, чия естетика побудована на чистоті силуету та відмові від надмірного. Саме ця спільна мова зробила колаборацію неминучою.`,
      `Разом ми створили капсулу прикрас, де кожен виріб виступає не акцентом — а підписом. Мінімальна форма, максимальна присутність.`,
    ],
    heroImage: `${CDN}-1509631179647-0177331693ae${q}`,
    detailInfo: `Геня Горін будує образи так само, як архітектор закриває простір — через відсутність зайвого. Кожен сезон він доводить: найсильніший жест — це жест, якого не видно.

WAY зустрів його в точці, де форма перестає декларувати і починає мовчати. Капсула «way x gena gorin» — шість виробів із жовтого золота та срібла, у яких немає нічого випадкового. Без гравюр. Без знаків. Лише вагомість, яка говорить сама.

Фотографував Антон Ковалів. Стилінг — Геня Горін. Волосся та макіяж — Поліна Дейнека. Зйомка — Київ, серпень.`,
    gallery: [
      { id: '1', img: `${CDN}-1490481651871-ab68de25d43d${q}`, alt: 'way x gena gorin editorial' },
      { id: '2', img: `${CDN}-1483985988355-763728e1935b${q}`, alt: 'way x gena gorin fashion' },
      { id: '3', img: `${CDN}-1535556116002-6281ff3e9f36${q}`, alt: 'way x gena gorin jewelry' },
      { id: '4', img: `${CDN}-1515886657613-9f3515b0c78f${q}`, alt: 'way x gena gorin minimal' },
      { id: '5', img: `${CDN}-1617038260897-41a1f14a8ca0${q}`, alt: 'way x gena gorin ring' },
    ],
  },
  {
    id: '2',
    src: Collab2,
    title: 'way x bevza',
    content: [
      `Bevza будує одяг за принципом структури. WAY будує прикраси за тим самим принципом. Коли два мовчазні архітектори зустрічаються, надлишку не виникає.`,
      `Капсула спроектована для тіла в русі. Кожен виріб залишається собою незалежно від того, що поруч. Золото. Лаконічність. Достатність.`,
    ],
    heroImage: CollabHero2,
    detailInfo: `Про Bevza говорять: він шиє архітектуру. Ми давно знаємо, що архітектуру також можна носити на пальці або на шиї. Ця колаборація — про мову, яку обоє знають без перекладача.

Капсула «way x bevza» складається з чотирнадцяти предметів: каблучки у білому та жовтому золоті, сережки-краплі, мінімальні підвіски на ланцюжку. Жодних каменів. Лише форма та вага металу — достатньо.

Кожен виріб стилізований безпосередньо під показ сезону. Частина тиражу надійшла у продаж після демонстрації — без жодного анонсу. За три дні нічого не залишилося.`,
    gallery: [
      { id: '1', img: '/products/rings/001/white/1.webp', alt: 'way x bevza ring white gold' },
      { id: '2', img: '/products/earrings/001/rose/1.webp', alt: 'way x bevza earrings rose gold' },
      { id: '3', img: '/products/necklaces/001/white/1.webp', alt: 'way x bevza necklace' },
      { id: '4', img: '/products/rings/004/rose/1.webp', alt: 'way x bevza ring rose gold' },
      { id: '5', img: '/products/earrings/002/white/1.webp', alt: 'way x bevza earrings minimal' },
    ],
  },
  {
    id: '3',
    src: Collab3,
    title: 'way x kachorovska',
    content: [
      `Kachorovska знає, що аксесуар — це не доповнення. Це твердження. WAY поділяє цю позицію: зап'ястя, яке несе годинник або браслет, говорить окремо від усього іншого образу.`,
      `Спільна лінія об'єднала дві київські марки, що давно рухаються паралельно. Ланцюжки, браслети, годинники — зроблено для людей, які знають різницю.`,
    ],
    heroImage: CollabHero3,
    detailInfo: `Kachorovska починала з взуття — і зробила його твердженням про те, як ходить упевнена людина. WAY починав із каблучки — і зробив її твердженням про те, як виглядає вибір. Зустріч була неминуча.

Капсула «way x kachorovska» сфокусована на зап'ясті: масивні браслети зі срібла та жовтого золота, стальні та золоті годинники з мінімальним циферблатом, ланцюжки з якірним та венеціанським плетінням. Ніяких підвісок. Ніяких каменів. Лише лінія та вага.

Усі вироби виготовлені в Україні. Частина колекції доступна виключно в точках продажу Kachorovska — онлайн та у шоурумі на Подолі.`,
    gallery: [
      { id: '1', img: '/products/bracelets/001/yellow/1.webp', alt: 'way x kachorovska bracelet' },
      { id: '2', img: '/products/watches/001/white/1.webp', alt: 'way x kachorovska watch' },
      { id: '3', img: '/products/chains/001/yellow/1.webp', alt: 'way x kachorovska chain' },
      {
        id: '4',
        img: '/products/bracelets/002/yellow/1.webp',
        alt: 'way x kachorovska bracelet gold',
      },
      { id: '5', img: '/products/watches/002/white/1.webp', alt: 'way x kachorovska watch white' },
    ],
  },
  {
    id: '4',
    src: Collab4,
    title: 'way x serhii makhno',
    content: [
      `Сергій Махно працює з глиною та простором. WAY — з металом та формою. Обидва досліджують одне: як зробити об'єкт, що живе довше за тренд.`,
      `Капсула народилася з розмови про орнамент. Що залишається від архаїчного знаку, коли він потрапляє у сучасний метал? Відповідь — у кожному виробі окремо.`,
    ],
    heroImage: CollabHero4,
    detailInfo: `Сергій Махно відомий тим, що повертає українській архаїці гідність без музейного пилу. Його меблі та кераміка живуть у сучасних інтер'єрах — не як цитата, а як власна мова. WAY захотів дізнатися, що відбувається, коли ця мова стає малою.

Капсула «way x serhii makhno» — дванадцять ювелірних об'єктів: підвіски з орнаментальними насічками, каблучки з архаїчними рельєфами, кольє-ланцюжки з авторськими ланками. Усе — срібло та жовте золото. Усе — ручна гравюра.

Частину накладів виставлено у київській галереї Mahno Studio. Решта — у WAY. Тираж кожного виробу — 30 примірників.`,
    gallery: [
      { id: '1', img: '/products/pendants/001/yellow/1.webp', alt: 'way x serhii makhno pendant' },
      { id: '2', img: '/products/necklaces/005/white/1.webp', alt: 'way x serhii makhno necklace' },
      { id: '3', img: '/products/rings/016/white/1.webp', alt: 'way x serhii makhno ring' },
      {
        id: '4',
        img: '/products/pendants/002/white/1.webp',
        alt: 'way x serhii makhno pendant white',
      },
      {
        id: '5',
        img: '/products/necklaces/003/white/1.webp',
        alt: 'way x serhii makhno necklace white',
      },
    ],
  },
]
