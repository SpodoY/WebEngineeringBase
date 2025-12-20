<script lang="ts">
  import { fallbackImage } from '$lib/utils/bears';
  import type { Bear } from '$lib/types/Bear';

  type BearsSectionProps = {
    bears: Bear[];
  }

  let { bears }: BearsSectionProps = $props();
</script>

<section class="more_bears" aria-labelledby="more-bears-heading">
  <h2 id="more-bears-heading">More Bears</h2>
  <div
    class="more-bears"
    role="region"
    aria-busy="true"
    aria-live="polite"
  >
    {#each bears as bear (bear.name)}
      <p style="font-size: 2rem"> <strong> {bear.name} </strong> {bear.binomial} - {bear.range.desc} </p>
      <div class="image-row">
        <img src="{bear.image.url}"
             style="width: auto; height: 200px"
             alt="${bear.image.alt}"
             onerror={fallbackImage}
             loading="lazy">

        <img src="{bear.range.url}"
             style="width: auto; height: 200px"
             loading="lazy"
             onerror={fallbackImage}
             alt="I am to lazy to also load this">
      </div>
    {/each}
  </div>
</section>