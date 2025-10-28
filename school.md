سیستم ترجمه محتوای Markdown و اعلان‌ها به‌صورت پویا و چندزبانه طراحی شده است. این ساختار باعث می‌شود:

- محتوای آموزشی، مستندات، و صفحات Markdown به زبان انتخاب‌شده نمایش داده شوند  
- اعلان‌های تلگرام و Discord نیز بر اساس زبان گزارش‌دهنده یا مدیر، به‌صورت خودکار ترجمه شوند  

همه چیز با احترام به زبان، فرهنگ، و تجربه کاربری طراحی شده است.

---

✅ ۱. ترجمه پویا برای محتوای Markdown

📦 ساختار پیشنهادی برای مستندات چندزبانه

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