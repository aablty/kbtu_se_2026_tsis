# Content Inventory, Privacy & Ethics Review — Personal Website (TSIS #01, Task #02)

Status: Iteration 1. Source content gathered directly from the author (chat, 2026-11-24) and `cv.pdf`
(peeked for a short, detail-free summary only, per author's instruction).

## 1. Content inventory (kk / ru / en)

English, Kazakh, and Russian copy below is the author's own text/translation for every section.
Any item still marked "TODO"/"Pending" elsewhere in this document (font family, stock images) is not
yet ready in any language and will be filled in before implementation.

| Item | English | Kazakh | Russian | Classification | Notes |
|------|-----------|-----------|-----------|-----------------|-------|
| Name | Nursultan Nurgali | Нұрсұлтан Нұрғали | Нурсултан Нургали | Public | First + last name only, no patronymic/ID |
| University & major | Kazakh-British Technical University, B.Sc. Information Systems, 2024–2028 | 	Қазақ-Британ техникалық университеті, «Ақпараттық жүйелер» мамандығы бойынша бакалавриат, 2024–2028 | 	Казахско-Британский технический университет, бакалавриат по специальности «Информационные системы», 2024–2028 | Public | |
| Previous school | Graduated regular secondary school in 2024 with the 'Altyn Belgi' gold medal | 	2024 жылы жалпы орта білім беретін мектепті «Алтын белгімен» бітірген | 	Окончил общеобразовательную среднюю школу в 2024 году с золотой медалью «Алтын Белгі» | Public (no school name) | School name/city omitted at author's choice |
| Interests | Computer games, software engineering, system design, building small everyday apps | Компьютерлік ойындар, бағдарламалық жасақтама әзірлеу, жүйелерді жобалау, күнделікті өмірге арналған шағын қосымшалар жасау | Компьютерные игры, разработка программного обеспечения, проектирование систем, создание небольших повседневных приложений | Public | |
| Achievements | 'Altyn Belgi' gold medal (2024) | 	«Алтын белгі» (2024) | Золотая медаль «Алтын Белгі» (2024) | Public | Author chose to skip any further achievements list |
| Completed subjects | Algorithms & Data Structures, Computer Architecture, Databases, IT Infrastructure & Computer Networks, OOP & Design, System Design, Web Development | 	Алгоритмдер және деректер құрылымы, компьютер архитектурасы, деректер базасы, IT-инфрақұрылым және компьютерлік желілер, объектіге бағытталған бағдарламалау және жобалау, жүйелік жобалау, веб-әзірлеу | Алгоритмы и структуры данных, архитектура компьютеров, базы данных, ИТ-инфраструктура и компьютерные сети, объектно-ориентированное программирование и проектирование, системное проектирование, веб-разработка | Public | |
| Activities | Software development, gym, gaming, personal projects | Бағдарламалық жасақтама әзірлеу, спортзалға бару, ойын ойнау, жеке жобалар |	Разработка программного обеспечения, тренажёрный зал, игры, личные проекты | Public | Kept generic, no employer/client names |
| Future plans | Already has professional software engineering experience; currently interviewing for full-time roles | 	Бағдарламалық жасақтама әзірлеу саласында кәсіби тәжірибесі бар; қазіргі уақытта толық жұмыс күніне арналған қызметтер бойынша сұхбаттасудан өтіп жүр | 	Уже имеет профессиональный опыт в разработке программного обеспечения; в настоящее время проходит собеседования на позиции с полной занятостью | Public | Deliberately detail-free per author's instruction — no employer names, dates, or phone number from CV |
| Portrait photo | Ready (file in hand) |	Ready (file in hand) |	Ready (file in hand) | Public | See §2 |
| Certificates | - | — | — | — | Author chose to skip certificate scans entirely for this iteration |
| Contact section | Ready | Ready | Ready | Public |see §4 |

## 2. Asset source & ownership register

| Asset | Source / Owner | License / Permission | Status |
|-------|-----------------|------------------------|--------|
| Portrait photo | Taken by / of the author (self) | Owned by author — no third-party rights involved | Ready, kept out of the repo for now (author's choice) — to be added at implementation time |
| Icon set | [Lucide](https://lucide.dev) icon library | ISC license (free, attribution not required but will be credited in footer) | Ready — library chosen |
| Typeface | Google Fonts (specific family TBD by author) | SIL Open Font License (OFL) — free for commercial/personal use | **TODO** — author to name the exact font family before implementation |
| Stock/hero images | None chosen yet | N/A | **TODO** — author said "later"; placeholder graphics (e.g. CSS gradient or the author's own photo) will be used until a specific, properly licensed image is chosen. No stock image goes in without a recorded source URL + license here first |
| Certificate scans | N/A | N/A | Not applicable — out of scope this iteration |
| CV (`cv.pdf`) | Author's own document | Not published; read only to extract a short, detail-free professional summary (per author's explicit instruction) | Reference only — not a site asset |

## 3. Personal-detail classification (public / private / omitted)

| Detail | Classification | Reason |
|--------|-----------------|--------|
| Full name | Public | Author approved |
| University, major, class years | Public | Author approved |
| "Altyn Belgi" gold medal | Public | Author approved |
| High school name/location | Omitted | Author chose "without details" |
| Grades / transcript | Omitted | Forbidden by course brief (NFR-04) and not provided |
| Interests, activities, completed subjects | Public | Author approved, kept general |
| Future plans (short form) | Public | Author approved, stripped of employer names/dates |
| Employer names, project/client names (from CV) | Omitted | Author said "peek only short information without details" |
| Phone number (`+7...`, from CV) | Omitted | Never published, per NFR-04 and course rule against private identifiers |
| Personal CV email (`...@proton.me`) | Omitted | Superseded by the dedicated public contact address below |
| Home address / national ID / documents | Omitted | Never collected, never published |
| Portrait photo | Public | Author's own image, author approved |
| Public contact email & Telegram handle | Public | Author explicitly chose these as the published contact channel |

**Third-party content check**: author confirmed (2026-11-24) that no photo, certificate, or achievement
on the site involves another identifiable person. No third-party permission requests are therefore
needed for this iteration. If that changes, add a row here recording who was asked and when, before
publishing.

## 4. Contact method

Published contact channels, chosen by the author to avoid exposing the phone number or personal inbox
found in the CV:

- **Email**: `contact@aablty.one` (dedicated address, not the personal CV email)
- **Telegram**: `@aablty`
- **Contact form**: planned for a later iteration; exact implementation (static mailto fallback vs. a
  form-processing service) is a technical decision deferred to the design/coding tasks. Until a form
  exists, email + Telegram are the only published channels, satisfying FR-08 without requiring a backend.

No phone number, home address, or personal document is exposed through any contact channel.

## 5. Privacy and ethical risk assessment

| Risk | Assessment | Mitigation in this project |
|------|------------|------------------------------|
| **Oversharing** | The CV contains employer names, exact employment dates, and a phone number — all more than a personal-website visitor needs. | Future-plans copy (§1) is deliberately reduced to a one-line, detail-free summary; phone number and employer names are classified **Omitted** (§3) and will never appear in page content or markup/metadata. |
| **Copyright** | Icons, fonts, and any future stock imagery are third-party creative work; using them without a compatible license would infringe copyright. | Every non-original asset is logged in §2 with its source and license before use; Lucide (ISC) and Google Fonts (OFL) are both free for this use; no stock image will be added without first recording its source/license here. |
| **False claims** | A personal site can tempt inflation of achievements or skills not actually held. | Content inventory (§1) only includes facts the author stated directly (degree in progress, 2024 gold medal, listed subjects); no achievement, certification, or job title is listed that isn't backed by the author's own CV or statement. |
| **Bias in generated text** | AI-assisted ("vibe-coded") copy can subtly misrepresent the author — invented accomplishments, wrong dates, or a tone/stereotype the author didn't intend — if generated without a human check. | All biographical copy in §1 is sourced verbatim from the author's own words, not invented by the assistant; any future AI-drafted phrasing must be reviewed and approved by the author (recorded at the next teacher-supervision checkpoint) before publishing. |
| **Account security** | The author decided to skip the optional authenticated/restricted area for this project. | No login, password, or session handling exists, so there is no credential-storage or access-control surface to secure. If a restricted area is added later, NFR-05 (HTTPS-only, no plaintext passwords) and a documented threat model apply before any credit is given, per the course brief. |

## 6. Teacher Supervision Checkpoint Log

| Date | Checkpoint | Change made |
|------|------------|-------------|
| 2026-11-24 | Task #02 content inventory drafted | Content inventory, asset register, personal-detail classification, contact method, and privacy/ethics risk assessment created from author-supplied bio facts and a detail-free peek at `cv.pdf`. KK/RU translations and font/stock-image choices left as tracked TODOs. |
