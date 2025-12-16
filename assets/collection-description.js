import { Component } from '@theme/component';

/**
 * A custom element that handles read more/read less functionality for collection descriptions
 *
 * @typedef {Object} Refs
 * @property {HTMLElement} showMoreContent - The content container
 * @property {HTMLButtonElement} showMoreButton - The toggle button
 *
 * @extends {Component<Refs>}
 */
class CollectionDescription extends Component {
  requiredRefs = ['showMoreContent', 'showMoreButton'];

  #expanded = false;

  connectedCallback() {
    super.connectedCallback();
    this.#initialize();
  }

  /**
   * Initialize the component
   */
  #initialize() {
    const { showMoreContent, showMoreButton } = this.refs;

    if (!showMoreContent || !showMoreButton) return;

    // Get the text elements
    const truncatedText = showMoreContent.querySelector('.collection-description__text');
    const fullTextElement = showMoreContent.querySelector('.collection-description__full-text');

    if (!truncatedText || !fullTextElement) return;

    // Initially show truncated text, hide full text
    this.#setExpanded(false);
  }

  /**
   * Set the expanded state
   * @param {boolean} expanded
   */
  #setExpanded(expanded) {
    const { showMoreContent, showMoreButton } = this.refs;

    if (!showMoreContent || !showMoreButton) return;

    const truncatedText = showMoreContent.querySelector('.collection-description__text');
    const fullTextElement = showMoreContent.querySelector('.collection-description__full-text');

    if (!truncatedText || !fullTextElement) return;

    this.#expanded = expanded;
    this.dataset.expanded = this.#expanded ? 'true' : 'false';
    showMoreButton.setAttribute('aria-expanded', this.#expanded);

    if (expanded) {
      // Show full text, hide truncated
      truncatedText.classList.add('hidden');
      fullTextElement.classList.remove('hidden');
      showMoreContent.setAttribute('data-collapsed', 'false');
    } else {
      // Show truncated text, hide full
      truncatedText.classList.remove('hidden');
      fullTextElement.classList.add('hidden');
      showMoreContent.setAttribute('data-collapsed', 'true');
    }
  }

  /**
   * Toggle the expanded state
   * @param {Event} event
   */
  toggle = (event) => {
    event.preventDefault();
    this.#setExpanded(!this.#expanded);
  };
}

if (!customElements.get('collection-description')) {
  customElements.define('collection-description', CollectionDescription);
}

