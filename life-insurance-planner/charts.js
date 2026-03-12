window.PlannerCharts = {
  renderEstimateNeedPlaceholder(containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    container.innerHTML = `
      <div>
        <div class="chart-shell" aria-hidden="true"></div>
        <h3 class="card-title">Future Donut Chart</h3>
        <p class="card-copy">Reserved for a later Chart.js implementation such as death benefit need breakdown or covered versus uncovered need.</p>
      </div>
    `;
  }
};
