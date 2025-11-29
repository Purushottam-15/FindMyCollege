class CollegeSearchApp {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.itemsPerPage = 20;
    this.filterOptions = {};

    this.init();
  }

  async init() {
    await this.loadFilterOptions();
    this.bindEvents();
    this.showInitialMessage();
  }

  showInitialMessage() {
    const resultsInfo = document.getElementById('resultsInfo');
    resultsInfo.innerHTML = '<p></p>';
    resultsInfo.classList.remove('hidden');
  }

  async loadFilterOptions() {
    try {
      const response = await fetch("/api/colleges/filters");
      const data = await response.json();

      if (data.success) {
        this.filterOptions = data.data;
        this.populateFilterSelects();
      }
    } catch (error) {
      console.error("Error loading filter options:", error);
    }
  }

  populateFilterSelects() {
    const courseSelect = document.getElementById("courseSelect");
    if (this.filterOptions.courseNames && courseSelect) {
      courseSelect.innerHTML = '<option value="All">All</option>';
      this.filterOptions.courseNames.forEach((course) => {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
      });
    }

    const districtSelect = document.getElementById("districtSelect");
    if (this.filterOptions.districts && districtSelect) {
      districtSelect.innerHTML = '<option value="All">All</option>';
      this.filterOptions.districts.forEach((district) => {
        const option = document.createElement("option");
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
      });
    }

    const courseTypeSelect = document.getElementById("courseTypeSelect");
    if (this.filterOptions.courseTypes && courseTypeSelect) {
      courseTypeSelect.innerHTML = '<option value="All">All</option>';
      this.filterOptions.courseTypes.forEach((type) => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        courseTypeSelect.appendChild(option);
      });
    }
  }

  bindEvents() {
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.currentPage = 1;
        this.performSearch();
      });
    }

   
    const searchButton = document.querySelector(".search-button");
    if (searchButton) {
      searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.currentPage = 1;
        this.performSearch();
      });
    }

    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.performSearch();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.performSearch();
        }
      });
    }
  }

  async performSearch() {
    this.showLoading(true);

    try {
      const params = this.buildSearchParams();
      const response = await fetch(`/api/colleges?${params}`);
      const data = await response.json();

      if (data.success) {
        if (data.data.length === 0) {
          this.showNoResults();
          this.showResultsInfo(0);
        } else {
          this.displayResults(data.data);
          this.updatePagination(data.pagination);
          this.showResultsInfo(data.pagination.total);
        }
      } else {
        this.showError("Error fetching colleges");
      }
    } catch (error) {
      console.error("Search error:", error);
      this.showError("Error connecting to server");
    } finally {
      this.showLoading(false);
    }
  }

  buildSearchParams() {
    const params = new URLSearchParams();

    const search = document.getElementById("searchInput")?.value?.trim() || '';
    const course = document.getElementById("courseSelect")?.value || 'All';
    const district = document.getElementById("districtSelect")?.value || 'All';
    const courseType = document.getElementById("courseTypeSelect")?.value || 'All';

    if (search) params.append("search", search);
    if (course !== "All") params.append("course", course);
    if (district !== "All") params.append("district", district);
    if (courseType !== "All") params.append("courseType", courseType);

    params.append("page", this.currentPage.toString());
    params.append("limit", this.itemsPerPage.toString());

    return params.toString();
  }

  displayResults(colleges) {
    const resultsBody = document.getElementById("resultsBody");
    if (!resultsBody) return;
    
    resultsBody.innerHTML = "";

    this.hideNoResults();
    this.showResultsContainer();

    colleges.forEach((college) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${college['Sr. No.'] || 'N/A'}</td>
        <td>${college['College Code'] || 'N/A'}</td>
        <td>${college['District'] || 'N/A'}</td>
        <td class="college-name">${college['College Name'] || 'N/A'}</td>
        <td>
            <span class="course-badge">${college['Course Name'] || 'N/A'}</span>
        </td>
        <td>${college.contactNumber || 'N/A'}</td>
      `;
      resultsBody.appendChild(row);
    });
  }

  updatePagination(pagination) {
    this.totalPages = pagination.pages;
    this.currentPage = pagination.current;

    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");

    if (prevBtn) prevBtn.disabled = this.currentPage <= 1;
    if (nextBtn) nextBtn.disabled = this.currentPage >= this.totalPages;
    if (pageInfo) pageInfo.textContent = `Page ${this.currentPage} of ${this.totalPages}`;

    if (this.totalPages > 1) {
      this.showPagination();
    } else {
      this.hidePagination();
    }
  }

  showResultsInfo(total) {
    const resultsInfo = document.getElementById("resultsInfo");
    const totalResults = document.getElementById("totalResults");

    if (total === 0) {
      resultsInfo.innerHTML = '<p>No colleges found matching your criteria.</p>';
    } else {
      if (totalResults) totalResults.textContent = total.toLocaleString();
      resultsInfo.innerHTML = `<p>Found <span id="totalResults">${total.toLocaleString()}</span> colleges</p>`;
    }
    
    if (resultsInfo) resultsInfo.classList.remove("hidden");
  }

  showLoading(show) {
    const loading = document.getElementById("loading");
    if (!loading) return;
    
    if (show) {
      loading.classList.remove("hidden");
      this.hideResultsContainer();
      this.hideNoResults();
      this.hidePagination();
    } else {
      loading.classList.add("hidden");
    }
  }

  showResultsContainer() {
    const container = document.getElementById("resultsContainer");
    if (container) container.classList.remove("hidden");
  }

  hideResultsContainer() {
    const container = document.getElementById("resultsContainer");
    if (container) container.classList.add("hidden");
  }

  showNoResults() {
    const noResults = document.getElementById("noResults");
    if (noResults) noResults.classList.remove("hidden");
    this.hideResultsContainer();
  }

  hideNoResults() {
    const noResults = document.getElementById("noResults");
    if (noResults) noResults.classList.add("hidden");
  }

  showPagination() {
    const pagination = document.getElementById("pagination");
    if (pagination) pagination.classList.remove("hidden");
  }

  hidePagination() {
    const pagination = document.getElementById("pagination");
    if (pagination) pagination.classList.add("hidden");
  }

  showError(message) {
    console.error(message);
    alert(message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CollegeSearchApp();
});