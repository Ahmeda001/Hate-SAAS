// // chart.js

// document.addEventListener("DOMContentLoaded", () => {
//   const ctx = document.getElementById('overviewChart').getContext('2d');

//   const overviewChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // X-axis: days
//       datasets: [
//         {
//           label: 'Hate Speech ',
//           data: [12, 18, 9], // Example counts per day
//           borderColor: '#ef4444', // red line
//           backgroundColor: 'rgba(239, 68, 68, 0.2)', // light red fill
//           fill: true,
//           tension: 0.4, // smooth curve
//           pointBackgroundColor: '#ef4444',
//           pointRadius: 4,
//           pointHoverRadius: 6,
//         },
//         {
//           label: 'Safe Speech',
//           data: [88, 82], // Example counts per day
//           borderColor: '#10b981', // green line
//           backgroundColor: 'rgba(16, 185, 129, 0.2)', // light green fill
//           fill: true,
//           tension: 0.4,
//           pointBackgroundColor: '#10b981',
//           pointRadius: 4,
//           pointHoverRadius: 6,
//         }
//       ]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           display: true, // show labels for Hate vs Normal
//           labels: {
//             color: '#6B7280'
//           }
//         },
//         tooltip: {
//           backgroundColor: '#111827',
//           titleColor: '#fff',
//           bodyColor: '#fff'
//         }
//       },
//       scales: {
//         x: {
//           grid: { display: false },
//           ticks: { color: '#6B7280' }
//         },
//         y: {
//           beginAtZero: true,
//           ticks: { color: '#6B7280' },
//           grid: { color: 'rgba(107, 114, 128, 0.2)' }
//         }
//       }
//     }
//   });
// });

