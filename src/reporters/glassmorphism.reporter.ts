import { Reporter, FullConfig, Suite, TestCase, TestResult, FullResult } from '@playwright/test/reporter';

declare const require: (id: string) => any;
declare const process: { cwd(): string };

const fs = require('fs') as {
  existsSync(path: string): boolean;
  mkdirSync(path: string, options?: { recursive: boolean }): void;
  writeFileSync(path: string, data: string): void;
};

const path = require('path') as {
  join(...paths: string[]): string;
};

export default class GlassmorphismReporter implements Reporter {
  private startTime: number = 0;
  private results: Array<{ title: string; status: string; duration: number; error?: string }> = [];

  onBegin(config: FullConfig, suite: Suite) {
    this.startTime = Date.now();
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.results.push({
      title: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error?.message,
    });
  }

  async onEnd(result: FullResult) {
    const totalDuration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test Execution Report</title>
  <style>
    body {
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      margin: 0;
      padding: 2rem;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }
    h1 { margin-top: 0; text-align: center; }
    .stats {
      display: flex;
      justify-content: space-around;
      margin: 2rem 0;
      background: rgba(255, 255, 255, 0.03);
      padding: 1rem;
      border-radius: 12px;
    }
    .stat-box { text-align: center; }
    .stat-number { font-size: 1.8rem; font-weight: bold; }
    .passed { color: #4ade80; }
    .failed { color: #f87171; }
    .test-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 0.75rem;
    }
    .test-header { display: flex; justify-content: space-between; align-items: center; }
    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .badge-passed { background: rgba(74, 222, 128, 0.2); color: #4ade80; }
    .badge-failed { background: rgba(248, 113, 113, 0.2); color: #f87171; }
    pre {
      background: rgba(0, 0, 0, 0.4);
      padding: 0.75rem;
      border-radius: 6px;
      overflow-x: auto;
      color: #fca5a5;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Test Execution Results</h1>
    <div class="stats">
      <div class="stat-box"><div class="stat-number">${this.results.length}</div>Total</div>
      <div class="stat-box"><div class="stat-number passed">${passed}</div>Passed</div>
      <div class="stat-box"><div class="stat-number failed">${failed}</div>Failed</div>
      <div class="stat-box"><div class="stat-number">${totalDuration}s</div>Duration</div>
    </div>
    <div class="tests">
      ${this.results.map(r => `
        <div class="test-card">
          <div class="test-header">
            <span><strong>${r.title}</strong> (${r.duration}ms)</span>
            <span class="badge badge-${r.status}">${r.status.toUpperCase()}</span>
          </div>
          ${r.error ? `<pre>${r.error}</pre>` : ''}
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;

    const reportDir = path.join(process.cwd(), 'playwright-report');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    fs.writeFileSync(path.join(reportDir, 'glassmorphism.html'), htmlContent);
  }
}