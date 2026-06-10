import Col1 from '@/assets/collection/collection-1.jpg'
import Col2 from '@/assets/collection/collection-2.jpg'
import Col3 from '@/assets/collection/collection-3.jpg'
import Col4 from '@/assets/collection/collection-4.jpg'
import Col5 from '@/assets/collection/collection-5.jpg'

export const collections = [
  {
    id: '1',
    title: 'ВІЧНИЙ СИЛУЕТ',
    content: [
      `Класика — це не стиль, це рішення. Колекція «Вічний силует» — прикраси у білому та рожевому золоті, що не прив'язані до сезону, настрою чи тренду.`,
      `Кожен виріб відлитий вручну. Матова поверхня та полірування рантів — деталь, яку помічаєш не відразу, але відчуваєш завжди.`,
    ],
    images: [
      '/products/rings/001/white/1.webp',
      '/products/necklaces/001/white/1.webp',
      '/products/earrings/005/white/1.webp',
    ],
    heroImage: Col1,
    detailInfo: `Колекція «Вічний силует» — це дослідження форми, що існує поза часом. Жодного зайвого елемента. Кожна лінія виправдана, кожен об'єм — навмисний.

Золото 585° та срібло 925°, відлиті вручну у київській майстерні WAY. Матова поверхня контрастує з поліруванням рантів — деталь, яку помічаєш не відразу, але відчуваєш завжди.

В основі колекції — каблучки з мінімальним профілем у білому золоті, кольє на тонкому ланцюжку, сережки без зайвих деталей. Кожен виріб носять окремо або в парі — вони не конкурують між собою, а лише підсилюють.

Усі вироби виготовлені в Україні та доступні для замовлення. Розмірна сітка — стандартна, підгонка під замовлення — можлива.

«Вічний силует» не про тренди. Це про рішення, яке залишається правильним через десять років.`,
    gallery: [
      {
        id: '1',
        img: '/products/rings/001/white/1.webp',
        alt: 'WAY — каблучка біле золото',
        productId: 'ring-001',
        productCategory: 'rings',
      },
      {
        id: '2',
        img: '/products/necklaces/001/white/1.webp',
        alt: 'WAY — намисто біле золото',
        productId: 'necklace-001',
        productCategory: 'necklaces',
      },
      {
        id: '3',
        img: '/products/earrings/005/white/1.webp',
        alt: 'WAY — сережки біле золото',
        productId: 'earring-005',
        productCategory: 'earrings',
      },
      {
        id: '4',
        img: '/products/rings/002/white/1.webp',
        alt: 'WAY — каблучка класика',
        productId: 'ring-002',
        productCategory: 'rings',
      },
      {
        id: '5',
        img: '/products/bracelets/005/white/1.webp',
        alt: 'WAY — браслет біле золото',
        productId: 'bracelet-005',
        productCategory: 'bracelets',
      },
    ],
    productIds: ['ring-001', 'ring-002', 'necklace-001', 'earring-005', 'bracelet-005'],
  },
  {
    id: '2',
    title: 'АРХІВ ТЕПЛИХ ДНІВ',
    content: [
      `Жовте та рожеве золото, цитрин, топаз. Ця колекція — про відчуття літнього ранку, що залишається з тобою цілий рік.`,
      `Легкі форми, тонкі ланцюжки, каблучки на фалангу. Прикраси, що носять не заради виходу, а тому що так просто добре.`,
    ],
    images: ['/products/rings/004/rose/1.webp', '/products/earrings/001/yellow/1.webp'],
    heroImage: Col3,
    detailInfo: `«Архів теплих днів» — колекція, яку ми починали писати в липні. Світло лягало якось особливо, і хотілося зафіксувати не образ, а відчуття. Так народилася ідея: прикраса як закладка в особистому архіві.

Жовте та рожеве золото 585°. Тонкі підвіски з топазом, ніжні кільця на фалангу, тонкі ланцюжки-венеціан. Нічого зайвого — лише вага металу та тепло каменю.

Каблучки у рожевому золоті — для тих, хто носить щодня. Сережки у жовтому золоті — легкі, непомітні для всіх, крім тих, хто поруч. Кольє та браслети — тонкі деталі, що завершують образ.

Колекція виготовлена обмеженим тиражем. Деякі позиції — у єдиному примірнику.

Усі вироби — ручна робота у київській майстерні WAY.`,
    gallery: [
      {
        id: '1',
        img: '/products/rings/004/rose/1.webp',
        alt: 'WAY — каблучка рожеве золото',
        productId: 'ring-004',
        productCategory: 'rings',
      },
      {
        id: '2',
        img: '/products/earrings/001/yellow/1.webp',
        alt: 'WAY — сережки жовте золото',
        productId: 'earring-001',
        productCategory: 'earrings',
      },
      {
        id: '3',
        img: '/products/necklaces/004/yellow/1.webp',
        alt: 'WAY — намисто жовте золото',
        productId: 'necklace-004',
        productCategory: 'necklaces',
      },
      {
        id: '4',
        img: '/products/bracelets/002/yellow/1.webp',
        alt: 'WAY — браслет золото',
        productId: 'bracelet-002',
        productCategory: 'bracelets',
      },
      {
        id: '5',
        img: '/products/rings/016/rose/1.webp',
        alt: 'WAY — каблучка рожеве золото',
        productId: 'ring-016',
        productCategory: 'rings',
      },
    ],
    productIds: ['ring-004', 'ring-016', 'necklace-004', 'bracelet-002', 'earring-001'],
  },
  {
    id: '3',
    title: 'ХОЛОДНА ПОЕЗІЯ',
    content: [
      `Срібло 925°, платина та біле золото. Ця колекція — про структуру, глибину та форму, яка говорить без зайвих слів.`,
      `Сапфіри, аквамарини, геометрія. Осінь і зима як причина носити те, що дійсно важить.`,
    ],
    images: [
      '/products/rings/001/white/1.webp',
      '/products/bracelets/003/white/1.webp',
      '/products/earrings/001/white/1.webp',
    ],
    heroImage: Col2,
    detailInfo: `«Холодна поезія» — це про колір металу в листопадовому світлі. Біле золото та платина набувають іншої глибини, коли день короткий, а повітря різке.

Колекція побудована навколо геометричної форми: каблучки з від'ємним об'ємом, браслети з рельєфом, сережки-крапля з аквамарином. Кожен виріб важить більше, ніж здається.

Срібло 925° та біле золото 585° — матеріали, що зберігають форму десятиліттями. Усі камені — натуральні. Оправа — вручну у київській майстерні WAY.

Деталі та структура важливіші за об'єм. Саме тому кожна прикраса в колекції несе в собі архітектурну логіку — нічого випадкового.

Тираж — обмежений. Замовлення приймаємо до вичерпання кількості.`,
    gallery: [
      {
        id: '1',
        img: '/products/rings/001/white/1.webp',
        alt: 'WAY — каблучка біле золото',
        productId: 'ring-001',
        productCategory: 'rings',
      },
      {
        id: '2',
        img: '/products/bracelets/003/white/1.webp',
        alt: 'WAY — браслет срібло',
        productId: 'bracelet-003',
        productCategory: 'bracelets',
      },
      {
        id: '3',
        img: '/products/earrings/001/white/1.webp',
        alt: 'WAY — сережки біле золото',
        productId: 'earring-001',
        productCategory: 'earrings',
      },
      {
        id: '4',
        img: '/products/necklaces/003/white/1.webp',
        alt: 'WAY — кольє срібло',
        productId: 'necklace-003',
        productCategory: 'necklaces',
      },
      {
        id: '5',
        img: '/products/bracelets/004/white/1.webp',
        alt: 'WAY — браслет біле золото',
        productId: 'bracelet-004',
        productCategory: 'bracelets',
      },
    ],
    productIds: ['ring-001', 'bracelet-003', 'bracelet-004', 'earring-001', 'necklace-003'],
  },
  {
    id: '4',
    title: 'РАНОК У КИЄВІ',
    content: [
      `Підвіски, ланцюжки, тонкі каблучки. Колекція для тих, хто носить прикраси щодня — не заради виходу, а тому що так правильно.`,
      `Мінімальна форма, максимальна присутність. Капсула, яку складаєш одного разу і більше не думаєш.`,
    ],
    images: ['/products/pendants/001/yellow/1.webp', '/products/chains/001/yellow/1.webp'],
    heroImage: Col4,
    detailInfo: `«Ранок у Києві» — це капсула щоденного носіння. Не для особливих подій. Для кави о восьмій, для метро, для зустрічей без приводу.

Підвіски у жовтому та білому золоті — маленькі і непомітні для всіх, крім тих, хто знає, що шукати. Ланцюжки-венеціан та якірне плетіння. Тонкі каблучки, що не заважають.

Жовте золото 585° — матеріал, що зберігає тепло і колір роками. Ланцюжки та підвіски спроектовані так, щоб носитися разом або окремо — без конфлікту пропорцій.

Капсула складається раз і більше не переглядається. Підвіска + ланцюжок + тонка каблучка — базовий набір, який працює щодня.

Усі вироби виготовлені в Україні. Доступні для щоденного носіння. Перевірені часом.`,
    gallery: [
      {
        id: '1',
        img: '/products/pendants/001/yellow/1.webp',
        alt: 'WAY — підвіска жовте золото',
        productId: 'pendant-001',
        productCategory: 'pendants',
      },
      {
        id: '2',
        img: '/products/chains/001/yellow/1.webp',
        alt: 'WAY — ланцюжок жовте золото',
        productId: 'chain-001',
        productCategory: 'chains',
      },
      {
        id: '3',
        img: '/products/pendants/002/yellow/1.webp',
        alt: 'WAY — підвіска мінімалізм',
        productId: 'pendant-002',
        productCategory: 'pendants',
      },
      {
        id: '4',
        img: '/products/chains/003/yellow/1.webp',
        alt: 'WAY — ланцюжок золото',
        productId: 'chain-003',
        productCategory: 'chains',
      },
      {
        id: '5',
        img: '/products/pendants/006/yellow/1.webp',
        alt: 'WAY — підвіска золото',
        productId: 'pendant-006',
        productCategory: 'pendants',
      },
    ],
    productIds: ['pendant-001', 'pendant-002', 'pendant-006', 'chain-001', 'chain-003'],
  },
  {
    id: '5',
    title: 'ВЕЧІР БЕЗ ПОСПІХУ',
    content: [
      `Годинники, запонки, сережки-стейтмент. Колекція для вечорів, заради яких варто одягтися.`,
      `Нічого не говорить про людину так чітко, як вибір деталі. Ця колекція — про деталі, що запам'ятовуються.`,
    ],
    images: [
      '/products/watches/001/white/1.webp',
      '/products/cufflinks/001/yellow/1.webp',
      '/products/earrings/010/rose/1.webp',
    ],
    heroImage: Col5,
    detailInfo: `«Вечір без поспіху» — колекція, яка починається там, де закінчується робочий день. Годинники з мінімальним циферблатом, запонки у білому та жовтому золоті, масивні сережки, що говорять самі.

Золото 585°, сталь 316L. Годинникові механізми — швейцарські. Запонки — ручна полірування. Сережки — з натуральними каменями у класичній оправі.

Годинник WAY — не просто аксесуар, а заява про те, як людина ставиться до власного часу. Мінімальний циферблат, сапфірове скло, ремінець із нубуку або металевий браслет.

Запонки у жовтому та білому золоті — для чоловіків, що знають ціну деталі. Сережки-стейтмент у рожевому золоті — для вечорів, які запам'ятовуються.

Виручений результат: образ, який не треба пояснювати.`,
    gallery: [
      {
        id: '1',
        img: '/products/watches/001/white/1.webp',
        alt: 'WAY — годинник біле золото',
        productId: 'watch-001',
        productCategory: 'watches',
      },
      {
        id: '2',
        img: '/products/cufflinks/001/yellow/1.webp',
        alt: 'WAY — запонки жовте золото',
        productId: 'cufflink-001',
        productCategory: 'cufflinks',
      },
      {
        id: '3',
        img: '/products/earrings/010/rose/1.webp',
        alt: 'WAY — сережки рожеве золото',
        productId: 'earring-010',
        productCategory: 'earrings',
      },
      {
        id: '4',
        img: '/products/watches/003/white/1.webp',
        alt: 'WAY — годинник класика',
        productId: 'watch-003',
        productCategory: 'watches',
      },
      {
        id: '5',
        img: '/products/cufflinks/003/white/1.webp',
        alt: 'WAY — запонки біле золото',
        productId: 'cufflink-003',
        productCategory: 'cufflinks',
      },
    ],
    productIds: ['watch-001', 'watch-003', 'earring-010', 'cufflink-001', 'cufflink-003'],
  },
]
