class SkeletonDetail extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="skeleton-detail__title skeleton"></div>
        <div class="skeleton-detail__img skeleton"></div>
        
        <div class="skeleton-detail__menus__item skeleton "></div>
        <div class="skeleton-detail__description skeleton"></div>
        <div class="skeleton-detail__description skeleton"></div>
        <div class="skeleton-detail__description skeleton"></div>
        <br>
        `;
  }
}

customElements.define('skeleton-detail', SkeletonDetail);
