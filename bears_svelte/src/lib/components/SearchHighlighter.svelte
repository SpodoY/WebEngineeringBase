<script lang="ts">
  import { searchQuery, searchActive } from '$lib/stores/search';
  import { highlightText, clearHighlights } from '$lib/utils/searchHighlighter';
  import { errorSnackbar } from '$lib/utils/snackbar';

  let { selector = 'article' } = $props();

  let q = $state('');
  let active = $state(false);

  searchQuery.subscribe(v => q = v);
  searchActive.subscribe(v => active = v);

  $effect(() => {
    console.log("triggered", q, active);
    if (!active) return;

    clearHighlights();

    if (!q) {
      errorSnackbar("Query cannot be empty")
      return;
    }

    const root = document.querySelector('article');
    if (!root) {
      errorSnackbar("No articles found to search")
      return
    }

    highlightText(q, selector);
  });
</script>
