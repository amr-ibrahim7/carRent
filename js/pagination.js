import { renderCarList } from "./carRender.js";

export let currentPage = 1;
export const itemsPerPage = 5;
let totalPages = 1;

export function setTotalPages(total) {
  totalPages = Math.ceil(total / itemsPerPage);
}

export function goToPage(pageNumber) {
  if (pageNumber >= 1 && pageNumber <= totalPages) {
    currentPage = pageNumber;
    renderCarList();
  }
}

export function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderCarList();
  }
}

export function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    renderCarList();
  }
}

export function updatePagination(carsLength) {
  setTotalPages(carsLength);
  const paginationContainer = document.getElementById("paginationContainer");
  const prevPageBtn = document.getElementById("prevPageBtn");
  const nextPageBtn = document.getElementById("nextPageBtn");

  // clear the old page numbers
  const pageNumberElements = document.querySelectorAll(".page-number");
  // removes the element completely from the page or from the DOM
  pageNumberElements.forEach((el) => el.remove());

  const nextPageElement = nextPageBtn.parentElement;

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item page-number ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      goToPage(i);
    });
    // add the page number directly before the Next button so that the order is correct in the pagination.
    //  insertBefore(newElement, referenceElement)
    paginationContainer.insertBefore(li, nextPageElement);
  }

  prevPageBtn.parentElement.classList.toggle("disabled", currentPage === 1);
  nextPageBtn.parentElement.classList.toggle(
    "disabled",
    currentPage === totalPages
  );
}
