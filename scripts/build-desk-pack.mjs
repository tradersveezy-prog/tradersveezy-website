/**
 * Builds branded Course 05 Excel desk files (CSV can't hold color/borders).
 * Run: node scripts/build-desk-pack.mjs
 */
import ExcelJS from 'exceljs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../public/curriculum/05')

const INK = '060606'
const PANEL = '0B0B0B'
const GRAPHITE = '161513'
const BONE = 'F2F1EE'
const GOLD = 'E3B44A'
const DEEP = 'C9922F'
const MUTED = 'A9A59D'
const SOFT = 'D8D4CC'
const LONG = '4FB286'
const SHORT = 'D9533B'

const PHRASE = "You can't regret a well thought out plan."

const CHECKLIST = [
  ['01', '01', 'Can I name what the chart is doing in one sentence (trend / range / flip)?'],
  ['02', '01', 'Am I using a higher timeframe for context and a lower one for the entry?'],
  ['03', '01', 'Am I reading buyers and sellers - not drawing random lines?'],
  ['04', '02', 'Is the level clear in about 15 seconds? If not I skip.'],
  ['05', '02', 'Does the level have proof (touches / EMAs / value) - not a Fib alone?'],
  ['06', '03', 'Is my entry type clear (retest / EMA reclaim / breakout)?'],
  ['07', '03', 'Am I waiting for the full trigger - not the first break alone?'],
  ['08', '03', 'Do I have a hard stop written down?'],
  ['09', '04', 'Is the stop past the level that kills the idea?'],
  ['10', '04', 'Does ATR say the stop is not too tight and not crazy wide?'],
  ['11', '04', 'Is reward worth the risk (about 1.5R or better)?'],
  ['12', '04', 'Is size based on dollars I can lose - not a guess?'],
  ['13', '05', 'Did I check news / events that could wreck a clean chart?'],
  ['14', '05', `Can I say: ${PHRASE}`],
  ['15', '05', 'If any answer is No - I stay out.'],
]

const RULES = [
  ['01', 'Trend', 'Higher highs and lows; for a long stay above 21 / 55 / 200 on the entry TF', 'Wait forever for a perfect fill on a strong day'],
  ['01', 'Range', 'Trade the edges of value - especially a VAL reclaim', 'Chop the middle of value for no reason'],
  ['01', 'Flip', 'Break then close back; wait for a few confirms', 'Size up on the first reclaim candle'],
  ['02', 'Levels', 'Clear in about 15 seconds or skip', 'Invent levels that need a long story'],
  ['02', 'Proof', 'Stack EMAs / magnets / value; Fib only with other proof', 'Treat a lone Fib as a real level'],
  ['03', 'Retest', 'Break with closes then enter on the revisit', 'Call every dip a retest'],
  ['03', 'EMA reclaim', 'Strong push through then 2-3 holding closes', 'Enter on one wick'],
  ['03', 'Breakout', 'Rejects then break then sweep then reclaim', 'Enter the first break alone'],
  ['03', 'Stops', 'Hard stops; watch news', 'Soft stops or chase past your plan'],
  ['04', 'Stop', 'Stop past the level that kills the idea', 'Pick a random % stop'],
  ['04', 'ATR', 'Use ATR to check stop distance vs noise', 'Ignore the chart and only use 1x ATR'],
  ['04', 'Size', 'Size = dollars you can lose / stop distance', 'Revenge size or widen the stop to keep size'],
  ['05', 'Habits', "If you can't name the chart stay out", 'Force a trade to feel busy'],
  ['05', 'Review', 'Short review after a loss before the next risk', 'Bury losers and move on'],
  ['05', 'Line', PHRASE, 'Educational only - not financial advice'],
]

const JOURNAL_HEADERS = [
  'Date',
  'Pair',
  'Side',
  'Higher TF',
  'Entry TF',
  'Structure',
  'Level',
  'Entry type',
  'Entry',
  'Stop',
  'Target',
  'R:R',
  'Account $',
  'Risk %',
  'Size',
  'ATR note',
  'Checklist?',
  'Result',
  'R',
  'P&L $',
  'Plan followed?',
  'What worked',
  'What I broke',
  'Lesson',
  'Chart link',
]

const LOSS_HEADERS = [
  'Date',
  'Pair',
  'Idea in one line',
  'Stop (invalidation)',
  'Hard stop hit?',
  'Stop from structure?',
  'Moved stop farther?',
  'Sized up to get it back?',
  'Checklist done first?',
  'Rule broken (or none)',
  'Mistake or bad beat?',
  'Mood before 1-5',
  'Mood after 1-5',
  'Next time',
  'Rule to keep',
  'Done?',
]

const WEEKLY_HEADERS = [
  'Week of',
  'Trades',
  'Good skips',
  'Win %',
  'Avg R',
  'Best trade',
  'Worst slip',
  'Checklist %',
  'Revenge / moved stop',
  'Review time',
  'Keep',
  'Stop doing',
  'Energy 1-5',
  'Notes',
]

function thinBorder(color = DEEP) {
  const edge = { style: 'thin', color: { argb: `FF${color}` } }
  return { top: edge, left: edge, bottom: edge, right: edge }
}

function styleTitle(row, cols, subtitle) {
  row.height = 28
  const cell = row.getCell(1)
  cell.value = 'TRADERSVEEZY'
  cell.font = { name: 'Arial Black', size: 16, bold: true, color: { argb: `FF${GOLD}` } }
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${INK}` } }
  cell.alignment = { vertical: 'middle', horizontal: 'left' }
  for (let c = 1; c <= cols; c++) {
    const x = row.getCell(c)
    x.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${INK}` } }
    x.border = thinBorder(GOLD)
  }
  if (cols >= 2) {
    row.getCell(2).value = subtitle
    row.getCell(2).font = {
      name: 'Arial',
      size: 11,
      bold: true,
      color: { argb: `FF${BONE}` },
    }
    row.getCell(2).alignment = { vertical: 'middle', horizontal: 'left' }
  }
}

function styleBanner(row, cols, text) {
  row.height = 20
  for (let c = 1; c <= cols; c++) {
    const x = row.getCell(c)
    x.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${GRAPHITE}` } }
    x.border = thinBorder(DEEP)
    x.font = { name: 'Arial', size: 9, color: { argb: `FF${MUTED}` } }
  }
  row.getCell(1).value = text
  if (cols > 1) row.getCell(1).alignment = { vertical: 'middle' }
}

function styleHeader(row, headers) {
  row.height = 26
  headers.forEach((h, i) => {
    const cell = row.getCell(i + 1)
    cell.value = h
    cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: `FF${INK}` } }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${GOLD}` } }
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    cell.border = thinBorder(INK)
  })
}

function styleDataRow(row, cols, stripe) {
  row.height = 22
  for (let c = 1; c <= cols; c++) {
    const cell = row.getCell(c)
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: stripe ? `FF${BONE}` : 'FFFFFFFF' },
    }
    cell.border = thinBorder('D9D4C8')
    cell.font = { name: 'Arial', size: 10, color: { argb: `FF${INK}` } }
    cell.alignment = { vertical: 'middle', wrapText: true }
  }
}

function addYesNo(sheet, col, fromRow, toRow) {
  for (let r = fromRow; r <= toRow; r++) {
    sheet.getCell(r, col).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Yes,No"'],
      showErrorMessage: true,
      errorTitle: 'Pick Yes or No',
      error: 'Use the dropdown.',
    }
  }
}

function setWidths(sheet, widths) {
  widths.forEach((w, i) => {
    sheet.getColumn(i + 1).width = w
  })
}

function decorateSheet(sheet, tabColor = GOLD) {
  sheet.properties.tabColor = { argb: `FF${tabColor}` }
  sheet.views = [{ state: 'frozen', ySplit: 3, activeCell: 'A4', showGridLines: false }]
}

async function buildChecklist(wb) {
  const sheet = wb.addWorksheet('Checklist', { properties: { defaultRowHeight: 20 } })
  decorateSheet(sheet, GOLD)
  const cols = 5
  styleTitle(sheet.getRow(1), cols, 'COURSE 05 · BEFORE-TRADE CHECKLIST')
  styleBanner(sheet.getRow(2), cols, 'One No = no trade · Educational only · Not financial advice · @tradersveezy')
  styleHeader(sheet.getRow(3), ['#', 'Course', 'Check', 'Yes / No', 'Notes'])
  setWidths(sheet, [6, 10, 72, 12, 28])

  CHECKLIST.forEach((row, i) => {
    const r = sheet.getRow(4 + i)
    styleDataRow(r, cols, i % 2 === 0)
    r.getCell(1).value = row[0]
    r.getCell(1).font = { name: 'Arial', size: 10, bold: true, color: { argb: `FF${DEEP}` } }
    r.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' }
    r.getCell(2).value = `C${row[1]}`
    r.getCell(2).font = { name: 'Arial', size: 10, bold: true, color: { argb: `FF${GOLD}` } }
    r.getCell(2).alignment = { vertical: 'middle', horizontal: 'center' }
    r.getCell(2).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: `FF${INK}` },
    }
    r.getCell(3).value = row[2]
    r.getCell(4).alignment = { vertical: 'middle', horizontal: 'center' }
    r.height = 28
  })
  addYesNo(sheet, 4, 4, 4 + CHECKLIST.length - 1)

  const foot = sheet.getRow(4 + CHECKLIST.length)
  styleBanner(foot, cols, `Line: ${PHRASE}`)
  try {
    sheet.mergeCells(1, 2, 1, cols)
    sheet.mergeCells(2, 1, 2, cols)
    sheet.mergeCells(foot.number, 1, foot.number, cols)
  } catch {
    /* already merged */
  }
}

async function buildRules(wb) {
  const sheet = wb.addWorksheet('Rules', { properties: { defaultRowHeight: 20 } })
  decorateSheet(sheet, DEEP)
  const cols = 4
  styleTitle(sheet.getRow(1), cols, 'COURSE 05 · PLAYBOOK RULES')
  styleBanner(sheet.getRow(2), cols, 'Do this / don’t · Pin beside the desk · Educational only · Not financial advice')
  styleHeader(sheet.getRow(3), ['Course', 'Theme', 'Do this', "Don't"])
  setWidths(sheet, [10, 14, 55, 42])

  RULES.forEach((row, i) => {
    const r = sheet.getRow(4 + i)
    styleDataRow(r, cols, i % 2 === 0)
    r.getCell(1).value = row[0]
    r.getCell(1).font = { name: 'Arial', size: 11, bold: true, color: { argb: `FF${GOLD}` } }
    r.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${INK}` } }
    r.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' }
    r.getCell(2).value = row[1]
    r.getCell(2).font = { name: 'Arial', size: 10, bold: true, color: { argb: `FF${INK}` } }
    r.getCell(3).value = row[2]
    r.getCell(4).value = row[3]
    r.getCell(4).font = { name: 'Arial', size: 10, color: { argb: `FF${SHORT}` } }
    r.height = 32
  })
}

/** Daily account / P&L tracker — styled version of the user's balance goal sheet. */
async function buildDailyTracker(wb) {
  const sheet = wb.addWorksheet('Daily P&L', { properties: { defaultRowHeight: 22 } })
  sheet.properties.tabColor = { argb: `FF${LONG}` }
  sheet.views = [{ state: 'frozen', ySplit: 3, xSplit: 0, activeCell: 'C4', showGridLines: false }]

  const headers = [
    'Date',
    'Starting balance',
    'Ending balance',
    'Daily account goal',
    'Profit %',
    'Daily P&L',
    'Daily goal $',
    'Beat goal by',
    'Notes',
  ]
  const cols = headers.length

  styleTitle(sheet.getRow(1), cols, 'COURSE 05 · DAILY P&L TRACKER')
  styleBanner(
    sheet.getRow(2),
    cols,
    'Set goal % + start balance on the right · Enter date + ending balance each day · Educational only · Not financial advice',
  )
  styleHeader(sheet.getRow(3), headers)
  setWidths(sheet, [12, 15, 15, 16, 11, 12, 12, 12, 28])

  // Settings panel (columns K–M)
  const labelFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${INK}` } }
  const valueFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${BONE}` } }
  const goldFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${GOLD}` } }

  function sideLabel(r, c, text) {
    const cell = sheet.getCell(r, c)
    cell.value = text
    cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: `FF${GOLD}` } }
    cell.fill = labelFill
    cell.border = thinBorder(GOLD)
    cell.alignment = { vertical: 'middle', horizontal: 'left' }
  }
  function sideValue(r, c, value, numFmt) {
    const cell = sheet.getCell(r, c)
    cell.value = value
    cell.font = { name: 'Arial', size: 12, bold: true, color: { argb: `FF${INK}` } }
    cell.fill = valueFill
    cell.border = thinBorder(GOLD)
    cell.alignment = { vertical: 'middle', horizontal: 'center' }
    if (numFmt) cell.numFmt = numFmt
  }

  sheet.getColumn(11).width = 18
  sheet.getColumn(12).width = 14
  sheet.getColumn(13).width = 16
  sheet.getColumn(14).width = 22

  // K1–L1 brand chip
  sheet.mergeCells(1, 11, 1, 12)
  sheet.getCell(1, 11).value = 'GOAL SETTINGS'
  sheet.getCell(1, 11).font = { name: 'Arial Black', size: 11, color: { argb: `FF${INK}` } }
  sheet.getCell(1, 11).fill = goldFill
  sheet.getCell(1, 11).alignment = { vertical: 'middle', horizontal: 'center' }
  sheet.getCell(1, 12).fill = goldFill
  sheet.getCell(1, 11).border = thinBorder(INK)
  sheet.getCell(1, 12).border = thinBorder(INK)

  sideLabel(2, 11, 'Daily profit goal')
  sideValue(2, 12, 0.02, '0.0%')
  sideLabel(3, 11, 'Starting balance')
  sideValue(3, 12, 1000, '"$"#,##0.00')

  sideLabel(5, 11, 'Total P&L')
  sideValue(5, 12, { formula: 'SUMIF(F4:F63,"<>")' }, '"$"#,##0.00')
  sheet.getCell(5, 12).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${LONG}` } }
  sheet.getCell(5, 12).font = { name: 'Arial', size: 12, bold: true, color: { argb: `FF${INK}` } }

  sideLabel(6, 11, 'Avg daily P&L')
  sideValue(6, 12, { formula: 'IFERROR(AVERAGEIF(F4:F63,"<>"),0)' }, '"$"#,##0.00')

  sideLabel(7, 11, 'Days logged')
  sideValue(7, 12, { formula: 'COUNTA(A4:A63)' }, '0')

  sideLabel(8, 11, 'Days beat goal')
  sideValue(8, 12, { formula: 'COUNTIF(H4:H63,">0")' }, '0')

  // Expected compound path
  sheet.mergeCells(10, 11, 10, 12)
  sheet.getCell(10, 11).value = 'EXPECTED PATH'
  sheet.getCell(10, 11).font = { name: 'Arial', size: 9, bold: true, color: { argb: `FF${INK}` } }
  sheet.getCell(10, 11).fill = goldFill
  sheet.getCell(10, 11).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell(10, 12).fill = goldFill
  sheet.getCell(10, 11).border = thinBorder(INK)
  sheet.getCell(10, 12).border = thinBorder(INK)

  sideLabel(11, 11, 'Day')
  sheet.getCell(11, 12).value = 'Target balance'
  sheet.getCell(11, 12).font = { name: 'Arial', size: 9, bold: true, color: { argb: `FF${INK}` } }
  sheet.getCell(11, 12).fill = goldFill
  sheet.getCell(11, 12).border = thinBorder(INK)
  sheet.getCell(11, 12).alignment = { horizontal: 'center', vertical: 'middle' }

  for (let d = 1; d <= 20; d++) {
    const r = 11 + d
    const dayCell = sheet.getCell(r, 11)
    dayCell.value = d
    dayCell.font = { name: 'Arial', size: 9, color: { argb: `FF${MUTED}` } }
    dayCell.fill = labelFill
    dayCell.border = thinBorder(DEEP)
    dayCell.alignment = { horizontal: 'center', vertical: 'middle' }

    const bal = sheet.getCell(r, 12)
    // Compound from settings start: L3 * (1+L2)^d
    bal.value = { formula: `$L$3*((1+$L$2)^${d})` }
    bal.numFmt = '"$"#,##0.00'
    bal.font = { name: 'Arial', size: 9, color: { argb: `FF${INK}` } }
    bal.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: d % 2 ? `FF${BONE}` : 'FFFFFFFF' } }
    bal.border = thinBorder('D9D4C8')
    bal.alignment = { horizontal: 'right', vertical: 'middle' }
  }

  sheet.getCell(1, 14).value = 'TRADE NOTES'
  sheet.getCell(1, 14).font = { name: 'Arial', size: 9, bold: true, color: { argb: `FF${INK}` } }
  sheet.getCell(1, 14).fill = goldFill
  sheet.getCell(1, 14).border = thinBorder(INK)
  sheet.getCell(1, 14).alignment = { horizontal: 'center' }
  for (let r = 2; r <= 12; r++) {
    const n = sheet.getCell(r, 14)
    n.fill = valueFill
    n.border = thinBorder('D9D4C8')
  }

  const rows = 40
  for (let i = 0; i < rows; i++) {
    const r = 4 + i
    const row = sheet.getRow(r)
    styleDataRow(row, cols, i % 2 === 0)
    row.height = 24

    // Starting balance: first day from settings; then previous ending
    if (i === 0) {
      row.getCell(2).value = { formula: 'IF($L$3="","",$L$3)' }
    } else {
      row.getCell(2).value = { formula: `IF(C${r - 1}="","",C${r - 1})` }
    }
    row.getCell(2).numFmt = '"$"#,##0.00'

    // Daily account goal = start * (1 + goal%)
    row.getCell(4).value = { formula: `IF(B${r}="","",B${r}*(1+$L$2))` }
    row.getCell(4).numFmt = '"$"#,##0.00'
    row.getCell(4).font = { name: 'Arial', size: 10, color: { argb: `FF${DEEP}` } }

    // Profit %
    row.getCell(5).value = { formula: `IF(OR(B${r}="",C${r}=""),"",(C${r}-B${r})/B${r})` }
    row.getCell(5).numFmt = '0.00%'

    // Daily P&L
    row.getCell(6).value = { formula: `IF(OR(B${r}="",C${r}=""),"",C${r}-B${r})` }
    row.getCell(6).numFmt = '"$"#,##0.00'

    // Daily goal $
    row.getCell(7).value = { formula: `IF(B${r}="","",B${r}*$L$2)` }
    row.getCell(7).numFmt = '"$"#,##0.00'

    // Beat goal by
    row.getCell(8).value = { formula: `IF(OR(B${r}="",C${r}=""),"",F${r}-G${r})` }
    row.getCell(8).numFmt = '"$"#,##0.00'

    row.getCell(3).numFmt = '"$"#,##0.00'
    row.getCell(3).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: `FF${GOLD}` },
    }
    row.getCell(3).font = { name: 'Arial', size: 10, bold: true, color: { argb: `FF${INK}` } }

    // Conditional-ish highlight via font on P&L / beat columns (ExcelJS full CF is heavy; tint cells)
    row.getCell(6).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: i % 2 ? 'FFE8F5EF' : 'FFF1FAF5' },
    }
  }

  // Sample day 1 so the sheet isn't empty on open
  sheet.getCell(4, 1).value = new Date()
  sheet.getCell(4, 1).numFmt = 'yyyy-mm-dd'
  sheet.getCell(4, 3).value = 1020
  sheet.getCell(4, 9).value = 'Example row — replace with your numbers'

  // Conditional formatting for P&L and beat columns
  sheet.addConditionalFormatting({
    ref: 'F4:F43',
    rules: [
      {
        type: 'cellIs',
        operator: 'greaterThan',
        formulae: ['0'],
        style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFB8E0CC' } } },
      },
      {
        type: 'cellIs',
        operator: 'lessThan',
        formulae: ['0'],
        style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFF0C4BC' } } },
      },
    ],
  })
  sheet.addConditionalFormatting({
    ref: 'H4:H43',
    rules: [
      {
        type: 'cellIs',
        operator: 'greaterThan',
        formulae: ['0'],
        style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFB8E0CC' } } },
      },
      {
        type: 'cellIs',
        operator: 'lessThan',
        formulae: ['0'],
        style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFF0C4BC' } } },
      },
    ],
  })

  try {
    sheet.mergeCells(1, 2, 1, cols)
    sheet.mergeCells(2, 1, 2, cols)
  } catch {
    /* ok */
  }
}

async function buildBlankLog(wb, name, subtitle, headers, widths, yesCols = [], blankRows = 14, tab = LONG) {
  const sheet = wb.addWorksheet(name, { properties: { defaultRowHeight: 20 } })
  decorateSheet(sheet, tab)
  const cols = headers.length
  styleTitle(sheet.getRow(1), cols, subtitle)
  styleBanner(
    sheet.getRow(2),
    cols,
    'Fill down as you go · Freeze header stays visible · Educational only · Not financial advice · @tradersveezy',
  )
  styleHeader(sheet.getRow(3), headers)
  setWidths(sheet, widths)

  for (let i = 0; i < blankRows; i++) {
    const r = sheet.getRow(4 + i)
    styleDataRow(r, cols, i % 2 === 0)
    r.height = 24
  }
  for (const col of yesCols) addYesNo(sheet, col, 4, 4 + blankRows - 1)
}

async function writeWorkbook(fileName, builder) {
  const wb = new ExcelJS.Workbook()
  wb.creator = 'TraderSveezy'
  wb.created = new Date()
  await builder(wb)
  const dest = path.join(outDir, fileName)
  await wb.xlsx.writeFile(dest)
  console.log('wrote', dest)
}

fs.mkdirSync(outDir, { recursive: true })

await writeWorkbook('desk-pack.xlsx', async (wb) => {
  await buildChecklist(wb)
  await buildDailyTracker(wb)
  await buildBlankLog(
    wb,
    'Trade log',
    'COURSE 05 · TRADE LOG',
    JOURNAL_HEADERS,
    [11, 10, 8, 10, 10, 14, 12, 12, 10, 10, 10, 8, 10, 8, 8, 10, 11, 10, 6, 9, 12, 16, 16, 18, 18],
    [17, 21],
    16,
    LONG,
  )
  await buildBlankLog(
    wb,
    'Loss review',
    'COURSE 05 · LOSS REVIEW',
    LOSS_HEADERS,
    [11, 10, 22, 18, 12, 14, 14, 14, 14, 18, 16, 12, 12, 20, 16, 10],
    [5, 6, 7, 8, 9, 16],
    12,
    SHORT,
  )
  await buildBlankLog(
    wb,
    'Weekly',
    'COURSE 05 · WEEKLY CHECK-IN',
    WEEKLY_HEADERS,
    [12, 9, 11, 9, 9, 22, 22, 12, 16, 12, 18, 18, 11, 24],
    [],
    12,
    DEEP,
  )
  await buildRules(wb)
})

await writeWorkbook('pre-trade-checklist.xlsx', async (wb) => {
  await buildChecklist(wb)
})
await writeWorkbook('trade-journal.xlsx', async (wb) => {
  await buildBlankLog(
    wb,
    'Trade log',
    'COURSE 05 · TRADE LOG',
    JOURNAL_HEADERS,
    [11, 10, 8, 10, 10, 14, 12, 12, 10, 10, 10, 8, 10, 8, 8, 10, 11, 10, 6, 9, 12, 16, 16, 18, 18],
    [17, 21],
    16,
    LONG,
  )
})
await writeWorkbook('loss-review.xlsx', async (wb) => {
  await buildBlankLog(
    wb,
    'Loss review',
    'COURSE 05 · LOSS REVIEW',
    LOSS_HEADERS,
    [11, 10, 22, 18, 12, 14, 14, 14, 14, 18, 16, 12, 12, 20, 16, 10],
    [5, 6, 7, 8, 9, 16],
    12,
    SHORT,
  )
})
await writeWorkbook('weekly-review.xlsx', async (wb) => {
  await buildBlankLog(
    wb,
    'Weekly',
    'COURSE 05 · WEEKLY CHECK-IN',
    WEEKLY_HEADERS,
    [12, 9, 11, 9, 9, 22, 22, 12, 16, 12, 18, 18, 11, 24],
    [],
    12,
    DEEP,
  )
})
await writeWorkbook('playbook-rules.xlsx', async (wb) => {
  await buildRules(wb)
})
await writeWorkbook('daily-pnl-tracker.xlsx', async (wb) => {
  await buildDailyTracker(wb)
})

fs.writeFileSync(
  path.join(outDir, 'HOW-TO-GOOGLE-SHEETS.txt'),
  `TraderSveezy - Course 05 desk pack
=================================

Best: download desk-pack.xlsx (all tabs, already styled).

Google Sheets
-------------
1. sheets.google.com -> Blank spreadsheet
2. File -> Import -> Upload -> desk-pack.xlsx
3. Choose "Replace spreadsheet" or "Insert new sheet(s)"
4. On Daily P&L: set goal % + starting balance in the gold settings box

Excel / Numbers
---------------
Open the .xlsx directly. Header row is frozen. Yes/No columns have dropdowns.

Tabs
----
Checklist · Daily P&L · Trade log · Loss review · Weekly · Rules

Daily P&L
---------
- Change Daily profit goal (default 2%) and Starting balance
- Each day: enter Date + Ending balance (gold column)
- Starting balance, goals, P&L %, beat-by auto-calculate
- Right side: totals + 20-day expected compound path

Educational only - Not financial advice
@tradersveezy
`,
)

console.log('desk pack ready')
