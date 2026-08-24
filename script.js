// DATA - PARCEIRO HYPERA Jun/Jul/Ago 2026
const dashboardData = {
  growth: {
    months: ['Junho', 'Julho', 'Agosto'],
    faturamento: [2822, 2882, 2763],
    positivacoes: [2184, 2184, 2184]
  },
  regional: {
    labels: ['LUCILENE', 'ALBERTO', 'KRIS', 'ROSA', 'JOSEANE'],
    nao: [3864, 639, 444, 261, 279],
    sim: [669, 42, 78, 138, 120]
  },
  positivacao: {
    labels: ['LUCILENE', 'ALBERTO', 'KRIS', 'ROSA', 'JOSEANE'],
    data: [4533, 681, 522, 399, 399],
    colors: [
      'rgba(0, 217, 255, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(6, 182, 212, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(239, 68, 68, 0.8)'
    ]
  },
  topProdutos: [
    { nome: 'HYPERA S.A. — PED=NÃO', faturamento: 3945, pos: 1835, qty: 1012615 },
    { nome: 'HYPERA S.A. — PED=SIM', faturamento: 288, pos: 349, qty: 69456 },
    { nome: 'ABL ANTIBIOTICOS DO BRASIL', faturamento: 0, pos: 0, qty: 0 },
    { nome: 'ABOVE', faturamento: 0, pos: 0, qty: 0 },
    { nome: 'ABSOLUT NUTRITION', faturamento: 0, pos: 0, qty: 0 }
  ],
  topVendedores: [
    { nome: 'LUCILENE — SPI/SPC', pos: 4533, regional: 'LUCILENE', clientes: 1515 },
    { nome: 'ALBERTO — REG SUL', pos: 681, regional: 'ALBERTO', clientes: 1515 },
    { nome: 'KRIS — RJ', pos: 522, regional: 'KRIS', clientes: 1515 },
    { nome: 'ROSA — GO/DF', pos: 399, regional: 'ROSA', clientes: 1515 },
    { nome: 'JOSEANE — TLV/OL', pos: 399, regional: 'JOSEANE', clientes: 1515 }
  ]
};

let charts = {};

// SPLASH SCREEN
function enterDashboard() {
  document.getElementById('splashScreen').classList.add('hidden');
  document.getElementById('dashboardWrapper').classList.add('active');

  // Initialize date
  const now = new Date();
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  document.getElementById('currentDate').textContent = now.toLocaleDateString('pt-BR', options);

  // Initialize charts
  setTimeout(() => {
    initCharts();
  }, 500);
}

// TAB SWITCHING
function switchView(viewName) {
  // Hide all content
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));

  // Remove active from buttons
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

  // Show selected
  document.getElementById(`view-${viewName}`).classList.add('active');
  event.target.closest('.tab-btn').classList.add('active');

  // Reinitialize charts if needed
  setTimeout(() => {
    if (charts.growthChart) charts.growthChart.resize();
    if (charts.regionalChart) charts.regionalChart.resize();
    if (charts.posChart) charts.posChart.resize();
  }, 100);
}

// FILTER TOGGLE
function toggleFilter(element, type) {
  element.style.opacity = element.style.opacity === '0.5' ? '1' : '0.5';
  console.log(`Filter ${type} toggled`);
}

// INITIALIZE CHARTS
function initCharts() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#cbd5e1',
          usePointStyle: true,
          padding: 20,
          font: { size: 13, weight: '600' }
        }
      },
      filler: {
        propagate: true
      }
    },
    scales: {
      y: {
        ticks: { color: '#94a3b8', font: { size: 12 } },
        grid: { color: 'rgba(0, 217, 255, 0.1)' }
      },
      x: {
        ticks: { color: '#94a3b8', font: { size: 12, weight: '600' } },
        grid: { color: 'rgba(0, 217, 255, 0.1)' }
      }
    }
  };

  // GROWTH CHART
  if (document.getElementById('growthChart')) {
    const growthCtx = document.getElementById('growthChart').getContext('2d');

    const gradient1 = growthCtx.createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, 'rgba(0, 217, 255, 0.3)');
    gradient1.addColorStop(1, 'rgba(0, 217, 255, 0)');

    const gradient2 = growthCtx.createLinearGradient(0, 0, 0, 300);
    gradient2.addColorStop(0, 'rgba(236, 72, 153, 0.3)');
    gradient2.addColorStop(1, 'rgba(236, 72, 153, 0)');

    charts.growthChart = new Chart(growthCtx, {
      type: 'line',
      data: {
        labels: dashboardData.growth.months,
        datasets: [
          {
            label: 'Faturamento (R$ mil)',
            data: dashboardData.growth.faturamento,
            borderColor: '#00d9ff',
            backgroundColor: gradient1,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00d9ff',
            pointBorderColor: '#0a0e27',
            pointBorderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 12,
            pointStyle: 'circle'
          },
          {
            label: 'Positivações',
            data: dashboardData.growth.positivacoes,
            borderColor: '#ec4899',
            backgroundColor: gradient2,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#ec4899',
            pointBorderColor: '#0a0e27',
            pointBorderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 12,
            yAxisID: 'y1',
            pointStyle: 'circle'
          }
        ]
      },
      options: {
        ...chartOptions,
        interaction: { mode: 'index', intersect: false },
        scales: {
          ...chartOptions.scales,
          y: {
            ...chartOptions.scales.y,
            position: 'left',
            title: { display: true, text: 'Faturamento (R$ mil)', color: '#cbd5e1' }
          },
          y1: {
            type: 'linear',
            position: 'right',
            ticks: { color: '#94a3b8', font: { size: 12 } },
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'Positivações', color: '#cbd5e1' }
          }
        }
      }
    });
  }

  // REGIONAL CHART
  if (document.getElementById('regionalChart')) {
    const regionalCtx = document.getElementById('regionalChart').getContext('2d');

    charts.regionalChart = new Chart(regionalCtx, {
      type: 'bar',
      data: {
        labels: dashboardData.regional.labels,
        datasets: [
          {
            label: 'PED = NÃO',
            data: dashboardData.regional.nao,
            backgroundColor: 'rgba(0, 217, 255, 0.8)',
            borderRadius: 8,
            borderSkipped: false,
            borderColor: '#00d9ff',
            borderWidth: 0
          },
          {
            label: 'PED = SIM',
            data: dashboardData.regional.sim,
            backgroundColor: 'rgba(124, 58, 237, 0.8)',
            borderRadius: 8,
            borderSkipped: false,
            borderColor: '#7c3aed',
            borderWidth: 0
          }
        ]
      },
      options: {
        ...chartOptions,
        scales: {
          ...chartOptions.scales,
          y: {
            ...chartOptions.scales.y,
            stacked: false
          }
        }
      }
    });
  }

  // POSITIVAÇÃO CHART
  if (document.getElementById('posChart')) {
    const posCtx = document.getElementById('posChart').getContext('2d');

    charts.posChart = new Chart(posCtx, {
      type: 'doughnut',
      data: {
        labels: dashboardData.positivacao.labels,
        datasets: [{
          data: dashboardData.positivacao.data,
          backgroundColor: dashboardData.positivacao.colors,
          borderColor: '#0a0e27',
          borderWidth: 3
        }]
      },
      options: {
        ...chartOptions,
        plugins: {
          ...chartOptions.plugins,
          legend: {
            ...chartOptions.plugins.legend,
            position: 'right'
          }
        }
      }
    });
  }
}

// ADD TOP PRODUCTS SECTION DYNAMICALLY
function addProductsSection() {
  const viewOverview = document.getElementById('view-overview');
  if (!viewOverview) return;

  const existingSection = viewOverview.querySelector('.products-section');
  if (existingSection) return;

  const productsHTML = `
    <div class="chart-section products-section">
      <div class="section-header">
        <h3>Top 5 Produtos — Faturamento & Positivação</h3>
        <span class="info-badge">R$ 423.057 Faturamento Total</span>
      </div>

      <div class="products-grid">
        ${dashboardData.topProdutos.map((produto, idx) => `
          <div class="product-card">
            <div class="product-rank">${idx + 1}</div>
            <div class="product-info">
              <h4>${produto.nome}</h4>
              <div class="product-metrics">
                <span class="metric">
                  <strong>R$</strong> ${(produto.faturamento / 1000).toFixed(1)}K
                </span>
                <span class="metric">
                  <strong>${produto.pos}</strong> POS
                </span>
                <span class="metric">
                  <strong>${(produto.qty / 1000).toFixed(0)}K</strong> Units
                </span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  viewOverview.insertAdjacentHTML('beforeend', productsHTML);
}

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
  // ESC to close splash
  if (e.key === 'Escape' && !document.getElementById('splashScreen').classList.contains('hidden')) {
    enterDashboard();
  }
});

// SMOOTH SCROLL
document.addEventListener('DOMContentLoaded', () => {
  addProductsSection();

  // Add smooth transitions
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// ANIMATION OBSERVER
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.kpi-card, .chart-section, .regional-card, .insight-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});