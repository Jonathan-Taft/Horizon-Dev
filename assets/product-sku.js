import { ThemeEvents, VariantUpdateEvent } from '@theme/events';
import { morph } from '@theme/morph';

class ProductSku extends HTMLElement {
  connectedCallback() {
    const closestSection = this.closest('.shopify-section, dialog');
    closestSection?.addEventListener(ThemeEvents.variantUpdate, this.updateSku);
  }

  disconnectedCallback() {
    const closestSection = this.closest('.shopify-section, dialog');
    closestSection?.removeEventListener(ThemeEvents.variantUpdate, this.updateSku);
  }

  /**
   * Updates the SKU.
   * @param {VariantUpdateEvent} event - The variant update event.
   */
  updateSku = (event) => {
    if (event.detail.data.newProduct) {
      this.dataset.productId = event.detail.data.newProduct.id;
    } else if (event.target instanceof HTMLElement && event.target.dataset.productId !== this.dataset.productId) {
      return;
    }

    const newSku = event.detail.data.html.querySelector('product-sku');

    if (!newSku) return;

    morph(this, newSku, { childrenOnly: true });
  };
}

if (!customElements.get('product-sku')) {
  customElements.define('product-sku', ProductSku);
}

