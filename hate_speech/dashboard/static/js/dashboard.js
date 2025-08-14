// document.addEventListener('DOMContentLoaded', () => {
//     try {
//         createOverviewChart();
//     } catch (error) {
//         console.error('Error initializing charts:', error);
//     }
//     document.querySelectorAll('.analytics-tab').forEach(tab => {
//         tab.addEventListener('click', () => {
//             document.querySelectorAll('.analytics-tab').forEach(t => t.classList.remove('tab-active'));
//             tab.classList.add('tab-active');
//             document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
//             const targetTab = tab.getAttribute('data-tab');
//             document.getElementById(`${targetTab}-content`).classList.remove('hidden');
//             initializeChartsForTab(targetTab);
//         });
//     });

//     // Sidebar tab functionality
//     document.querySelectorAll('.tabLink').forEach(btn => {
//         btn.addEventListener('click', () => {
//             document.querySelectorAll('.tabLink').forEach(b => b.classList.remove('tab-active'));
//             btn.classList.add('tab-active');
//             const target = btn.getAttribute('data-target');
//             document.getElementById('searchPanel').classList.toggle('hidden', target !== 'search');
//             document.getElementById('overviewPanel').classList.toggle('hidden', target === 'search');
//         });
//     });

//     // Initialize charts
//     function initializeChartsForTab(tab) {
//         switch(tab) {
//             case 'overview':
//                 createOverviewChart();
//                 break;
//             case 'accuracy':
//                 createAccuracyChart();
//                 break;
//             case 'trends':
//                 createTrendsChart();
//                 break;
//             case 'comparison':
//                 createRadarChart();
//                 break;
//         }
//     }

//     // Overview Chart
//     function createOverviewChart() {
//         const ctx = document.getElementById('overviewChart');
//         if (!ctx) return;

//         new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//                 datasets: [{
//                     label: 'Overall Accuracy %',
//                     data: [89, 91, 88, 94, 92, 95, 91],
//                     borderColor: 'rgb(59, 130, 246)',
//                     backgroundColor: 'rgba(59, 130, 246, 0.1)',
//                     tension: 0.4,
//                     fill: true
//                 }, {
//                     label: 'Total Analyses',
//                     data: [45, 52, 48, 61, 55, 67, 58],
//                     borderColor: 'rgb(16, 185, 129)',
//                     backgroundColor: 'rgba(16, 185, 129, 0.1)',
//                     tension: 0.4,
//                     yAxisID: 'y1'
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: { display: true },
//                 },
//                 scales: {
//                     y: {
//                         type: 'linear',
//                         display: true,
//                         position: 'left',
//                         beginAtZero: true,
//                         max: 100
//                     },
//                     y1: {
//                         type: 'linear',
//                         display: true,
//                         position: 'right',
//                         beginAtZero: true,
//                         grid: { drawOnChartArea: false },
//                     }
//                 }
//             }
//         });
//     }

//     // Accuracy Chart
//     function createAccuracyChart() {
//         const ctx = document.getElementById('accuracyChart');
//         if (!ctx) return;

//         new Chart(ctx, {
//             type: 'doughnut',
//             data: {
//                 labels: ['User A', 'User B', 'User C'],
//                 datasets: [{
//                     data: [95.2, 88.7, 92.4],
//                     backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(245, 158, 11, 0.8)'],
//                     borderColor: ['rgb(59, 130, 246)', 'rgb(16, 185, 129)', 'rgb(245, 158, 11)'],
//                     borderWidth: 2
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: { position: 'bottom' },
//                     tooltip: {
//                         callbacks: {
//                             label: function(context) {
//                                 return context.label + ': ' + context.parsed + '%';
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//     }

//     // Trends Chart
//     function createTrendsChart() {
//         const ctx = document.getElementById('trendsChart');
//         if (!ctx) return;

//         new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//                 datasets: [{
//                     label: 'User A',
//                     data: [92, 94, 91, 96, 95, 97, 95],
//                     borderColor: 'rgb(59, 130, 246)',
//                     backgroundColor: 'rgba(59, 130, 246, 0.1)',
//                     tension: 0.4
//                 }, {
//                     label: 'User B',
//                     data: [85, 87, 84, 90, 88, 91, 89],
//                     borderColor: 'rgb(16, 185, 129)',
//                     backgroundColor: 'rgba(16, 185, 129, 0.1)',
//                     tension: 0.4
//                 }, {
//                     label: 'User C',
//                     data: [89, 91, 88, 94, 92, 95, 92],
//                     borderColor: 'rgb(245, 158, 11)',
//                     backgroundColor: 'rgba(245, 158, 11, 0.1)',
//                     tension: 0.4
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: { legend: { display: true } },
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         max: 100,
//                         ticks: { callback: function(value) { return value + '%'; } }
//                     }
//                 }
//             }
//         });
//     }

//     // Radar Chart
//     function createRadarChart() {
//         const ctx = document.getElementById('radarChart');
//         if (!ctx) return;

//         new Chart(ctx, {
//             type: 'radar',
//             data: {
//                 labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'Speed', 'Consistency'],
//                 datasets: [{
//                     label: 'User A',
//                     data: [95, 96, 94, 95, 88, 92],
//                     borderColor: 'rgb(59, 130, 246)',
//                     backgroundColor: 'rgba(59, 130, 246, 0.2)',
//                     pointBackgroundColor: 'rgb(59, 130, 246)',
//                     pointBorderColor: '#fff',
//                     pointHoverBackgroundColor: '#fff',
//                     pointHoverBorderColor: 'rgb(59, 130, 246)'
//                 }, {
//                     label: 'User B',
//                     data: [89, 87, 90, 88, 92, 85],
//                     borderColor: 'rgb(16, 185, 129)',
//                     backgroundColor: 'rgba(16, 185, 129, 0.2)',
//                     pointBackgroundColor: 'rgb(16, 185, 129)',
//                     pointBorderColor: '#fff',
//                     pointHoverBackgroundColor: '#fff',
//                     pointHoverBorderColor: 'rgb(16, 185, 129)'
//                 }, {
//                     label: 'User C',
//                     data: [92, 92, 93, 92, 85, 89],
//                     borderColor: 'rgb(245, 158, 11)',
//                     backgroundColor: 'rgba(245, 158, 11, 0.2)',
//                     pointBackgroundColor: 'rgb(245, 158, 11)',
//                     pointBorderColor: '#fff',
//                     pointHoverBackgroundColor: '#fff',
//                     pointHoverBorderColor: 'rgb(245, 158, 11)'
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: { legend: { position: 'bottom' } },
//                 scales: {
//                     r: {
//                         beginAtZero: true,
//                         max: 100,
//                         ticks: { stepSize: 20 }
//                     }
//                 }
//             }
//         });
//     }

//     // Quick analyze functionality
//     document.getElementById('quickAnalyzeBtn').addEventListener('click', () => {
//         const text = document.getElementById('quickSearchInput').value.trim();
//         if (!text) {
//             alert('Type text to analyze');
//             return;
//         }

//         // Mock analysis result
//         const isHate = Math.random() > 0.7;
//         const confidence = Math.floor(70 + Math.random() * 30);

//         addToHistory(text, isHate ? 'Hate' : 'Safe', confidence);
//         document.getElementById('quickSearchInput').value = '';
//         showAnalysisResult(text, isHate ? 'Hate' : 'Safe', confidence);
//     });

//     // Add to history function
//     function addToHistory(text, label, confidence = null) {
//         const ul = document.getElementById('historyList');
//         const li = document.createElement('li');
//         li.className = 'text-sm text-gray-700 dark:text-gray-200 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700';
//         li.setAttribute('data-content', text);
//         li.setAttribute('data-label', label);
//         li.setAttribute('data-confidence', confidence || Math.floor(70 + Math.random() * 30));

//         const truncatedText = text.length > 30 ? text.substring(0, 30) + '...' : text;
//         li.innerHTML = `${truncatedText} <span class="text-xs ${label === 'Hate' ? 'text-red-500' : 'text-green-500'} ml-2">${label}</span>`;

//         li.addEventListener('click', () => {
//             showAnalysisResult(text, label, li.getAttribute('data-confidence'));
//         });

//         ul.prepend(li);

//         // Update side counters
//         const total = parseInt(document.getElementById('sideTotal').textContent) + 1;
//         document.getElementById('sideTotal').textContent = total;

//         if (label === 'Hate') {
//             const hate = parseInt(document.getElementById('sideHate').textContent) + 1;
//             document.getElementById('sideHate').textContent = hate;
//         } else {
//             const safe = parseInt(document.getElementById('sideSafe').textContent) + 1;
//             document.getElementById('sideSafe').textContent = safe;
//         }
//     }

//     // Show analysis result in center panel
//     function showAnalysisResult(text, label, confidence) {
//         const centerPanel = document.getElementById('centerPanel');
//         centerPanel.innerHTML = `
//             <div class="p-6">
//                 <div class="flex items-center justify-between mb-6">
//                     <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Analysis Result</h2>
//                     <button id="backToAnalytics" class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
//                         ← Back to Analytics
//                     </button>
//                 </div>

//                 <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-6">
//                     <h3 class="text-lg font-semibold mb-3">Input Text</h3>
//                     <p class="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 p-4 rounded-lg border">${escapeHtml(text)}</p>
//                 </div>

//                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div class="metric-card rounded-xl p-6">
//                         <h3 class="text-lg font-semibold mb-4">Detection Result</h3>
//                         <div class="text-center">
//                             <div class="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${label === 'Hate' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'}">
//                                 <svg class="w-12 h-12 ${label === 'Hate' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     ${label === 'Hate' ?
//                                         '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>' :
//                                         '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
//                                     }
//                                 </svg>
//                             </div>
//                             <h4 class="text-2xl font-bold ${label === 'Hate' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'} mb-2">${label} Speech</h4>
//                             <p class="text-gray-600 dark:text-gray-400">Confidence: ${confidence}%</p>
//                             <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
//                                 <div class="h-2 rounded-full ${label === 'Hate' ? 'bg-red-500' : 'bg-green-500'}" style="width: ${confidence}%"></div>
//                             </div>
//                         </div>
//                     </div>

//                     <div class="metric-card rounded-xl p-6">
//                         <h3 class="text-lg font-semibold mb-4">Analysis Details</h3>
//                         <div class="space-y-3">
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Model Version:</span>
//                                 <span class="font-medium">v2.1.0</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Processing Time:</span>
//                                 <span class="font-medium">${Math.floor(Math.random() * 500 + 100)}ms</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Text Length:</span>
//                                 <span class="font-medium">${text.length} chars</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Language:</span>
//                                 <span class="font-medium">English</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Timestamp:</span>
//                                 <span class="font-medium">${new Date().toLocaleString()}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;

//         document.getElementById('backToAnalytics').addEventListener('click', () => {
//             location.reload();
//         });
//     }

//     // Utility function to escape HTML
//     function escapeHtml(text) {
//         const div = document.createElement('div');
//         div.textContent = text;
//         return div.innerHTML;
//     }

//     // History item click handlers
//     document.querySelectorAll('#historyList li').forEach(li => {
//         li.addEventListener('click', () => {
//             const content = li.getAttribute('data-content');
//             const label = li.getAttribute('data-label');
//             const confidence = li.getAttribute('data-confidence');
//             showAnalysisResult(content, label, confidence);
//         });
//     });

//     // Clear history
//     document.getElementById('clearHistory').addEventListener('click', () => {
//         document.getElementById('historyList').innerHTML = '';
//         document.getElementById('sideTotal').textContent = '0';
//         document.getElementById('sideHate').textContent = '0';
//         document.getElementById('sideSafe').textContent = '0';
//     });

//     // New Analysis button
//     document.getElementById('newAnalysisBtn').addEventListener('click', () => {
//         document.querySelectorAll('.tabLink').forEach(b => b.classList.remove('tab-active'));
//         document.querySelector('.tabLink[data-target="search"]').classList.add('tab-active');
//         document.getElementById('searchPanel').classList.remove('hidden');
//         document.getElementById('overviewPanel').classList.add('hidden');
//         document.getElementById('quickSearchInput').focus();
//     });

//     // Initialize default charts on page load
//     setTimeout(() => {
//         createOverviewChart();
//     }, 100);

//     // Simulate real-time updates
//     setInterval(() => {
//         const currentTotal = parseInt(document.getElementById('sideTotal').textContent);
//         if (Math.random() > 0.8) {
//             document.getElementById('sideTotal').textContent = currentTotal + 1;
//             if (Math.random() > 0.7) {
//                 const currentHate = parseInt(document.getElementById('sideHate').textContent);
//                 document.getElementById('sideHate').textContent = currentHate + 1;
//             } else {
//                 const currentSafe = parseInt(document.getElementById('sideSafe').textContent);
//                 document.getElementById('sideSafe').textContent = currentSafe + 1;
//             }
//         }
//     }, 5000);
//     // ... rest of the script
// });

document.addEventListener("DOMContentLoaded", () => {
  // Object to store chart instances
  const charts = {
    overviewChart: null,
    accuracyChart: null,
    trendsChart: null,
    radarChart: null,
  };

  // Tab functionality for analytics tabs
  document.querySelectorAll(".analytics-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".analytics-tab")
        .forEach((t) => t.classList.remove("tab-active"));
      tab.classList.add("tab-active");
      document
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.add("hidden"));
      const targetTab = tab.getAttribute("data-tab");
      document
        .getElementById(`${targetTab}-content`)
        .classList.remove("hidden");
      initializeChartsForTab(targetTab);
    });
  });

  // Sidebar tab functionality
  document.querySelectorAll(".tabLink").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tabLink")
        .forEach((b) => b.classList.remove("tab-active"));
      btn.classList.add("tab-active");
      const target = btn.getAttribute("data-target");
      document
        .getElementById("searchPanel")
        .classList.toggle("hidden", target !== "search");
      document
        .getElementById("overviewPanel")
        .classList.toggle("hidden", target === "search");
    });
  });

  // Initialize charts
  function initializeChartsForTab(tab) {
    switch (tab) {
      case "overview":
        createOverviewChart();
        break;
      case "accuracy":
        createAccuracyChart();
        break;
      case "trends":
        createTrendsChart();
        break;
      case "comparison":
        createRadarChart();
        break;
    }
  }

  // Destroy existing chart if it exists
  function destroyChart(chartKey) {
    if (charts[chartKey]) {
      charts[chartKey].destroy();
      charts[chartKey] = null;
    }
  }

  // Overview Chart
  function createOverviewChart() {
    const ctx = document.getElementById("overviewChart");
    if (!ctx) {
      console.error("Canvas #overviewChart not found");
      return;
    }

    // Destroy existing chart if it exists
    destroyChart("overviewChart");

    charts.overviewChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Overall Accuracy %",
            data: [89, 91, 88, 94, 92, 95, 91],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "Total Analyses",
            data: [45, 52, 48, 61, 55, 67, 58],
            borderColor: "rgb(16, 185, 129)",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            beginAtZero: true,
            max: 100,
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            beginAtZero: true,
            grid: { drawOnChartArea: false },
          },
        },
      },
    });
  }

  // Accuracy Chart
  function createAccuracyChart() {
    const ctx = document.getElementById("accuracyChart");
    if (!ctx) {
      console.error("Canvas #accuracyChart not found");
      return;
    }

    destroyChart("accuracyChart");

    charts.accuracyChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["User A", "User B", "User C"],
        datasets: [
          {
            data: [95.2, 88.7, 92.4],
            backgroundColor: [
              "rgba(59, 130, 246, 0.8)",
              "rgba(16, 185, 129, 0.8)",
              "rgba(245, 158, 11, 0.8)",
            ],
            borderColor: [
              "rgb(59, 130, 246)",
              "rgb(16, 185, 129)",
              "rgb(245, 158, 11)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.parsed + "%";
              },
            },
          },
        },
      },
    });
  }

  // Trends Chart
  function createTrendsChart() {
    const ctx = document.getElementById("trendsChart");
    if (!ctx) {
      console.error("Canvas #trendsChart not found");
      return;
    }

    destroyChart("trendsChart");

    charts.trendsChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
          {
            label: "User A",
            data: [92, 94, 91, 96, 95, 97, 95],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
          },
          {
            label: "User B",
            data: [85, 87, 84, 90, 88, 91, 89],
            borderColor: "rgb(16, 185, 129)",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
          },
          {
            label: "User C",
            data: [89, 91, 88, 94, 92, 95, 92],
            borderColor: "rgb(245, 158, 11)",
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
          },
        },
      },
    });
  }

  // Radar Chart
  function createRadarChart() {
    const ctx = document.getElementById("radarChart");
    if (!ctx) {
      console.error("Canvas #radarChart not found");
      return;
    }

    destroyChart("radarChart");

    charts.radarChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Accuracy",
          "Precision",
          "Recall",
          "F1-Score",
          "Speed",
          "Consistency",
        ],
        datasets: [
          {
            label: "User A",
            data: [95, 96, 94, 95, 88, 92],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            pointBackgroundColor: "rgb(59, 130, 246)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(59, 130, 246)",
          },
          {
            label: "User B",
            data: [89, 87, 90, 88, 92, 85],
            borderColor: "rgb(16, 185, 129)",
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            pointBackgroundColor: "rgb(16, 185, 129)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(16, 185, 129)",
          },
          {
            label: "User C",
            data: [92, 92, 93, 92, 85, 89],
            borderColor: "rgb(245, 158, 11)",
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            pointBackgroundColor: "rgb(245, 158, 11)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(245, 158, 11)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20 },
          },
        },
      },
    });
  }

  // Quick analyze functionality
  document.getElementById("quickAnalyzeBtn").addEventListener("click", () => {
    const text = document.getElementById("quickSearchInput").value.trim();
    if (!text) {
      alert("Type text to analyze");
      return;
    }

    // Mock analysis result (replace with API call in production)
    const isHate = Math.random() > 0.7;
    const confidence = Math.floor(70 + Math.random() * 30);

    addToHistory(text, isHate ? "Hate" : "Safe", confidence);
    document.getElementById("quickSearchInput").value = "";
    showAnalysisResult(text, isHate ? "Hate" : "Safe", confidence);
  });

  // Add to history function
  function addToHistory(text, label, confidence = null) {
    const ul = document.getElementById("historyList");
    const li = document.createElement("li");
    li.className =
      "text-sm text-gray-700 dark:text-gray-200 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700";
    li.setAttribute("data-content", text);
    li.setAttribute("data-label", label);
    li.setAttribute(
      "data-confidence",
      confidence || Math.floor(70 + Math.random() * 30)
    );

    const truncatedText =
      text.length > 30 ? text.substring(0, 30) + "..." : text;
    li.innerHTML = `${truncatedText} <span class="text-xs ${
      label === "Hate" ? "text-red-500" : "text-green-500"
    } ml-2">${label}</span>`;

    li.addEventListener("click", () => {
      showAnalysisResult(text, label, li.getAttribute("data-confidence"));
    });

    ul.prepend(li);

    // Update side counters
    const total =
      parseInt(document.getElementById("sideTotal").textContent) + 1;
    document.getElementById("sideTotal").textContent = total;

    if (label === "Hate") {
      const hate =
        parseInt(document.getElementById("sideHate").textContent) + 1;
      document.getElementById("sideHate").textContent = hate;
    } else {
      const safe =
        parseInt(document.getElementById("sideSafe").textContent) + 1;
      document.getElementById("sideSafe").textContent = safe;
    }
  }

  // Show analysis result in center panel
  function showAnalysisResult(text, label, confidence) {
    // Destroy all charts before updating center panel
    Object.keys(charts).forEach(destroyChart);

    const centerPanel = document.getElementById("centerPanel");
    centerPanel.innerHTML = `
            <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Analysis Result</h2>
                    <button id="backToAnalytics" class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        ← Back to Analytics
                    </button>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-6">
                    <h3 class="text-lg font-semibold mb-3">Input Text</h3>
                    <p class="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 p-4 rounded-lg border">${escapeHtml(
                      text
                    )}</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="metric-card rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-4">Detection Result</h3>
                        <div class="text-center">
                            <div class="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                              label === "Hate"
                                ? "bg-red-100 dark:bg-red-900/30"
                                : "bg-green-100 dark:bg-green-900/30"
                            }">
                                <svg class="w-12 h-12 ${
                                  label === "Hate"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-green-600 dark:text-green-400"
                                }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    ${
                                      label === "Hate"
                                        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>'
                                        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
                                    }
                                </svg>
                            </div>
                            <h4 class="text-2xl font-bold ${
                              label === "Hate"
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                            } mb-2">${label} Speech</h4>
                            <p class="text-gray-600 dark:text-gray-400">Confidence: ${confidence}%</p>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                                <div class="h-2 rounded-full ${
                                  label === "Hate"
                                    ? "bg-red-500"
                                    : "bg-green-500"
                                }" style="width: ${confidence}%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="metric-card rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-4">Analysis Details</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Model Version:</span>
                                <span class="font-medium">v2.1.0</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Processing Time:</span>
                                <span class="font-medium">${Math.floor(
                                  Math.random() * 500 + 100
                                )}ms</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Text Length:</span>
                                <span class="font-medium">${
                                  text.length
                                } chars</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Language:</span>
                                <span class="font-medium">English</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Timestamp:</span>
                                <span class="font-medium">${new Date().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    document.getElementById("backToAnalytics").addEventListener("click", () => {
      location.reload();
    });
  }

  // Utility function to escape HTML
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // History item click handlers
  document.querySelectorAll("#historyList li").forEach((li) => {
    li.addEventListener("click", () => {
      const content = li.getAttribute("data-content");
      const label = li.getAttribute("data-label");
      const confidence = li.getAttribute("data-confidence");
      showAnalysisResult(content, label, confidence);
    });
  });

  // Clear history
  document.getElementById("clearHistory").addEventListener("click", () => {
    document.getElementById("historyList").innerHTML = "";
    document.getElementById("sideTotal").textContent = "0";
    document.getElementById("sideHate").textContent = "0";
    document.getElementById("sideSafe").textContent = "0";
  });

  // New Analysis button
  document.getElementById("newAnalysisBtn").addEventListener("click", () => {
    document
      .querySelectorAll(".tabLink")
      .forEach((b) => b.classList.remove("tab-active"));
    document
      .querySelector('.tabLink[data-target="search"]')
      .classList.add("tab-active");
    document.getElementById("searchPanel").classList.remove("hidden");
    document.getElementById("overviewPanel").classList.add("hidden");
    document.getElementById("quickSearchInput").focus();
  });

  // Initialize default chart on page load
  try {
    createOverviewChart();
  } catch (error) {
    console.error("Error initializing overview chart:", error);
  }

  // Simulate real-time updates
  setInterval(() => {
    const currentTotal = parseInt(
      document.getElementById("sideTotal").textContent
    );
    if (Math.random() > 0.8) {
      document.getElementById("sideTotal").textContent = currentTotal + 1;
      if (Math.random() > 0.7) {
        const currentHate = parseInt(
          document.getElementById("sideHate").textContent
        );
        document.getElementById("sideHate").textContent = currentHate + 1;
      } else {
        const currentSafe = parseInt(
          document.getElementById("sideSafe").textContent
        );
        document.getElementById("sideSafe").textContent = currentSafe + 1;
      }
    }
  }, 5000);
});
