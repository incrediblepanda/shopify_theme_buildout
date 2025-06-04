/**
 * Global JavaScript for TCG Vaults Theme
 * Handles common functionality across the theme
 */

class ThemeGlobal {
  constructor() {
    this.initializeEventListeners();
    this.setupCartFunctionality();
    this.handleMobileMenu();
    this.initializeAnimations();
  }

  initializeEventListeners() {
    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-mobile-menu-toggle]')) {
        this.toggleMobileMenu();
      }
    });

    // Cart drawer functionality
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-cart-open]')) {
        this.openCartDrawer();
      }
      if (e.target.matches('[data-cart-close]')) {
        this.closeCartDrawer();
      }
    });

    // Quick add to cart forms
    document.addEventListener('submit', (e) => {
      if (e.target.matches('.quick-add-form')) {
        e.preventDefault();
        this.handleQuickAddToCart(e.target);
      }
    });

    // Search functionality
    const searchInput = document.querySelector('[data-search-input]');
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
    }
  }

  setupCartFunctionality() {
    // Update cart count on page load
    this.updateCartCount();

    // Listen for cart updates
    document.addEventListener('cart:updated', () => {
      this.updateCartCount();
    });
  }

  handleMobileMenu() {
    const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');

    if (mobileMenuButton && mobileMenu) {
      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
          this.closeMobileMenu();
        }
      });

      // Close mobile menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileMenu();
        }
      });
    }
  }

  toggleMobileMenu() {
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    }
  }

  closeMobileMenu() {
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  async handleQuickAddToCart(form) {
    const formData = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    try {
      // Update button state
      button.disabled = true;
      button.textContent = 'Adding...';

      // Add to cart
      const response = await fetch(window.routes.cart_add_url, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        // Success
        button.textContent = 'Added!';
        this.showNotification('Product added to cart', 'success');

        // Trigger cart update event
        document.dispatchEvent(new CustomEvent('cart:updated'));

        // Reset button after delay
        setTimeout(() => {
          button.disabled = false;
          button.textContent = originalText;
        }, 2000);
      } else {
        throw new Error(result.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showNotification('Failed to add to cart', 'error');

      // Reset button
      button.disabled = false;
      button.textContent = originalText;
    }
  }

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();

      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
      });
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }

  handleSearch(event) {
    const query = event.target.value.trim();

    if (query.length < 2) {
      this.hideSearchResults();
      return;
    }

    this.performSearch(query);
  }

  async performSearch(query) {
    try {
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`);
      const data = await response.json();

      this.displaySearchResults(data.resources.results.products);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  displaySearchResults(products) {
    // Implementation would depend on your search results container
    const resultsContainer = document.querySelector('[data-search-results]');
    if (!resultsContainer) return;

    if (products.length === 0) {
      resultsContainer.innerHTML = '<p class="text-gray-400 p-4">No products found</p>';
      resultsContainer.classList.remove('hidden');
      return;
    }

    const resultsHTML = products.map(product => `
      <a href="${product.url}" class="flex items-center gap-3 p-3 hover:bg-gray-800 transition-colors">
        <img src="${product.featured_image}" alt="${product.title}" class="w-12 h-12 object-cover rounded">
        <div>
          <p class="text-white font-medium">${product.title}</p>
          <p class="text-gray-400 text-sm">${this.formatMoney(product.price)}</p>
        </div>
      </a>
    `).join('');

    resultsContainer.innerHTML = resultsHTML;
    resultsContainer.classList.remove('hidden');
  }

  hideSearchResults() {
    const resultsContainer = document.querySelector('[data-search-results]');
    if (resultsContainer) {
      resultsContainer.classList.add('hidden');
    }
  }

  initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in-up, .slide-in-right').forEach(el => {
      observer.observe(el);
    });
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg text-white transform translate-x-full transition-transform duration-300 ${
      type === 'success' ? 'bg-green-600' :
      type === 'error' ? 'bg-red-600' :
      'bg-blue-600'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Slide in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);

    // Remove after delay
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  formatMoney(cents) {
    // Basic money formatting - you may want to use Shopify's money filters instead
    return `$${(cents / 100).toFixed(2)}`;
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize theme functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeGlobal();
  initInfiniteParallax();
});

// Infinite parallax background effect
function initInfiniteParallax() {
  // Initialize CSS custom property
  document.documentElement.style.setProperty('--scroll-overlay', '0');

  // Scroll event for infinite darkening effect
  document.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;

    // Calculate infinite scroll progress - continues beyond 1
    const scrollProgress = scrolled / Math.max(documentHeight, 1);

    // Create infinite darkening effect that continues to get darker
    // Uses a logarithmic curve for more gradual darkening that never stops
    const maxOverlay = 0.9; // Maximum darkness (90% overlay)
    const scrollOverlay = Math.min(
      1 - Math.exp(-scrollProgress * 2), // Exponential curve for natural darkening
      maxOverlay
    );

    // Apply the overlay darkness
    document.documentElement.style.setProperty('--scroll-overlay', scrollOverlay);
  });
}

// Utility functions for other scripts
window.ThemeUtils = {
  formatMoney: (cents) => `$${(cents / 100).toFixed(2)}`,

  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Add product to cart
  addToCart: async (variantId, quantity = 1) => {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity
        })
      });

      if (response.ok) {
        document.dispatchEvent(new CustomEvent('cart:updated'));
        return await response.json();
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  },

  // Update cart item
  updateCart: async (variantId, quantity) => {
    try {
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity
        })
      });

      if (response.ok) {
        document.dispatchEvent(new CustomEvent('cart:updated'));
        return await response.json();
      } else {
        throw new Error('Failed to update cart');
      }
    } catch (error) {
      console.error('Update cart error:', error);
      throw error;
    }
  }
};
