
# APZ Markdown Translation Dashboard

سیستم ترجمه چندزبانه برای مستندات Markdown با قابلیت تأیید قبل از انتشار، پیش‌نمایش زنده، کنترل نسخه، و اعلان‌های پویا به تلگرام و Discord.

🎯 ویژگی‌ها:
- ترجمه چندزبانه (فارسی، انگلیسی، کردی)
- تأیید انسانی قبل از انتشار
- پیش‌نمایش زنده و مقایسه نسخه‌ها
- اعلان‌های خودکار به تلگرام و Discord
- داشبورد مدیریت ترجمه‌ها و محتوا
- CI/CD برای GitHub Pages و VPS
- مانیتورینگ با Uptime Kuma و Grafana
سیستم ترجمه محتوای Markdown و اعلان‌ها به‌صورت پویا و چندزبانه طراحی شده است. این ساختار باعث می‌شود:

- محتوای آموزشی، مستندات، و صفحات Markdown به زبان انتخاب‌شده نمایش داده شوند  
- اعلان‌های تلگرام و Discord نیز بر اساس زبان گزارش‌دهنده یا مدیر، به‌صورت خودکار ترجمه شوند  

همه چیز با احترام به زبان، فرهنگ، و تجربه کاربری طراحی شده است.

---

✅ ۱. ترجمه پویا برای محتوای Markdown

📦 ساختار پیشنهادی برای مستندات چندزبانه
ادامه، سیستم ترجمه یکپارچه برای پروژه APZ طراحی شده است—با ساختار حرفه‌ای، قابل گسترش، و مستقل از کد. این سیستم از فایل‌های JSON خارجی استفاده می‌کند، زبان را در لحظه تغییر می‌دهد، و در تمام صفحات، اعلان‌ها، فرم‌ها و داشبوردها اعمال می‌شود.

---

✅ ساختار سیستم ترجمه یکپارچه

📁 مسیر ترجمه‌ها

`
apps/web/
├── locales/
│   ├── fa.json
│   ├── en.json
│   └── ku.json (اختیاری)
├── lib/
│   └── i18n.js
├── components/
│   └── LanguageSwitcher.js
`

---

📄 فایل‌های ترجمه (نمونه)

fa.json

`json
{
  "title": "مدیریت گزارش‌ها",
  "reply": "ارسال پاسخ",
  "status": "تغییر وضعیت",
  "login": "ورود مدیر",
  "language": "زبان",
  "contact": "تماس",
  "description": "شرح",
  "reportId": "شناسه گزارش",
  "time": "زمان",
  "responder": "پاسخ‌دهنده",
  "message": "پیام",
  "pending": "در انتظار",
  "resolved": "حل‌شده",
  "closed": "بسته‌شده"
}
`

en.json

`json
{
  "title": "Report Management",
  "reply": "Send Reply",
  "status": "Change Status",
  "login": "Admin Login",
  "language": "Language",
  "contact": "Contact",
  "description": "Description",
  "reportId": "Report ID",
  "time": "Time",
  "responder": "Responder",
  "message": "Message",
  "pending": "Pending",
  "resolved": "Resolved",
  "closed": "Closed"
}
`

---

📁 lib/i18n.js — بارگذاری ترجمه‌ها

`js
import fa from '../locales/fa.json';
import en from '../locales/en.json';
import ku from '../locales/ku.json'; // اختیاری

export const translations = {
  fa,
  en,
  ku
};
`

---

📁 components/LanguageSwitcher.js — انتخاب زبان

`jsx
export default function LanguageSwitcher({ language, setLanguage }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      🌐 <strong>Language:</strong>{' '}
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="fa">فارسی</option>
        <option value="en">English</option>
        <option value="ku">کوردی</option>
      </select>
    </div>
  );
}
`

---

📁 استفاده در صفحات (مثال: admin/reports.js)

`jsx
import { translations } from '../lib/i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function ReportsDashboard() {
  const [language, setLanguage] = useState('fa');
  const t = translations[language];

  return (
    <div style={{ padding: '2rem' }}>
      <LanguageSwitcher language={language} setLanguage={setLanguage} />
      <h1>{t.title}</h1>
      <button>{t.reply}</button>
      <select>
        <option value="pending">{t.pending}</option>
        <option value="resolved">{t.resolved}</option>
        <option value="closed">{t.closed}</option>
      </select>
    </div>
  );
}
`

---

✅ ذخیره زبان انتخاب‌شده در localStorage (اختیاری)

`js
useEffect(() => {
  const savedLang = localStorage.getItem('apz_lang');
  if (savedLang) setLanguage(savedLang);
}, []);

useEffect(() => {
  localStorage.setItem('apz_lang', language);
}, [language]);
`

---

✅ هماهنگی با اعلان‌ها و API

هنگام ارسال گزارش یا پاسخ، زبان انتخاب‌شده را همراه با داده‌ها ارسال کن:

`js
body: JSON.stringify({ ...form, language })
`

و در اعلان‌ها (notify/telegram.js, notify/discord.js) از language برای انتخاب قالب استفاده کن.

---

`
docs/
├── en/
│   └── school.md
├── fa/
│   └── school.md
├── ku/
│   └── school.md
`

📁 apps/web/pages/docs/[slug].js — بارگذاری Markdown بر اساس زبان

`jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function DocPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [language, setLanguage] = useState('fa');
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedLang = localStorage.getItem('apz_lang') || 'fa';
    setLanguage(savedLang);
  }, []);

  useEffect(() => {
    if (!slug || !language) return;
    fetch(/docs/${language}/${slug}.md)
      .then(res => res.text())
      .then(setContent);
  }, [slug, language]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 مستندات</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
`

📌 این ساختار باعث می‌شود هر فایل Markdown بر اساس زبان انتخاب‌شده بارگذاری شود.

---

✅ ۲. ترجمه پویا برای اعلان‌های تلگرام و Discord

📁 notify/telegram.js و notify/discord.js

افزودن تابع ترجمه متن‌ها بر اساس زبان:

`js
const messages = {
  fa: {
    securityTitle: '🚨 گزارش امنیتی دریافت شد',
    conductTitle: '⚠️ گزارش رفتاری دریافت شد',
    replyTitle: '📣 پاسخ مدیر',
    description: 'شرح',
    contact: 'تماس',
    reportId: 'شناسه گزارش',
    time: 'زمان',
    status: 'وضعیت',
    responder: 'پاسخ‌دهنده',
    message: 'پیام'
  },
  en: {
    securityTitle: '🚨 Security Report Received',
    conductTitle: '⚠️ Conduct Report Received',
    replyTitle: '📣 Admin Reply',
    description: 'Description',
    contact: 'Contact',
    reportId: 'Report ID',
    time: 'Time',
    status: 'Status',
    responder: 'Responder',
    message: 'Message'
  },
  ku: {
    securityTitle: '🚨 راپۆرتی ئاسایش وەرگیرا',
    conductTitle: '⚠️ راپۆرتی ڕەفتار وەرگیرا',
    replyTitle: '📣 وەڵامی بەڕێوەبەر',
    description: 'پەسنیار',
    contact: 'پەیوەندیدار',
    reportId: 'ناسنامەی راپۆرت',
    time: 'کات',
    status: 'دۆخ',
    responder: 'وەڵامدەر',
    message: 'پەیام'
  }
};

function t(lang, key) {
  return messages[lang]?.[key] || messages['fa'][key] || key;
}
`

📌 استفاده در قالب پیام‌ها

`js
const lang = report.language || 'fa';

const message = `
${t(lang, report.type === 'security' ? 'securityTitle' : 'conductTitle')}

📝 ${t(lang, 'description')}: ${report.description}
👤 ${t(lang, 'contact')}: ${report.contact || 'N/A'}
📎 ${t(lang, 'reportId')}: ${report.id}
🕒 ${t(lang, 'time')}: ${new Date().toLocaleString()}
${t(lang, 'status')}: ${report.status || 'pending'}
`;
`

📌 همین ساختار برای پاسخ‌ها نیز قابل استفاده است.

---

📦 نصب سریع:
```bash
git clone https://github.com/your-username/apz-markdown-dashboard.git
cd apz-markdown-dashboard
docker-compose up --build✅ ابزار پیشنهادی: [PM2 + pm2-monitor + Uptime Kuma]

1. 📦 مانیتورینگ داخلی با PM2

اگر از PM2 برای اجرای API و Web استفاده می‌کنی، می‌توانی از داشبورد داخلی آن بهره ببری:

نصب داشبورد مانیتورینگ:

`bash
pm2 install pm2-server-monit
`

مشاهده وضعیت:

`bash
pm2 monit
`

✅ نمایش لحظه‌ای:
- مصرف CPU و RAM  
- تعداد درخواست‌ها  
- وضعیت سرویس‌ها  
- خطاهای اخیر

---

2. 🌐 مانیتورینگ خارجی با Uptime Kuma

Uptime Kuma یک ابزار مانیتورینگ وب‌محور است که می‌تونه وضعیت API و Web را از بیرون بررسی کنه.

نصب با Docker:

`bash
docker run -d --restart=always -p 3002:3001 \
  -v uptime-kuma:/app/data \
  --name uptime-kuma \
  louislam/uptime-kuma
`

دسترسی:

`
http://your-server-ip:3002
`

✅ امکانات:
- بررسی لحظه‌ای API و Web  
- ارسال هشدار به تلگرام، Discord، ایمیل  
- نمودارهای وضعیت و تاریخچه  
- رابط کاربری فارسی و چندزبانه

---

3. 📁 فایل monitoring.md برای مستندات پروژه

📁 مسیر: docs/monitoring.md

`markdown

مانیتورینگ سرور | APZ Dashboard

✅ مانیتورینگ داخلی با PM2

`bash
pm2 install pm2-server-monit
pm2 monit
`

✅ مانیتورینگ خارجی با Uptime Kuma

`bash
docker run -d --restart=always -p 3002:3001 \
  -v uptime-kuma:/app/data \
  --name uptime-kuma \
  louislam/uptime-kuma
`

📍 دسترسی: http://your-server-ip:3002

🔔 هشدارها

- می‌توانید اعلان‌ها را به تلگرام، Discord، یا ایمیل متصل کنید
- در صورت قطع شدن API یا Web، هشدار فوری ارسال می‌شود
`

---
✅ ساخت داشبورد گرافیکی با Grafana و Prometheus

📦 مرحله ۱: نصب Prometheus

`bash
docker run -d --name prometheus \
  -p 9090:9090 \
  -v /path/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
`

📁 فایل prometheus.yml:

`yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
`

---

📦 مرحله ۲: نصب Node Exporter برای مانیتورینگ منابع

`bash
docker run -d --name node-exporter \
  -p 9100:9100 \
  prom/node-exporter
`

✅ حالا Prometheus می‌تونه منابع سرور رو جمع‌آوری کنه.

---

📦 مرحله ۳: نصب Grafana

`bash
docker run -d --name grafana \
  -p 3003:3000 \
  grafana/grafana
`

📍 دسترسی: http://your-server-ip:3003  
نام کاربری: admin  
رمز عبور: admin (اولین ورود تغییر بده)

---

📦 مرحله ۴: اتصال Grafana به Prometheus

1. وارد Grafana شو  
2. به بخش Data Sources برو  
3. انتخاب کن: Prometheus  
4. وارد کن: http://localhost:9090  
5. ذخیره کن ✅

---

📦 مرحله ۵: افزودن داشبورد آماده

در Grafana:
- به بخش Dashboards → Import برو  
- وارد کن: ID داشبورد عمومی مثل 1860 برای Node Exporter  
- حالا نمودارهای CPU، RAM، Disk، و Network رو داری 🎯

---
✅ مرحله اول: اتصال اعلان‌های Uptime Kuma به تلگرام و Discord

1. ورود به پنل Uptime Kuma

- آدرس: http://your-server-ip:3002  
- ورود با رمز یا ساخت حساب جدید

---

2. افزودن اعلان تلگرام

📍 مسیر: Settings → Notification → Add New Notification → Telegram Bot

- Bot Token: از BotFather دریافت کن  
- Chat ID: عدد گروه یا آی‌دی کانال (مثلاً @apz_alerts)  
- فعال‌سازی گزینه‌های:
  - Send on Down  
  - Send on Up  
  - Send on Recovery

✅ روی "Test Notification" کلیک کن → پیام تست باید در تلگرام ظاهر شود

---

3. افزودن اعلان Discord

📍 مسیر: Settings → Notification → Add New Notification → Discord Webhook

- Webhook URL: از تنظیمات کانال Discord → Integrations → Webhooks  
- نام و آیکون سفارشی (اختیاری)

✅ روی "Test Notification" کلیک کن → پیام embed باید در کانال ظاهر شود

---

4. اتصال اعلان‌ها به مانیتورها

📍 هنگام ساخت یا ویرایش هر مانیتور (مثلاً API یا Web):

- در بخش Notifications → انتخاب کن: Telegram و Discord  
- ذخیره کن ✅

📌 حالا هر قطعی یا خطا، فوراً به تلگرام و Discord اطلاع داده می‌شود

---

✅ مرحله دوم: ساخت داشبورد گرافیکی با Grafana و Prometheus

1. نصب Prometheus

`bash
docker run -d --name prometheus \
  -p 9090:9090 \
  -v /opt/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
`

📁 فایل /opt/prometheus.yml:

`yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['host.docker.internal:9100']
`

---

2. نصب Node Exporter

`bash
docker run -d --name node-exporter \
  -p 9100:9100 \
  prom/node-exporter
`

✅ این سرویس اطلاعات CPU، RAM، Disk و Network را جمع‌آوری می‌کند

---

3. نصب Grafana

`bash
docker run -d --name grafana \
  -p 3003:3000 \
  grafana/grafana
`

📍 دسترسی: http://your-server-ip:3003  
نام کاربری: admin  
رمز عبور: admin (اولین ورود تغییر بده)

---

4. اتصال Grafana به Prometheus

📍 مسیر: Settings → Data Sources → Add → Prometheus

- URL: http://host.docker.internal:9090  
- ذخیره کن ✅

---

5. افزودن داشبورد آماده

📍 مسیر: Dashboards → Import → وارد کن: 1860 (Node Exporter Full)

✅ حالا نمودارهای لحظه‌ای از منابع سرور را داری:
- CPU Usage  
- Memory  
- Disk I/O  
- Network Traffic

📌 می‌تونی هشدارهای Grafana را نیز به تلگرام و Discord وصل کنی (در بخش Alerting)

Sources:  
- Grafana Docs – Getting Started with Prometheus  
- Cherry Servers – Server Monitoring with Prometheus and Grafana  
- LinuxConfig – Setup Prometheus & Grafana



 git push -u origin mainapz-markdown-dashboard/
├── apps/
│   ├── api/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   ├── docs.js
│   │   │   ├── translations.js
│   │   │   └── notify.js
│   │   ├── notify/
│   │   │   ├── telegram.js
│   │   │   ├── discord.js
│   │   │   ├── messages.js
│   │   │   └── translationStatus.js
│   │   ├── utils/diff.js
│   │   ├── .env.example
│   │   └── Dockerfile
│   └── web/
│       ├── pages/
│       │   ├── index.js
│       │   ├── docs/[slug].js
│       │   └── admin/
│       │       ├── translations.js
│       │       ├── docs.js
│       │       ├── approvals.js
│       │       └── diff.js
│       ├── components/
│       │   ├── LanguageSwitcher.js
│       │   └── DiffViewer.js
│       ├── lib/i18n.js
│       ├── locales/
│       │   ├── fa.json
│       │   ├── en.json
│       │   └── ku.json
│       └── Dockerfile
├── docs/
│   ├── fa/
│   ├── en/
│   └── ku/
├── docs_pending/
│   ├── fa/
│   ├── en/
│   └── ku/
├── .github/
│   └── workflows/
│       ├── deploy-pages.yml
│       └── deploy-server.yml
├── ecosystem.config.js
├── docker-compose.yml
├── README.md
├── CONTRIBUTING.md
├── docs/monitoring.md
├── docs/server-test-checklist.md
└── .gitignore49d59a88f3796da8dff9e3ffb44d16fe31e91444# apz_chain