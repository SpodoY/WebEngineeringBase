<script lang="ts">
  import { performSearch, clearSearch } from '$lib/stores/search';
  import { warnSnackbar } from '$lib/utils/snackbar';

  let searchInput = $state('');

  function submitSearch(e: Event) {
    e.preventDefault();
    const query = searchInput.trim();

    if (!query) {
      warnSnackbar('Please enter a search term');
      return;
    }

    console.log(query);
    performSearch(query);
  }

  function handleClear() {
    searchInput = '';
    clearSearch();
  }
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>
<a href="#search-form" class="skip-link">Skip to search form</a>

<nav id="navigation" aria-label="main navigation">
  <ul>
    <li><a href="#" aria-current="page">Home</a></li>
    <li><a href="#">Our team</a></li>
    <li><a href="#">Projects</a></li>
    <li><a href="#">Blog</a></li>
  </ul>

  <form class="search-box" onsubmit={submitSearch}>
    <input
      type="search"
      name="q"
      placeholder="Search..."
      bind:value={searchInput}
    />
    {#if searchInput}
      <button type="button" class="clear-btn" onclick={handleClear}>x</button>
    {/if}
    <button type="submit" class="search-btn">Search</button>
  </form>
</nav>