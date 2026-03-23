(function() {

window.SP_APP = {};

window.SP_APP.getEl = function(id) {
    const root = document.querySelector('.sp-new-app-instance') || document;
    return root.querySelector('#' + id) || document.getElementById(id);
};

const appRoot = document.querySelector('.sp-new-app-instance') || document;
const $el = window.SP_APP.getEl;
const $qAll = (sel) => appRoot.querySelectorAll(sel);

const normCountry = (c) => c ? c.toLowerCase().replace(/[\s\uFEFF\xA0]+/g, ' ').trim() : "";

const SP_PREDICTOR_ICONS = {
    chart: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:middle;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    page: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    alert: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:middle;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
};

const SP_ICONS = {
    target: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    message: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    globe: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    route: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    
    subtypes: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    subjects: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    practice: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><path d="M16.3 11L13 2H11L7.7 11"></path><path d="M5.5 16A2 2 0 0 1 3.5 18v2a2 2 0 0 1-2 2H22.5a2 2 0 0 1-2-2v-2a2 2 0 0 1-2-2H5.5z"></path><path d="M9 11h6"></path></svg>`,
    career: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    masters: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><path d="M22 10L12 5l-10 5 10 5 10-5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
    trajectory: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="18" r="3"></circle><path d="M8.5 8.5l7 7"></path></svg>`,
    focus: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>`,
    
    building: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>`,
    degree: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
    link: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    fileBreak: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="4" y1="12" x2="20" y2="12" stroke-dasharray="4 4"></line></svg>`,
    arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`,
    arrowDown: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`,
    grip: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>`,
    calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:middle;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:middle;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
};

const STANDARD_COUNTRIES = [
    'Великобритания', 'Ирландия', 'Нидерланды', 'Германия', 'Австрия', 'Франция', 'Испания', 'Италия', 'Кипр',
    'США', 'Канада', 'Австралия', 'Новая Зеландия'
];

const CONFIG = {
    UNI_CSV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYMsVRLQN7PP2gB1-yr7LD-LG2MbpJ5l8P9VJGD5GzWyTYqsXF5fBbAKnlyjxDjcTBE2ObiR8k6cOU/pub?gid=0&single=true&output=csv",
    MAJOR_CSV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYMsVRLQN7PP2gB1-yr7LD-LG2MbpJ5l8P9VJGD5GzWyTYqsXF5fBbAKnlyjxDjcTBE2ObiR8k6cOU/pub?gid=1875457401&single=true&output=csv",
    TEXTS_CSV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYMsVRLQN7PP2gB1-yr7LD-LG2MbpJ5l8P9VJGD5GzWyTYqsXF5fBbAKnlyjxDjcTBE2ObiR8k6cOU/pub?gid=1634482900&single=true&output=csv",
    GAS_URL: "https://script.google.com/macros/s/AKfycbwxMlD9m_Fwwlz7ZUngCsQ1dK9vV_hyefkW0ze7OQ6ErN9rw4nIx_nzA5MWlU63iFctqw/exec"
};

const SP_PARSER = {
    cleanCSV: (txt) => {
        if (!txt) return [];
        if (txt.charCodeAt(0) === 0xFEFF) txt = txt.slice(1);

        const rows = [];
        let row = [];
        let cur = "";
        let inQ = false;
        
        for (let i = 0; i < txt.length; i++) {
            let c = txt[i];
            let n = txt[i + 1];
            
            if (c === '"') {
                if (inQ && n === '"') { cur += '"'; i++; } else { inQ = !inQ; }
            } else if (c === ',' && !inQ) {
                row.push(cur.trim()); cur = "";
            } else if ((c === '\r' || c === '\n') && !inQ) {
                if (c === '\r' && n === '\n') { i++; }
                row.push(cur.trim()); rows.push(row); row = []; cur = "";
            } else {
                cur += c; 
            }
        }
        row.push(cur.trim());
        if (row.length > 0 && row.some(x => x !== "")) rows.push(row);
        
        return rows.filter(r => r.some(field => field.trim().length > 0));
    },
    parseListByLineOrComma: (t) => t ? t.split(/[\r\n]+|•/).map(s => s.trim().replace(/^-/, '').trim()).filter(s => s.length > 2) : []
};

/* --- STATE --- */
const state = {
    activeSectionId: 'step-1', flow: null, hasDossier: false, mode: "full", roadmapInit: false,
    studentName: "",
    dossier: {
        age: "", grade: "", eng: "", budget: "", gpa: "", hsCountry: "", date: "",
        testStatus: "Не указано", testDetails: "",
        prof: [], pref: [],
        expertComment: "",
        countries: [], countryNotes: {},
        swot: { S: [], O: [] },
        roadmap: [
            {action: "Определиться со специальностью", date: ""},
            {action: "Определить как изучаем язык", date: ""},
            {action: "Сроки сдачи языка (пробник дуолинго ссылка)", date: ""},
            {action: "Составление подборки", date: ""},
            {action: "Начало поступления", date: ""}
        ],
        services: [],
        finalCost: ""
    },
    selected: { majors: [], majorComment: "", countries: {}, countryOrder: [] },
    majorsVisible: 10, currentFilteredMajors: [],
    unisVisible: 10, currentGroupedUnis: [], flatFilteredUnis: [],
    fUni: { country:[], name:[], majors:[], level:[] }
};

const DB = {
    unis: [], majors: [], texts: {},
    indices: { major_names: new Set(), uni_countries: new Set(), uni_names: new Set(), uni_majors: new Set(), uni_levels: new Set() }
};

SP_APP.execCmd = (cmd) => { document.execCommand(cmd, false, null); };

const getVisualLength = (htmlStr) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlStr;
    return tmp.innerText.trim().length;
};

const formatDateRu = (dateStr) => {
    if(!dateStr) return '';
    const d = new Date(dateStr);
    if(isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});
};

/* --- INIT & DATA LOAD --- */
function init() {
    loadData(false);
    setupMajorFilters();
    setupUniFiltersUI();
    renderNav();
    setInterval(() => { loadData(true); }, 120000);
}

async function loadData(isBackground = false) {
    if (!isBackground) {
        const loader = $el('sp-loading');
        if(loader) loader.style.display = 'block';
    }
    const noCache = '&_=' + Date.now();
    try {
        const [uniRes, majorRes, textRes] = await Promise.all([
            fetch(CONFIG.UNI_CSV + noCache).then(r=>r.ok?r.text():""), 
            fetch(CONFIG.MAJOR_CSV + noCache).then(r=>r.ok?r.text():""),
            fetch(CONFIG.TEXTS_CSV + noCache).then(r=>r.ok?r.text():"")
        ]);
        
        DB.indices = { major_names: new Set(), uni_countries: new Set(), uni_names: new Set(), uni_majors: new Set(), uni_levels: new Set() };
        DB.texts = {};

        if(textRes) {
            const rows = SP_PARSER.cleanCSV(textRes);
            if(rows.length > 0) {
                rows.forEach((r, idx) => {
                    if (idx === 0 && r[0] && (r[0].toLowerCase().includes('текст') || (r[2] && r[2].toLowerCase().includes('страна')))) return; 
                    if(r.length >= 3) {
                        const text = r[0] ? r[0].trim().replace(/\r\n/g, '<br>').replace(/\n/g, '<br>') : "";
                        const type = r[1] ? r[1].trim() : "";
                        const country = r[2] ? r[2].trim() : "";
                        const nc = normCountry(country);
                        if(nc && type && text) {
                            if(!DB.texts[nc]) DB.texts[nc] = {};
                            DB.texts[nc][type] = text;
                        }
                    }
                });
            }
        }

        if(majorRes) {
            const rows = SP_PARSER.cleanCSV(majorRes);
            if(rows.length>1) {
                const h = rows[0].map(x=>x.toLowerCase().trim());
                const find=(k)=>h.findIndex(head=>k.some(x=>head.includes(x)));
                const mIdx = { name: find(['название']), desc: find(['описание']), sub: find(['разделяются']), subj: find(['предметы']), prac: find(['практич']), car: find(['карьер']), traj: find(['траектор']), mast: find(['магистратура']), foc: find(['фокус']) };
                DB.majors = rows.slice(1).map(r=>{
                    const val=(i)=>(i>-1&&r[i])?r[i].trim():""; const name=val(mIdx.name); if(!name)return null;
                    DB.indices.major_names.add(name);
                    return { name, desc: val(mIdx.desc), subtypes: SP_PARSER.parseListByLineOrComma(val(mIdx.sub)), subjects: SP_PARSER.parseListByLineOrComma(val(mIdx.subj)), practice: val(mIdx.prac), career: SP_PARSER.parseListByLineOrComma(val(mIdx.car)), trajectory: SP_PARSER.parseListByLineOrComma(val(mIdx.traj)), masters: SP_PARSER.parseListByLineOrComma(val(mIdx.mast)), focus: val(mIdx.foc) };
                }).filter(Boolean);
                state.currentFilteredMajors = DB.majors;
            }
        }

        if(uniRes) {
            const rows = SP_PARSER.cleanCSV(uniRes);
            if(rows.length>1) {
                const h = rows[0].map(x=>x.toLowerCase().trim());
                const uIdx = { name: h.findIndex(x=>x.includes('название')), country: h.findIndex(x=>x.includes('страна')), major: h.findIndex(x=>x.includes('специальность')), level: h.findIndex(x=>x.includes('уровень')), site: h.findIndex(x=>x.includes('сайт')), cost: h.findIndex(x=>x.includes('стоимость')), curr: h.findIndex(x=>x.includes('валюта')), city: h.findIndex(x=>x.includes('город')||x.includes('city')), map: h.findIndex(x=>x.includes('локация')) };
                DB.unis = rows.slice(1).map(r=>{
                    const val=(i)=>(i>-1&&r[i])?r[i].trim():""; 
                    const name=val(uIdx.name); const major=val(uIdx.major);
                    // ЖЕСТКИЙ ФИЛЬТР: Пропускаем если нет Названия ИЛИ Специальности
                    if(!name || !major) return null; 
                    
                    const country=val(uIdx.country); const level=val(uIdx.level); let cost=val(uIdx.cost); const cur=val(uIdx.curr);
                    if(cur && cost && !cost.includes(cur)) cost += ` ${cur}`;
                    
                    if(country) DB.indices.uni_countries.add(country); if(name) DB.indices.uni_names.add(name); if(major) DB.indices.uni_majors.add(major); if(level) DB.indices.uni_levels.add(level);
                    return { name, country, city:val(uIdx.city), major, level, cost, site:val(uIdx.site), map:val(uIdx.map) };
                }).filter(Boolean);
                state.flatFilteredUnis = DB.unis;
            }
        }
        
        filterMajors(!isBackground); 
        filterUnis(!isBackground);
        
    } catch(e){
        console.error(e);
    } finally {
        if (!isBackground) {
            const loader = $el('sp-loading');
            if(loader) loader.style.display = 'none';
        }
    }
}

/* --- NAVIGATION LOGIC --- */
const navSteps = {
    selection: [ {id:'step-1', lbl:'1. Студент'}, {id:'step-2', lbl:'2. Режим'}, {id:'step-3', lbl:'3. Специальности'}, {id:'step-4', lbl:'4. Университеты'}, {id:'step-5', lbl:'5. Комментарии'}, {id:'step-6', lbl:'6. Финал'} ],
    dossier: [ {id:'step-1', lbl:'1. Студент'}, {id:'step-2a', lbl:'2. Профиль'}, {id:'step-3a', lbl:'3. Стратегия'}, {id:'step-4a', lbl:'4. Отчет'} ]
};

function renderNav() {
    const c = $el('sp-steps-container');
    const flow = state.flow || 'selection';
    const arr = navSteps[flow];
    
    let html = '';
    let actIdx = 0;
    arr.forEach((s, i) => {
        const isAct = s.id === state.activeSectionId;
        if(isAct) actIdx = i;
        html += `<div class="sp-step-tag ${isAct?'active':''}" style="display:block">${s.lbl}</div>`;
    });
    c.innerHTML = html;
    
    const pct = arr.length > 1 ? (actIdx / (arr.length - 1)) * 100 : 0;
    $el('sp-progress-bar').style.width = pct + '%';
}

SP_APP.goTo = (id) => {
    $qAll('.sp-section').forEach(el => el.classList.remove('active'));
    $el(id).classList.add('active');
    state.activeSectionId = id;
    renderNav();
    $el('sp-root-container').scrollTop = 0;
};

SP_APP.gotoFork = () => {
    state.studentName = $el('inp-student').value.trim();
    if(!state.studentName) return alert("Введите имя");
    SP_APP.goTo('step-1-5');
};

SP_APP.chooseFlow = (flowStr) => {
    state.flow = flowStr;
    if(flowStr === 'dossier') {
        if(!state.roadmapInit) { SP_APP.renderRoadmap(); state.roadmapInit = true; }
        SP_APP.goTo('step-2a');
    }
    else { SP_APP.goTo('step-2'); }
};

SP_APP.backFromSelectionMode = () => {
    if(state.hasDossier) SP_APP.goTo('step-4a');
    else SP_APP.goTo('step-1-5');
};

/* --- DOSSIER LOGIC --- */
SP_APP.addCustomCountry = () => {
    const inp = $el('d-country-other'); const val = inp.value.trim(); if(!val) return;
    const container = $el('custom-countries-container');
    const lbl = document.createElement('label'); lbl.className = 'sp-checkbox-lbl';
    lbl.innerHTML = `<input type="checkbox" value="${val.replace(/"/g, '&quot;')}" checked> ${val}`;
    container.appendChild(lbl); inp.value = "";
};

SP_APP.syncDynamicList = (type) => { state.dossier[type] = Array.from($qAll(`#d-${type}-list input`)).map(inp => inp.value); };
SP_APP.addDynamicItem = (type) => { SP_APP.syncDynamicList(type); state.dossier[type].push(""); renderDynamicList(type); };
SP_APP.removeDynamicItem = (type, i) => { SP_APP.syncDynamicList(type); state.dossier[type].splice(i, 1); renderDynamicList(type); };
function renderDynamicList(type) {
    const c = $el(`d-${type}-list`);
    c.innerHTML = state.dossier[type].map((val, i) => `<div class="sp-dynamic-item"><input class="sp-input" value="${val.replace(/"/g, '&quot;')}" placeholder="Ввод..."><button onclick="SP_APP.removeDynamicItem('${type}', ${i})">×</button></div>`).join('');
}

SP_APP.syncRoadmap = () => { state.dossier.roadmap = Array.from($qAll('.sp-roadmap-item')).map(r => ({ action: r.querySelector('.r-action').value, date: r.querySelector('.r-date').value })); };
SP_APP.addRoadmapItem = () => { SP_APP.syncRoadmap(); state.dossier.roadmap.push({action: "", date: ""}); SP_APP.renderRoadmap(); };
SP_APP.removeRoadmapItem = (i) => { SP_APP.syncRoadmap(); state.dossier.roadmap.splice(i, 1); SP_APP.renderRoadmap(); };
SP_APP.renderRoadmap = () => {
    const c = $el('d-roadmap-list');
    c.innerHTML = state.dossier.roadmap.map((r, i) => `<div class="sp-roadmap-item"><input class="sp-input r-action" value="${r.action.replace(/"/g, '&quot;')}" placeholder="Действие (например: Составление подборки)"><input type="month" class="sp-input r-date" value="${r.date.replace(/"/g, '&quot;')}" placeholder="Срок (год и месяц)"><button class="sp-btn-small" style="background:#fee2e2; color:#dc2626; border:none; height:38px; width:38px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:16px;" onclick="SP_APP.removeRoadmapItem(${i})">×</button></div>`).join('');
};

SP_APP.syncSwotList = (cat) => { state.dossier.swot[cat] = Array.from($qAll(`#swot-${cat}-list .sp-swot-item-box`)).map(box => ({ title: box.querySelector('input').value, text: box.querySelector('textarea').value })); };
SP_APP.addSwotItem = (cat) => { SP_APP.syncSwotList(cat); state.dossier.swot[cat].push({ title: "", text: "" }); renderSwotList(cat); };
SP_APP.removeSwotItem = (cat, i) => { SP_APP.syncSwotList(cat); state.dossier.swot[cat].splice(i, 1); renderSwotList(cat); };
function renderSwotList(cat) {
    const c = $el(`swot-${cat}-list`);
    c.innerHTML = state.dossier.swot[cat].map((item, i) => `<div class="sp-swot-item-box"><div style="display:flex; justify-content:space-between; margin-bottom:6px;"><input class="sp-input" style="font-weight:700" value="${item.title.replace(/"/g, '&quot;')}" placeholder="Заголовок"><button onclick="SP_APP.removeSwotItem('${cat}', ${i})" style="background:none; border:none; color:var(--sp-danger); cursor:pointer; font-size:18px; margin-left:8px;">×</button></div><textarea class="sp-textarea" style="min-height:60px" placeholder="Пояснение / Комментарий...">${item.text}</textarea></div>`).join('');
}

SP_APP.saveDossierForm = () => {
    SP_APP.syncDynamicList('prof'); SP_APP.syncDynamicList('pref'); SP_APP.syncDynamicList('services'); SP_APP.syncRoadmap(); ['S','O'].forEach(SP_APP.syncSwotList);
    const d = state.dossier;
    d.age = $el('d-age').value.trim(); d.grade = $el('d-grade').value.trim(); d.eng = $el('d-eng').value.trim(); d.budget = $el('d-budget').value.trim(); d.gpa = $el('d-gpa').value.trim(); d.hsCountry = $el('d-hs-country').value.trim(); d.date = $el('d-date').value.trim(); d.testStatus = $el('d-test-status').value; d.testDetails = $el('d-test-details').value.trim(); d.expertComment = $el('d-expert-comment').innerHTML; d.finalCost = $el('d-final-cost').value.trim();
    
    const cboxes = $qAll('#d-country-checks input:checked, #custom-countries-container input:checked');
    let selC = Array.from(cboxes).map(cb => cb.value);
    const other = $el('d-country-other').value.trim();
    if(other && !selC.includes(other)) selC.push(other);
    d.countries = Array.from(new Set(selC));
    
    renderCountryStrategy(); SP_APP.goTo('step-3a');
};

SP_APP.handleCountryInput = (country, el) => {
    const htmlVal = el.innerHTML; const visualLen = getVisualLength(htmlVal);
    SP_APP.saveCountryNoteLS(country, htmlVal); SP_APP.updateTextMarker(country, visualLen); SP_APP.updatePagePredictor(); 
};

SP_APP.updateTextMarker = (country, len) => {
    const marker = $el(`marker-${country}`); if(!marker) return;
    let text = ""; let cls = "safe";
    if(len < 1500) { text = "Займет около 1/3 страницы"; cls = "safe"; }
    else if(len < 2500) { text = "Займет около половины страницы"; cls = "safe"; }
    else if(len < 3500) { text = "Займет большую часть страницы"; cls = "warn"; }
    else { text = `Осталось ${4000 - len} симв. (предел страницы)`; cls = "danger"; }
    marker.textContent = `Объем: ${len} / 4000 видимых символов (${text})`; marker.className = `sp-char-marker ${cls}`;
};

SP_APP.handleCountryKeydown = (e, el) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'];
    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (getVisualLength(el.innerHTML) >= 4000) e.preventDefault();
};

SP_APP.handleCountryPaste = (e, el) => {
    const pasteText = (e.clipboardData || window.clipboardData).getData('text');
    if (getVisualLength(el.innerHTML) + pasteText.length > 4000) { e.preventDefault(); alert('Вставка отменена: превышен лимит в 4000 символов.'); }
};

SP_APP.applyTemplate = (country, type) => {
    const editor = $el(`ta-country-${country}`); if(!editor) return;
    let newText = ""; const nc = normCountry(country);
    if(type !== 'custom' && DB.texts[nc] && DB.texts[nc][type]) { newText = DB.texts[nc][type]; }
    editor.innerHTML = newText; SP_APP.handleCountryInput(country, editor);
};

SP_APP.updatePagePredictor = () => {
    const predictor = $el('sp-page-predictor'); if(!predictor) return;
    const d = state.dossier; const cNotes = d.countries.filter(c => d.countryNotes[c] && d.countryNotes[c].include && d.countryNotes[c].text.trim());
    if(cNotes.length === 0) { predictor.innerHTML = `<div style="font-weight:700; font-size:13px; color:var(--sp-dark); display:flex; align-items:center;">${SP_PREDICTOR_ICONS.chart} Распределение по страницам в PDF</div><div style="font-size:12px; color:#666; margin-top:5px;">Пока нет введенных текстов.</div>`; return; }

    let pages = []; let currentPage = []; let charsOnPage = 0; const MAX_CHARS = 3000; let isFirstCountryPage = true;
    cNotes.forEach(c => {
        const textLen = getVisualLength(d.countryNotes[c].text);
        if (charsOnPage + textLen > MAX_CHARS && charsOnPage > 0) { pages.push(currentPage); currentPage = []; charsOnPage = 0; isFirstCountryPage = false; }
        if (charsOnPage === 0) { if (isFirstCountryPage) charsOnPage += 200; }
        currentPage.push(c); charsOnPage += textLen;
    });
    if (currentPage.length > 0) { pages.push(currentPage); }
    
    let html = `<div style="font-weight:700; font-size:13px; color:var(--sp-dark); margin-bottom:8px; display:flex; align-items:center;">${SP_PREDICTOR_ICONS.chart} Распределение стран по страницам PDF:</div>`;
    pages.forEach((pageCountries, i) => {
        html += `<div style="font-size:12px; margin-bottom:6px; color:#334155; display:flex; align-items:center;">${SP_PREDICTOR_ICONS.page} <strong>Лист ${i+1}:</strong>&nbsp;${pageCountries.join(', ')}</div>`;
        if(i < pages.length - 1) { html += `<div style="font-size:11px; font-weight:700; color:#ea580c; margin-bottom:6px; margin-left:18px; display:flex; align-items:center;">${SP_PREDICTOR_ICONS.alert} Разрыв страницы</div>`; }
    });
    predictor.innerHTML = html;
};

function renderCountryStrategy() {
    const c = $el('d-countries-container');
    if(!state.dossier.countries.length) { c.innerHTML = "<div style='color:#666'>Страны не выбраны. Вернитесь назад и выберите страны.</div>"; return; }
    
    let html = "";
    state.dossier.countries.forEach(country => {
        const lsKey = 'sp_country_note_' + country;
        let savedText = localStorage.getItem(lsKey) || "";
        if(!state.dossier.countryNotes[country]) { state.dossier.countryNotes[country] = { text: savedText, include: true }; } 
        else { if(!state.dossier.countryNotes[country].text && savedText) { state.dossier.countryNotes[country].text = savedText; } }
        
        const noteObj = state.dossier.countryNotes[country];
        let selectHtml = ""; let isStandard = STANDARD_COUNTRIES.includes(country); const nc = normCountry(country);
        if(isStandard && DB.texts[nc]) {
            let optionsHtml = `<option value="custom">Свой текст</option>`;
            Object.keys(DB.texts[nc]).forEach(type => { optionsHtml += `<option value="${type}">${type}</option>`; });
            selectHtml = `<select class="sp-template-select" onchange="SP_APP.applyTemplate('${country}', this.value)"><option value="" disabled selected>Шаблон текста</option>${optionsHtml}</select>`;
        } else { selectHtml = `<span class="sp-template-badge">Свой текст</span>`; }
        
        html += `<div class="sp-country-strategy-box"><div class="sp-country-strategy-title"><div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;"><span style="margin:0;">${country}</span>${selectHtml}</div><label class="sp-checkbox-lbl" style="font-weight:600; color:var(--sp-violet);"><input type="checkbox" ${noteObj.include ? 'checked' : ''} onchange="state.dossier.countryNotes['${country}'].include = this.checked; SP_APP.updatePagePredictor();"> Включить в PDF</label></div><div class="sp-editor-toolbar"><div style="display:flex; gap:6px;"><button type="button" class="sp-editor-btn" onclick="SP_APP.execCmd('bold')"><b>B</b></button><button type="button" class="sp-editor-btn" onclick="SP_APP.execCmd('italic')"><i>I</i></button><button type="button" class="sp-editor-btn" onclick="SP_APP.execCmd('insertUnorderedList')">• Список</button></div></div><div contenteditable="true" class="sp-editor" id="ta-country-${country}" data-placeholder="Шаблонный или свой комментарий по стране..." oninput="SP_APP.handleCountryInput('${country}', this)" onkeydown="SP_APP.handleCountryKeydown(event, this)" onpaste="SP_APP.handleCountryPaste(event, this)">${noteObj.text}</div><div id="marker-${country}" class="sp-char-marker"></div></div>`;
    });
    c.innerHTML = html;
    setTimeout(() => {
        state.dossier.countries.forEach(country => {
            const ta = $el(`ta-country-${country}`);
            if(ta) SP_APP.updateTextMarker(country, getVisualLength(ta.innerHTML));
        });
        SP_APP.updatePagePredictor();
    }, 50);
}

SP_APP.saveCountryNoteLS = (country, val) => { state.dossier.countryNotes[country].text = val; localStorage.setItem('sp_country_note_' + country, val); };

SP_APP.generateDossierPreview = () => {
    for (const country of state.dossier.countries) {
        if (!STANDARD_COUNTRIES.includes(country)) {
            const noteObj = state.dossier.countryNotes[country];
            if (noteObj && noteObj.include) {
                const textLen = getVisualLength(noteObj.text);
                if (textLen === 0) {
                    alert(`Пожалуйста, введите текст для добавленной страны "${country}" (или снимите галочку "Включить в PDF").`);
                    const ta = $el(`ta-country-${country}`); if(ta) ta.focus(); return; 
                }
            }
        }
    }
    state.hasDossier = true;
    const area = $el('dossier-print-area'); area.innerHTML = "";
    generateDossierHTML(area); SP_APP.goTo('step-4a');
};

SP_APP.continueToSelection = () => { state.flow = 'selection'; SP_APP.goTo('step-2'); };

const formatRoadmapDate = (dStr) => {
    if(!dStr) return 'Срок не указан'; if(!dStr.includes('-')) return dStr;
    const [y, m] = dStr.split('-');
    const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    return `${months[parseInt(m, 10)-1]} ${y}`;
};

// --- ФОРМИРОВАНИЕ HTML ДЛЯ PDF ОТЧЕТА ---
function generateDossierHTML(container) {
    const d = state.dossier;
    let page1 = `<div class="pdf-page"><div class="pdf-d-header"><div class="pdf-d-name">${state.studentName}</div><div class="pdf-d-profile-grid">`;
    const renderP = (lbl, val) => val ? `<div><div class="pdf-d-p-lbl">${lbl}</div><div class="pdf-d-p-val">${val}</div></div>` : '';
    
    page1 += renderP('Возраст', d.age) + renderP('Класс / Курс', d.grade) + renderP('Английский', d.eng) + renderP('Бюджет', d.budget) + renderP('Средний балл (GPA)', d.gpa) + renderP('Локация аттестата', d.hsCountry) + renderP('Дата старта', d.date);
    
    let combinedTestInfo = (d.testStatus !== 'Не указано' && d.testStatus) ? d.testStatus : '';
    if (combinedTestInfo && d.testDetails) {
        if (combinedTestInfo === 'Сдача запланирована' || combinedTestInfo === 'Не сдавал') combinedTestInfo += ` (${d.testDetails})`;
        else combinedTestInfo += ` — ${d.testDetails}`;
    } else if (!combinedTestInfo && d.testDetails) { combinedTestInfo = d.testDetails; }
    page1 += renderP('Тесты', combinedTestInfo) + `</div></div>`; 
    
    const profs = d.prof.filter(x => x.trim());
    if(profs.length) page1 += `<div class="pdf-block-title">${SP_ICONS.target} Интересующие направления</div><ul class="pdf-list-purple">${profs.map(p => `<li>${p}</li>`).join('')}</ul>`;
    
    const hasSwot = ['S','O'].some(k => d.swot[k].length > 0);
    if(hasSwot) {
        page1 += `<div class="pdf-swot-grid">`;
        ['S','O'].forEach(k => {
            if(d.swot[k].length) {
                let t = "Сильные стороны"; if(k==='O') t="Возможности";
                page1 += `<div class="pdf-swot-card ${k}"><div class="pdf-swot-card-title">${t}</div>`;
                d.swot[k].forEach(item => { if(item.title||item.text) page1 += `<div class="pdf-swot-point"><strong>${item.title}</strong>${item.text}</div>`; });
                page1 += `</div>`;
            }
        });
        page1 += `</div>`;
    }

    const prefs = d.pref.filter(x => x.trim());
    if(prefs.length) page1 += `<div class="pdf-block-title">${SP_ICONS.star} Предпочтения</div><ul class="pdf-list-green">${prefs.map(p => `<li>${p}</li>`).join('')}</ul>`;
    if(d.expertComment) page1 += `<div class="pdf-block-title">${SP_ICONS.message} Комментарий эксперта</div><div class="pdf-text-block">${d.expertComment}</div>`;
    
    page1 += `</div>`; container.insertAdjacentHTML('beforeend', page1);
    
    const cNotes = d.countries.filter(c => d.countryNotes[c] && d.countryNotes[c].include && d.countryNotes[c].text.trim());
    if(cNotes.length) {
        let currentPageHTML = ''; let charsOnPage = 0; const MAX_CHARS = 3000; let isFirstCountryPage = true;
        cNotes.forEach((c) => {
            const textLen = getVisualLength(d.countryNotes[c].text);
            if (charsOnPage + textLen > MAX_CHARS && charsOnPage > 0) {
                container.insertAdjacentHTML('beforeend', `<div class="pdf-page">${currentPageHTML}</div>`);
                currentPageHTML = ''; charsOnPage = 0; isFirstCountryPage = false;
            }
            if (charsOnPage === 0) {
                currentPageHTML += `<div class="pdf-block-title" style="margin-top:0;">${SP_ICONS.globe} Стратегия по странам ${!isFirstCountryPage ? '(продолжение)' : ''}</div>`;
                if (isFirstCountryPage) {
                    currentPageHTML += `<div style="margin-bottom: 15px;">`;
                    cNotes.forEach(tagC => { currentPageHTML += `<span class="pdf-country-tag">${tagC}</span>`; });
                    currentPageHTML += `</div>`; charsOnPage += 200;
                }
            }
            currentPageHTML += `<div class="pdf-country-block"><h4 style="margin-bottom:8px; color:var(--sp-dark); font-size:14px;">${c}</h4><div class="pdf-text-block" style="background:transparent; border:none; padding:0; line-height:1.5;">${d.countryNotes[c].text}</div></div>`;
            charsOnPage += textLen;
        });
        if(currentPageHTML) container.insertAdjacentHTML('beforeend', `<div class="pdf-page">${currentPageHTML}</div>`);
    }
    
    const validRoadmap = d.roadmap.filter(r => r.action); const validServices = d.services.filter(s => s.trim());
    if(validRoadmap.length || validServices.length || d.finalCost) {
        let pageFinal = `<div class="pdf-page">`;
        if(validRoadmap.length) {
            pageFinal += `<div class="pdf-block-title" style="margin-top:0;">${SP_ICONS.route} Какой план мы предлагаем</div><div class="pdf-rm-wrap">`;
            validRoadmap.forEach(r => { pageFinal += `<div class="pdf-rm-step"><div class="pdf-rm-date">${formatRoadmapDate(r.date)}</div><div class="pdf-rm-act">${r.action}</div></div>`; });
            pageFinal += `</div>`;
        }
        if(validServices.length || d.finalCost) {
            let marginT = validRoadmap.length ? '30px' : '0';
            pageFinal += `<div class="pdf-block-title" style="margin-top:${marginT};">${SP_ICONS.check} Что делает Смарт Панда</div>`;
            if(validServices.length) {
                pageFinal += `<ul class="pdf-list-green">`;
                validServices.forEach(s => pageFinal += `<li>${s}</li>`);
                pageFinal += `</ul>`;
            }
            if(d.finalCost) pageFinal += `<div style="margin-top:20px; font-size:14px; font-weight:600; color:var(--sp-green);">Итоговая стоимость: ${d.finalCost}</div>`;
        }
        pageFinal += `</div>`; container.insertAdjacentHTML('beforeend', pageFinal);
    }
}

/* --- SELECTION MODE NAVIGATION --- */
SP_APP.selectMode = (m,el) => { 
    state.mode=m; $qAll('.sp-mode-card').forEach(x=>x.classList.remove('active')); el.classList.add('active'); 
    appRoot.querySelector('.sp-step-tag[data-step="3"]').style.display = (m==='unis')?'none':'block'; 
    appRoot.querySelector('.sp-step-tag[data-step="4"]').style.display = (m==='majors')?'none':'block'; 
    appRoot.querySelector('.sp-step-tag[data-step="5"]').style.display = (m==='majors')?'none':'block'; 
};

SP_APP.nextStep = () => {
    let s = parseInt(state.activeSectionId.replace('step-',''));
    if(s===3 && (state.mode === 'full' || state.mode === 'majors') && !state.selected.majors.length) return alert("Выберите специальность");
    let n = s+1; if(state.mode==='unis' && s===2) n=4; if(state.mode==='majors' && s===3) n=6; 
    SP_APP.goTo('step-'+n);
    if(n===5) renderComments(); if(n===6) generateFullPreview();
};

SP_APP.prevStep = () => {
    let s = parseInt(state.activeSectionId.replace('step-',''));
    let p = s-1; if(state.mode==='unis' && s===4) p=2; if(state.mode==='majors' && s===6) p=3; 
    SP_APP.goTo('step-'+p);
};

/* --- MAJORS LOGIC --- */
function setupMajorFilters(){
    const inp=$el('f-major-name'); const sug=$el('suggest-major-name');
    inp.addEventListener('input',()=>{
        filterMajors(true); const v=inp.value.toLowerCase();
        if(v.length>0){
            const matches=Array.from(DB.indices.major_names).filter(n=>n.toLowerCase().includes(v)).slice(0,10);
            sug.innerHTML=matches.map(m=>{ const isSel = state.selected.majors.some(x=>x.name===m); return `<div class="sp-s-item ${isSel?'active-check':''}">${m} ${isSel?'✔':''}</div>` }).join(''); 
            sug.classList.add('show');
        } else sug.classList.remove('show');
    });
    inp.addEventListener('blur',()=>setTimeout(()=>sug.classList.remove('show'),200));
    sug.addEventListener('click',e=>{ if(e.target.classList.contains('sp-s-item')){ inp.value=e.target.childNodes[0].textContent.trim(); filterMajors(true); sug.classList.remove('show'); } });
}
function filterMajors(reset){ const q = $el('f-major-name').value.toLowerCase(); state.currentFilteredMajors = DB.majors.filter(m=>!q || m.name.toLowerCase().includes(q)); if(reset) state.majorsVisible=10; renderMajorsGrid(); }
function renderMajorsGrid(){
    const grid=$el('grid-majors'); const btn=$el('btn-load-more-majors'); grid.innerHTML="";
    if(!state.currentFilteredMajors.length) { grid.innerHTML='<div style="grid-column:1/-1;text-align:center;color:#999;padding:20px;">Ничего не найдено</div>'; btn.style.display='none'; return; }
    state.currentFilteredMajors.slice(0,state.majorsVisible).forEach(m=>{
        const isSel=state.selected.majors.some(x=>x.name===m.name);
        const card=document.createElement('div'); card.className=`sp-major-card ${isSel?'selected':''}`;
        let sub="Нет данных"; if(m.subjects.length){ sub=`<b>Ключевые предметы:</b> ${m.subjects.slice(0,4).join(', ')}...`; } else if(m.desc){ sub = m.desc.substring(0, 80) + "..."; }
        card.innerHTML=`<div class="sp-m-title">${m.name}</div><div class="sp-m-sub">${sub}</div><div style="margin-top:auto; padding-top:15px;"><button class="sp-m-btn ${isSel?'sel':''}" type="button" onclick="event.stopPropagation(); SP_APP.toggleMajor('${m.name}')">${isSel?'✔ Выбрано':'+ Выбрать'}</button></div>`;
        grid.appendChild(card);
    });
    btn.style.display=(state.currentFilteredMajors.length>state.majorsVisible)?'block':'none'; btn.textContent=`Показать ещё (${state.currentFilteredMajors.length-state.majorsVisible})`;
}
SP_APP.loadMoreMajors = ()=>{state.majorsVisible+=10;renderMajorsGrid()};
SP_APP.toggleMajor = (name)=>{
    const idx=state.selected.majors.findIndex(x=>x.name===name);
    if(idx>=0) state.selected.majors.splice(idx,1); else { const obj=DB.majors.find(x=>x.name===name); if(obj)state.selected.majors.push(obj); }
    renderMajorCart(); renderMajorsGrid();
};
function renderMajorCart(){ const c=$el('cart-majors'); c.innerHTML=!state.selected.majors.length?'<div style="font-size:12px;color:#999;align-self:center;">Пока ничего не выбрано</div>':state.selected.majors.map(m=>`<span class="sp-cart-item">${m.name}<button type="button" onclick="event.stopPropagation(); SP_APP.toggleMajor('${m.name}')">✕</button></span>`).join(''); }

/* --- UNIS LOGIC --- */
function setupUniFiltersUI() {
    createCustomDropdown('u-f-country', 'sug-u-country', 'country'); createCustomDropdown('u-f-name', 'sug-u-name', 'name'); 
    createCustomDropdown('u-f-major', 'sug-u-major', 'majors'); createCustomDropdown('u-f-level', 'sug-u-level', 'level');
}
function createCustomDropdown(inputId, sugId, filterKey) {
    const inp = $el(inputId); const sug = $el(sugId);
    const getAvailableOptions = () => {
        const f = DB.unis.filter(u => {
            return (filterKey==='country' || !state.fUni.country.length || state.fUni.country.includes(u.country)) &&
                   (filterKey==='name' || !state.fUni.name.length || state.fUni.name.includes(u.name)) &&
                   (filterKey==='majors' || !state.fUni.majors.length || state.fUni.majors.includes(u.major)) &&
                   (filterKey==='level' || !state.fUni.level.length || state.fUni.level.includes(u.level));
        });
        if (filterKey === 'majors') return f.map(u => ({ val: u.major, tag: u.name })).sort((a,b) => a.val.localeCompare(b.val));
        return Array.from(new Set(f.map(u => u[filterKey]).filter(Boolean))).sort();
    };
    const renderOptions = (ft = "") => {
        const available = getAvailableOptions(); ft = ft.toLowerCase(); let html = "";
        if (filterKey === 'majors') {
            const items = available.filter(i => !ft || i.val.toLowerCase().includes(ft));
            if(!items.length) html = `<div style="padding:10px;color:#999;font-size:12px">Ничего не найдено</div>`;
            else html = items.map(i => `<div class="sp-s-item ${state.fUni.majors.includes(i.val)?'active-check':''}" data-val="${i.val.replace(/"/g, '&quot;')}"><span>${i.val}</span><span class="sp-uni-tag-small">${i.tag}</span></div>`).join('');
        } else {
            const items = available.filter(i => !ft || i.toLowerCase().includes(ft));
            if(!items.length) html = `<div style="padding:10px;color:#999;font-size:12px">Ничего не найдено</div>`;
            else html = items.map(i => `<div class="sp-s-item ${state.fUni[filterKey].includes(i)?'active-check':''}" data-val="${i}">${i} ${state.fUni[filterKey].includes(i)?'✔':''}</div>`).join('');
        }
        sug.innerHTML = html; sug.classList.add('show');
    };
    const open = (e) => { e.stopPropagation(); renderOptions(inp.value); };
    inp.addEventListener('click', open); inp.addEventListener('focus', open); inp.addEventListener('input', () => renderOptions(inp.value));
    sug.addEventListener('click', (e) => {
        e.stopPropagation(); const target = e.target.closest('.sp-s-item');
        if(target && target.dataset.val) {
            const val = target.dataset.val;
            if (!state.fUni[filterKey].includes(val)) { state.fUni[filterKey].push(val); renderUniFilterTags(); }
            inp.value = ""; sug.classList.remove('show'); filterUnis(true);
        }
    });
    document.addEventListener('click', (e) => { if(!inp.contains(e.target) && !sug.contains(e.target)) sug.classList.remove('show'); });
}
function renderUniFilterTags() {
    const c = $el('uni-filter-tags'); let h = "";
    ['country', 'name', 'majors', 'level'].forEach(key => { state.fUni[key].forEach(val => { h += `<span class="sp-f-tag">${val} <button type="button" onclick="event.stopPropagation(); SP_APP.removeUniFilter('${key}', '${val.replace(/'/g,"\\'")}')">×</button></span>`; }); });
    c.innerHTML = h;
}
SP_APP.removeUniFilter = (key, val) => { state.fUni[key] = state.fUni[key].filter(v => v !== val); renderUniFilterTags(); filterUnis(true); };
function filterUnis(reset) {
    const f = state.fUni;
    const res = DB.unis.filter(u => (!f.country.length||f.country.includes(u.country)) && (!f.name.length||f.name.includes(u.name)) && (!f.majors.length||f.majors.includes(u.major)) && (!f.level.length||f.level.includes(u.level)));
    state.currentGroupedUnis = res; if(reset) state.unisVisible = 10;
    const st = $el('uni-results-status'); if(st) st.textContent = `Найдено: ${res.length} программ`;
    renderUniGrid();
}
function renderUniGrid() {
    const grid = $el('grid-unis'); const btn = $el('btn-load-more-unis'); grid.innerHTML = "";
    if(!state.currentGroupedUnis.length) { grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#999;padding:20px;">Ничего не найдено</div>'; btn.style.display='none'; return; }
    state.currentGroupedUnis.slice(0, state.unisVisible).forEach(u => {
        let isSel = false; if(state.selected.countries[u.country]) isSel = state.selected.countries[u.country].schools.some(s => s.name === u.name && s.major === u.major);
        const card = document.createElement('div'); card.className=`sp-uni-card ${isSel?'selected':''}`;
        card.innerHTML = `
            <div class="sp-uni-head">${u.name}</div><div class="sp-uni-meta">${u.country} ${u.city||''}</div>
            <div style="margin:5px 0; display:flex; gap:5px; flex-wrap:wrap"><span class="sp-tag-gray">${u.major}</span><span class="sp-tag-gray">${u.level}</span></div>
            <div style="font-size:11px; margin-top:4px; font-weight:700; color:var(--sp-orange)">${u.cost?'Стоимость: '+u.cost:'Стоимость уточняется'}</div>
            <div style="margin-top:auto"><button class="sp-m-btn ${isSel?'sel':''}" type="button" onclick="event.stopPropagation(); SP_APP.toggleUni('${u.name.replace(/'/g,"\\'")}','${u.country.replace(/'/g,"\\'")}','${u.major.replace(/'/g,"\\'")}')">${isSel?'✔ Выбрано':'+ Добавить'}</button></div>`;
        grid.appendChild(card);
    });
    btn.style.display = (state.currentGroupedUnis.length > state.unisVisible) ? 'block' : 'none'; btn.textContent = `Показать ещё (${state.currentGroupedUnis.length - state.unisVisible})`;
}
SP_APP.loadMoreUnis = () => { state.unisVisible+=10; renderUniGrid(); };

SP_APP.toggleUni = (name, country, major) => {
    if(!state.selected.countries[country]) {
        state.selected.countries[country]={note:"", schools:[]};
        if(!state.selected.countryOrder.includes(country)) state.selected.countryOrder.push(country);
    }
    const cObj = state.selected.countries[country];
    const idx = cObj.schools.findIndex(s => s.name === name && s.major === major);
    if(idx>=0) { 
        cObj.schools.splice(idx,1); 
        if(!cObj.schools.length && !cObj.note) {
            delete state.selected.countries[country];
            state.selected.countryOrder = state.selected.countryOrder.filter(c => c !== country);
        } 
    } 
    else { 
        const full = DB.unis.find(u => u.name === name && u.major === major); 
        if(full) cObj.schools.push({...full, note:"", pageBreak: false, deadline: "", status: "none"}); 
    }
    renderUniCart(); renderUniGrid();
};

function renderUniCart(){
    const cart = $el('cart-unis-preview'); 
    const countries = state.selected.countryOrder;
    if(!countries.length) { cart.innerHTML='<div style="font-size:12px;color:#999;align-self:center;">Пока пусто</div>'; return; }
    
    let html = '';
    countries.forEach(c => {
        if(!state.selected.countries[c]) return;
        state.selected.countries[c].schools.forEach(s => {
            html += `<span class="sp-cart-item">
                ${s.name} <span style="opacity:0.7; font-weight:400; margin-left:3px;">| ${s.major}</span> 
                <button type="button" onclick="event.stopPropagation(); SP_APP.toggleUni('${s.name.replace(/'/g,"\\'")}','${c.replace(/'/g,"\\'")}','${s.major.replace(/'/g,"\\'")}')">✕</button>
            </span>`;
        });
    });
    cart.innerHTML = html;
}

SP_APP.openCustomUniModal = () => {
    $el('c-u-country').value = "";
    $el('c-u-name').value = "";
    $el('c-u-major').value = "";
    $el('c-u-level').value = "";
    $el('c-u-cost').value = "";
    $el('c-u-site').value = "";
    $el('c-u-duration').value = "";
    $el('c-u-scholarship').value = "";
    $el('c-u-deadline-type').value = "rolling";
    $el('c-u-deadline-date-wrap').style.display = "none";
    $el('c-u-deadline-text-wrap').style.display = "none";
    $el('c-u-deadline-date').value = "";
    $el('c-u-deadline-text').value = "";
    $el('c-u-status').value = "none";
    $el('c-u-note-uni').value = "";
    $el('c-u-country-note').value = "";
    
    $el('sp-modal-custom').style.setProperty('display', 'flex', 'important');
};

SP_APP.saveCustomUni = () => {
    const country = $el('c-u-country').value.trim(); 
    const name = $el('c-u-name').value.trim(); 
    const major = $el('c-u-major').value.trim();
    if(!country || !name || !major) return alert("Заполните Страну, Название и Специальность.");
    
    let dType = $el('c-u-deadline-type').value;
    let finalDeadline = "Rolling admission";
    if(dType === 'date') finalDeadline = $el('c-u-deadline-date').value;
    if(dType === 'text') finalDeadline = $el('c-u-deadline-text').value.trim();

    const duration = $el('c-u-duration').value.trim();
    const scholarship = $el('c-u-scholarship').value.trim();
    let uniNote = $el('c-u-note-uni').value.trim();
    
    let combinedNote = "";
    if(duration) combinedNote += `<b>Продолжительность обучения:</b> ${duration}<br>`;
    if(scholarship) combinedNote += `<b>Стипендия:</b> ${scholarship}<br>`;
    if(duration || scholarship) combinedNote += `<br>`;
    combinedNote += uniNote;

    const countryNote = $el('c-u-country-note').value.trim();

    if(!state.selected.countries[country]) {
        state.selected.countries[country] = { note: countryNote, schools: [] };
        if(!state.selected.countryOrder.includes(country)) state.selected.countryOrder.push(country);
    } else {
        if(countryNote && !state.selected.countries[country].note) {
            state.selected.countries[country].note = countryNote;
        }
    }

    const payload = {
        name, country, major, 
        level: $el('c-u-level').value.trim(), 
        cost: $el('c-u-cost').value.trim(), 
        site: $el('c-u-site').value.trim(), 
        duration, scholarship, deadline: finalDeadline, 
        status: $el('c-u-status').value,
        map: "", city: "", 
        note: combinedNote,
        pageBreak: false,
        isCustom: true
    };

    state.selected.countries[country].schools.push(payload);
    
    if(CONFIG.GAS_URL) {
        fetch(CONFIG.GAS_URL, {
            method: 'POST', mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(e => console.log('Apps Script Error', e));
    }
    
    $el('sp-modal-custom').style.setProperty('display', 'none', 'important'); 
    renderUniCart(); 
    filterUnis(true);
};

/* --- COMMENTS & SORTING --- */
function renderComments() {
    const b = $el('comm-major-block');
    b.style.display = (state.mode === 'full' || state.mode === 'majors') && state.selected.majors.length ? 'block' : 'none';
    const con = $el('comments-container'); con.innerHTML="";
    
    // Очистка мертвых стран в order
    state.selected.countryOrder = state.selected.countryOrder.filter(c => state.selected.countries[c]);
    const countries = state.selected.countryOrder;
    
    if(!countries.length && !state.selected.majors.length) { con.innerHTML='<div style="text-align:center;color:#999">Нет выбранных элементов</div>'; return; }
    
    countries.forEach((cName, idx) => {
        const cData = state.selected.countries[cName];
        const uniGroups = {};
        cData.schools.forEach((s, sIdx) => { 
            if(!uniGroups[s.name]) uniGroups[s.name] = { items: [] }; 
            uniGroups[s.name].items.push({ ...s, originalIndex: sIdx }); 
        });
        
        let sh = ""; Object.keys(uniGroups).forEach(uName => {
            let uHtml = `<div style="margin-top:15px; padding-top:15px; border-top:1px dashed #eee;">
                <div style="font-weight:800; font-size:15px; color:var(--sp-dark); margin-bottom:10px;">${SP_ICONS.building} ${uName}</div>`;
            
            uniGroups[uName].items.forEach(pItem => {
                let dTypeHtml = `<select class="sp-select" style="padding:4px 8px; font-size:11px;" onchange="SP_APP.updUniSetting('${cName}', ${pItem.originalIndex}, 'deadlineType', this.value); SP_APP.toggleLocalDeadline('${cName}', ${pItem.originalIndex}, this.value)">
                    <option value="rolling" ${pItem.deadline==='Rolling admission'||!pItem.deadline?'selected':''}>Rolling admission</option>
                    <option value="date" ${pItem.deadline && pItem.deadline!=='Rolling admission'?'selected':''}>Точная дата</option>
                </select>`;
                
                uHtml += `<div style="background:#fdfdfd; border:1px solid #f1f5f9; padding:10px; border-radius:8px; margin-bottom:10px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:8px;">
                        <div style="font-weight:700; font-size:12px; display:flex; align-items:center;">${SP_ICONS.degree} ${pItem.major}</div>
                        <label style="font-size:11px; cursor:pointer; color:var(--sp-violet); font-weight:600; display:flex; align-items:center; gap:4px;">
                            <input type="checkbox" ${pItem.pageBreak ? 'checked' : ''} onchange="SP_APP.updUniSetting('${cName}', ${pItem.originalIndex}, 'pageBreak', this.checked)">
                            ${SP_ICONS.fileBreak} Начать с новой страницы
                        </label>
                    </div>
                    
                    <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:10px; margin-bottom:10px;">
                        <div><div style="font-size:10px; color:#666; margin-bottom:2px;">Тип дедлайна</div>${dTypeHtml}</div>
                        <div id="dl-wrap-${pItem.originalIndex}" style="display:${pItem.deadline && pItem.deadline!=='Rolling admission'?'block':'none'}"><div style="font-size:10px; color:#666; margin-bottom:2px;">Срок (Дата / Текст)</div>
                            <input type="text" class="sp-input" style="padding:4px 8px; font-size:11px;" placeholder="15 января / Date" value="${pItem.deadline==='Rolling admission'?'':(pItem.deadline||'')}" oninput="SP_APP.updUniSetting('${cName}', ${pItem.originalIndex}, 'deadline', this.value)">
                        </div>
                        <div><div style="font-size:10px; color:#666; margin-bottom:2px;">Статус</div>
                            <select class="sp-select" style="padding:4px 8px; font-size:11px;" onchange="SP_APP.updUniSetting('${cName}', ${pItem.originalIndex}, 'status', this.value)">
                                <option value="none" ${pItem.status==='none'?'selected':''}>Без статуса</option>
                                <option value="green" ${pItem.status==='green'?'selected':''}>🟢 Успеваем</option>
                                <option value="yellow" ${pItem.status==='yellow'?'selected':''}>🟡 Срочно</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style="font-size:11px; color:#334155; font-weight:600; margin-bottom:4px;">Комментарий к ВУЗу/Программе:</div>
                    <div class="sp-editor-toolbar"><div style="display:flex; gap:6px;"><button type="button" class="sp-editor-btn" onclick="SP_APP.execCmd('bold')"><b>B</b></button><button type="button" class="sp-editor-btn" onclick="SP_APP.execCmd('italic')"><i>I</i></button><button type="button" class="sp-editor-btn" onclick="SP_APP.execCmd('insertUnorderedList')">• Список</button></div></div>
                    <div contenteditable="true" class="sp-editor" style="min-height:60px" data-placeholder="Напишите особенности..." oninput="SP_APP.updUniSetting('${cName}', ${pItem.originalIndex}, 'note', this.innerHTML)">${pItem.note||''}</div>
                </div>`;
            });
            sh += uHtml + `</div>`;
        });
        
        const div = document.createElement('div'); 
        div.className = "sp-country-group-wrap";
        div.setAttribute('data-country', cName);
        div.setAttribute('draggable', 'true');
        
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragover', handleDragOver);
        div.addEventListener('dragenter', handleDragEnter);
        div.addEventListener('dragleave', handleDragLeave);
        div.addEventListener('drop', handleDrop);
        div.addEventListener('dragend', handleDragEnd);

        div.innerHTML = `<div style="background:#f0f4f8; padding:12px 16px; border-bottom:1px solid #e5e7eb; display:flex; justify-content:space-between; align-items:center; border-radius: 8px 8px 0 0;">
            <div style="display:flex; align-items:center;">
                <span class="sp-sortable-handle" title="Потяните для сортировки">${SP_ICONS.grip}</span>
                <span style="font-weight:700; font-size:16px;">${cName}</span>
            </div>
            <div style="display:flex; gap:4px;">
                <button class="sp-sort-btn" onclick="SP_APP.moveCountry(${idx}, -1)" title="Вверх">${SP_ICONS.arrowUp}</button>
                <button class="sp-sort-btn" onclick="SP_APP.moveCountry(${idx}, 1)" title="Вниз">${SP_ICONS.arrowDown}</button>
            </div>
        </div>
        <div style="padding:16px; border:1px solid #e2e8f0; border-top:none; border-radius: 0 0 8px 8px;">
            <div style="font-size:11px; color:#334155; font-weight:600; margin-bottom:4px;">Общий комментарий по Стране:</div>
            <div class="sp-editor-toolbar"><div style="display:flex; gap:6px;"><button type="button" class="sp-editor-btn" onclick="SP_APP.execCmd('bold')"><b>B</b></button><button type="button" class="sp-editor-btn" onclick="SP_APP.execCmd('italic')"><i>I</i></button><button type="button" class="sp-editor-btn" onclick="SP_APP.execCmd('insertUnorderedList')">• Список</button></div></div>
            <div contenteditable="true" class="sp-editor" style="min-height:60px" data-placeholder="Вводная часть по стране..." oninput="SP_APP.updCountryNote('${cName}', this.innerHTML)">${cData.note||''}</div>
            ${sh}
        </div>`;
        con.appendChild(div);
    });
}

// Drag & Drop Logic
let dragSrcEl = null;
function handleDragStart(e) { dragSrcEl = this; e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', this.dataset.country); this.classList.add('dragging'); }
function handleDragOver(e) { if (e.preventDefault) { e.preventDefault(); } e.dataTransfer.dropEffect = 'move'; return false; }
function handleDragEnter(e) { this.classList.add('over'); }
function handleDragLeave(e) { this.classList.remove('over'); }
function handleDrop(e) {
    if (e.stopPropagation) { e.stopPropagation(); }
    if (dragSrcEl !== this) {
        const srcCountry = dragSrcEl.dataset.country;
        const tgtCountry = this.dataset.country;
        const arr = state.selected.countryOrder;
        const srcIdx = arr.indexOf(srcCountry);
        const tgtIdx = arr.indexOf(tgtCountry);
        arr.splice(srcIdx, 1);
        arr.splice(tgtIdx, 0, srcCountry);
        renderComments();
    }
    return false;
}
function handleDragEnd(e) { this.classList.remove('dragging'); $qAll('.sp-country-group-wrap').forEach(el => el.classList.remove('over')); }

SP_APP.moveCountry = (idx, dir) => {
    const arr = state.selected.countryOrder;
    if (idx + dir < 0 || idx + dir >= arr.length) return;
    const temp = arr[idx];
    arr[idx] = arr[idx + dir];
    arr[idx + dir] = temp;
    renderComments();
};

SP_APP.updateMajorComment = (el) => state.selected.majorComment = el.innerHTML; 
SP_APP.updCountryNote = (c,v) => { if(state.selected.countries[c]) state.selected.countries[c].note=v; };
SP_APP.updUniSetting = (cName, sIdx, field, val) => {
    if(state.selected.countries[cName] && state.selected.countries[cName].schools[sIdx]) {
        state.selected.countries[cName].schools[sIdx][field] = val;
    }
};
SP_APP.toggleLocalDeadline = (cName, sIdx, type) => {
    const wrap = $el(`dl-wrap-${sIdx}`);
    if(!wrap) return;
    if(type === 'date') {
        wrap.style.display = 'block';
    } else {
        wrap.style.display = 'none';
        SP_APP.updUniSetting(cName, sIdx, 'deadline', 'Rolling admission');
    }
};

/* --- FINAL PDF --- */
function generateFullPreview() {
    const area = $el('print-area'); area.innerHTML="";
    
    if (state.hasDossier) { generateDossierHTML(area); }

    if (state.mode !== 'dossier_only' && (state.selected.majors.length || state.selected.countryOrder.length)) {
        const cover = document.createElement('div'); 
        cover.className = 'pdf-page';
        
        let sub = "Университеты и Профессии"; if(state.mode === 'majors') sub = "Анализ специальностей"; if(state.mode === 'unis') sub = "Подборка университетов";
        
        cover.innerHTML = `
        <div style="padding-top: 380px; text-align: center; width: 100%; box-sizing: border-box;">
            <div style="font-size:12px; border:1px solid var(--sp-dark); color:var(--sp-dark); padding:3px 10px; border-radius:20px; margin-bottom:15px; display:inline-block; font-weight:600">Смарт Панда</div>
            <h1 style="font-size:32px; margin:0 0 12px; line-height:1.1; color:var(--sp-dark);">Стратегия поступления</h1>
            <div style="font-size:16px; margin-bottom:20px; color:#666;">${sub}</div>
            <h2 style="font-size:18px; font-weight:400; margin:0; color:var(--sp-dark);">Студент: <strong style="font-weight:600">${state.studentName}</strong></h2>
        </div>`;
        area.appendChild(cover);
    }

    if (state.mode !== 'unis' && state.selected.majors.length) {
        let firstPageHtml = "";
        if(state.selected.majorComment) {
            firstPageHtml += `<div class="pdf-block-title" style="margin-top:0;">${SP_ICONS.message} Общий комментарий к направлениям</div><div class="pdf-text-block" style="margin-bottom:20px;">${state.selected.majorComment}</div>`;
        }
        
        state.selected.majors.forEach((m, mIdx) => {
            const p = document.createElement('div'); p.className='pdf-page';
            const renderPList = (i) => `<ul class="pdf-list-purple">${i.map(x=>`<li>${x}</li>`).join('')}</ul>`;
            const renderGList = (i) => `<ul class="pdf-list-green">${i.map(x=>`<li>${x}</li>`).join('')}</ul>`;
            
            let html = mIdx === 0 ? firstPageHtml : "";
            html += `<div class="pdf-h1">${m.name}</div><div class="pdf-desc">${m.desc||''}</div>`;
            if(m.subtypes.length) html += `<div class="pdf-block-title">${SP_ICONS.subtypes} Разделяются на:</div>${renderPList(m.subtypes)}`;
            if(m.subjects.length) html += `<div class="pdf-block-title">${SP_ICONS.subjects} Предметы</div>${renderGList(m.subjects)}`;
            if(m.practice) html += `<div class="pdf-block-title">${SP_ICONS.practice} Практика</div><div class="pdf-text-block">${m.practice}</div>`;
            if(m.career.length) html += `<div class="pdf-block-title">${SP_ICONS.career} Карьера</div>${renderPList(m.career)}`;
            if(m.masters.length) html += `<div class="pdf-block-title">${SP_ICONS.masters} Магистратура</div><div class="sp-grid-2" style="margin-bottom:0">${renderGList(m.masters)}</div>`;
            if(m.trajectory.length) html += `<div class="pdf-block-title">${SP_ICONS.trajectory} Траектории</div><div class="pdf-timeline">${m.trajectory.map(x=>`<div class="pdf-tl-item">${x}</div>`).join('')}</div>`;
            if(m.focus) html += `<div class="pdf-block-title">${SP_ICONS.focus} Фокус</div><div class="pdf-text-block">${m.focus}</div>`;
            p.innerHTML = html; area.appendChild(p);
        });
    }

    if (state.mode !== 'majors' && state.selected.countryOrder.length) {
        state.selected.countryOrder.forEach((cName, cIdx) => {
            const cObj = state.selected.countries[cName];
            if(!cObj) return;

            let uPage = document.createElement('div'); uPage.className='pdf-page';
            let uPageInner = "";
            let isFirstForCountry = true;
            
            const startNewPage = () => {
                uPage.innerHTML = uPageInner; area.appendChild(uPage);
                uPage = document.createElement('div'); uPage.className='pdf-page';
                uPageInner = ""; isFirstForCountry = false;
            };

            const addHeader = () => {
                let docHeader = isFirstForCountry ? 'Рекомендуемые учебные заведения' : 'Рекомендуемые учебные заведения (продолжение)';
                uPageInner += `<div class="pdf-h1" style="font-size: 18px; color: var(--sp-dark); border-bottom: 2px solid var(--sp-violet); padding-bottom: 8px; margin-bottom: 15px;">${docHeader}</div>`;
                uPageInner += `<div class="pdf-block-title" style="margin-top:0;">${SP_ICONS.globe} Страна: ${cName}</div>`;
                if(isFirstForCountry && cObj.note) {
                    uPageInner += `<div class="pdf-text-block" style="margin-bottom: 15px;"><strong>Комментарий по стране:</strong><br>${cObj.note}</div>`;
                }
            };
            
            addHeader();

            const uniGroups = {}; cObj.schools.forEach(s => { if(!uniGroups[s.name]) uniGroups[s.name] = { items: [] }; uniGroups[s.name].items.push(s); });
            let uKeys = Object.keys(uniGroups);
            
            let uniCounter = 0;
            
            uKeys.forEach(uName => {
                const group = uniGroups[uName]; 
                const first = group.items[0]; 
                
                let forceBreak = group.items.some(x => x.pageBreak);
                if (forceBreak || uniCounter >= 4) {
                    startNewPage();
                    addHeader();
                    uniCounter = 0;
                }
                
                let progsHtml = ""; 
                group.items.forEach(pItem => { 
                    let statusHtml = "";
                    if(pItem.status === 'green') statusHtml = `<span class="sp-status-tag sp-status-green">🟢 Успеваем</span>`;
                    if(pItem.status === 'yellow') statusHtml = `<span class="sp-status-tag sp-status-yellow">🟡 Срочно</span>`;
                    
                    let dlText = pItem.deadline;
                    if(dlText && dlText.includes('-') && !dlText.includes(' ')) dlText = formatDateRu(dlText); 
                    
                    let deadlineLineHtml = "";
                    if(dlText || statusHtml) {
                        deadlineLineHtml = `<div style="font-size:10px; color:#475569; display:flex; gap:10px; align-items:center; margin-top:6px; padding-top:6px; border-top:1px dashed #e2e8f0;">
                            ${statusHtml} ${dlText ? `<span style="display:flex; align-items:center; gap:4px;">${SP_ICONS.clock} Дедлайн: <b>${dlText}</b></span>` : ''}
                        </div>`;
                    }

                    progsHtml += `<div style="background: #fdfdfd; border: 1px solid #f1f5f9; border-radius: 6px; padding: 8px 12px; margin-top: 6px;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                            <div style="color: var(--sp-dark); font-weight: 700; font-size: 11px; display:flex; align-items:flex-start; line-height:1.3; max-width: 80%;">
                                <div style="flex-shrink:0; margin-top:1px;">${SP_ICONS.degree}</div>
                                <div>${pItem.major}</div>
                            </div>
                            ${pItem.site ? `<a href="${pItem.site}" style="color:var(--sp-violet); text-decoration:none; display:flex; align-items:center; font-size:10px; font-weight:600; flex-shrink:0; padding-left:10px;">${SP_ICONS.link} Сайт</a>` : ''}
                        </div>
                        <div style="font-size: 10px; color: #475569; display:flex; justify-content:space-between; align-items:center; margin-left: 18px;">
                            <span>${pItem.level}</span>
                            <span style="font-weight:600; color:var(--sp-orange);">${pItem.cost || 'По запросу'}</span>
                        </div>
                        ${deadlineLineHtml}
                        ${pItem.note ? `<div style="font-size:9px; background:#f8fafc; border-left:3px solid var(--sp-violet); padding:6px 10px; margin-top:8px; color:#334155; line-height:1.4; white-space:pre-wrap;">${pItem.note}</div>` : ''}
                    </div>`; 
                });
                
                uPageInner += `
                <div class="pdf-uni-card" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; border-bottom: 1px dashed #f0f0f0; padding-bottom: 10px;">
                        <div style="width:100%">
                            <div style="font-weight: 800; font-size: 14px; color: var(--sp-dark); display:flex; align-items:center;">
                                ${SP_ICONS.building} ${uName}
                            </div>
                            <div style="font-size: 10px; color: #666; margin-top: 6px; display:flex; gap:12px; align-items:center;">
                                <span style="display:flex; align-items:center;">${SP_ICONS.mapPin} ${first.country} ${first.city ? ', ' + first.city : ''}</span>
                                ${first.map ? `<a href="${first.map}" style="color:var(--sp-violet); text-decoration:none; display:flex; align-items:center;">${SP_ICONS.globe} Локация</a>` : ''}
                            </div>
                        </div>
                    </div>
                    <div style="display:flex; flex-direction: column;">
                        ${progsHtml}
                    </div>
                </div>`;
                uniCounter++;
            });
            
            if(uPageInner) { uPage.innerHTML = uPageInner; area.appendChild(uPage); }
        });
    }
}

async function processPDFDownload(fileName, rootElementId, event) {
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Формирование PDF... <span style="display:inline-block; animation:spin 1s linear infinite">⏳</span>';
    btn.disabled = true;

    try {
        const pages = $el(rootElementId).querySelectorAll('.pdf-page'); 
        if(!pages.length) return;
        
        const { jsPDF } = window.jspdf; 
        const pdf = new jsPDF('p', 'pt', 'a4'); 
        const pdfWidth = 595.28; 
        const pdfHeight = 841.89;
        
        let isFirstPage = true;
        
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            
            await new Promise(r => setTimeout(r, 50));
            
            const canvas = await html2canvas(page, { scale: 2, useCORS: true, logging: false });
            
            if (canvas.width === 0 || canvas.height === 0) continue;
            
            const imgData = canvas.toDataURL('image/jpeg', 0.95); 
            const imgH = (canvas.height * pdfWidth) / canvas.width;
            
            let heightLeft = imgH;
            let position = 0;
            
            if (!isFirstPage) pdf.addPage();
            isFirstPage = false;
            
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgH);
            
            const addLinksToPDF = (currentPos) => {
                const pageRect = page.getBoundingClientRect();
                const links = page.querySelectorAll('a');
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href) {
                        const rect = link.getBoundingClientRect();
                        const left = ((rect.left - pageRect.left) / pageRect.width) * pdfWidth;
                        const top = ((rect.top - pageRect.top) / pageRect.height) * imgH;
                        const width = (rect.width / pageRect.width) * pdfWidth;
                        const height = (rect.height / pageRect.height) * imgH;
                        const linkY = top + currentPos;
                        if (linkY + height > 0 && linkY < pdfHeight) {
                            pdf.link(left, linkY, width, height, { url: href });
                        }
                    }
                });
            };
            
            addLinksToPDF(position);
            heightLeft -= pdfHeight;
            
            while (heightLeft > 5) { 
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgH);
                addLinksToPDF(position);
                heightLeft -= pdfHeight;
            }
        }
        
        pdf.save(fileName);
        
    } catch (err) {
        console.error('Ошибка при создании PDF:', err);
        alert('Произошла ошибка при формировании PDF. Пожалуйста, попробуйте еще раз.');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

SP_APP.downloadDossierOnly = (e) => { processPDFDownload(`Отчет_${state.studentName}.pdf`, 'dossier-print-area', e); };
SP_APP.downloadPDF = (e) => { processPDFDownload(`Стратегия_поступления_${state.studentName}.pdf`, 'print-area', e); };

init();
})();
