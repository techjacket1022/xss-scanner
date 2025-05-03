const fetch = require('node-fetch');
const fs = require('fs');
const { URL } = require('url');

const target = 'http://localhost/xss-test.php?name=test';

const payloads = [
    `<script>alert(1)</script>`,
    `"><script>alert(1)</script>`,
    `'><script>alert(1)</script>`,
    `<img src=x onerror=alert(1)>`
];

(async () => {
    const urlObj = new URL(target);
    const params = [...urlObj.searchParams.keys()];
    const found = [];
    const reportLines = [];

    for (const param of params) {
        for (const payload of payloads) {
            const testUrl = new URL(target);
            testUrl.searchParams.set(param, payload);

            try {
                const res = await fetch(testUrl.toString());
                const html = await res.text();

                console.log(`Ответ от ${testUrl}:
${html.slice(0, 200)}
...`);

                if (html.includes(payload)) {
                    const result = `[+] XSS обнаружена | Параметр: ${param} | Payload: ${payload} | URL: ${testUrl}`;
                    console.log(result);
                    reportLines.push(result);
                    found.push({ param, payload });
                } else {
                    const safe = `[-] Безопасно | ${param} | Payload: ${payload}`;
                    reportLines.push(safe);
                }
            } catch (err) {
                const error = `[!] Ошибка при запросе к ${testUrl} | ${err.message}`;
                console.error(error);
                reportLines.push(error);
            }
        }
    }

    reportLines.push(`\nОбнаружено XSS: ${found.length}`);
    fs.writeFileSync('report.txt', reportLines.join('\n'), 'utf8');
    console.log(`\n[✓] Отчёт сохранён: report.txt`);
})();