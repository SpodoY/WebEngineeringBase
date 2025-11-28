<script lang="ts">
  import CommentSection from '$lib/components/CommentSection.svelte';
  import SearchHighlighter from '$lib/components/SearchHighlighter.svelte';
</script>

<main id="main-content">
  <article aria-labelledby="article-title">
    <h1 id="article-title">The trouble with Bears</h1>
    <p>
      By
      <span class="author" aria-label="author of the article"
      >Evan Wild</span
      >
    </p>

    <p>
      Tall, lumbering, angry, dangerous. The real live bears of this world
      are proud, independent creatures, self-serving and always on the hunt
      for food.
    </p>

    <section aria-labelledby="bear-types-heading">
      <h2 role="contentinfo" id="bear-types-heading">Types of bear</h2>
      <table aria-rowcount="2">
        <caption class="sr-only">
          Comparison of bear types by their characteristics
        </caption>
        <thead>
        <tr>
          <th scope="col">Bear Type</th>
          <th scope="col">Coat</th>
          <th scope="col">Adult size</th>
          <th scope="col">Habitat</th>
          <th scope="col">Lifespan</th>
          <th scope="col">Diet</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">Wild</th>
          <td>Brown or black</td>
          <td>1.4 to 2.8 meters</td>
          <td>Woods and forests</td>
          <td>25 to 28 years</td>
          <td>Fish, meat, plants</td>
        </tr>
        <tr>
          <th scope="row">Urban</th>
          <td>North Face</td>
          <td>18 to 22</td>
          <td>Condos and coffee shops</td>
          <td>20 to 32 years</td>
          <td>Starbucks, sushi</td>
        </tr>
        </tbody>
      </table>
    </section>

    <section aria-labelledby="bear-habitats-heading">
      <h2 role="contentinfo" id="bear-habitats-heading">
        Habitats and Eating habits
      </h2>
      <p>
        Wild bears eat a variety of meat, fish, fruit, nuts, and other
        natually growing ingredients...
      </p>

      <figure>
        <img src="media/wild-bear.jpg" alt="Wild bear in forest" />
        <figcaption class="sr-only">Wild bear in forest</figcaption>
      </figure>

      <p>
        Urban (gentrified) bears on the other hand have largely abandoned
        the old ways...
      </p>

      <figure>
        <img src="media/urban-bear.jpg" alt="Urban bear near buildings" />
        <figcaption class="sr-only">Urban bear near buildings</figcaption>
      </figure>
    </section>

    <section aria-labelledby="bear-mating-heading">
      <h2 role="contentinfo" id="bear-mating-heading">Mating rituals</h2>

      <p>Bears are romantic creatures by nature...</p>

      <figure>
        <figcaption class="sr-only">Bear mating rituals</figcaption>
        <audio controls aria-label="Bear mating call audio recording">
          <source src="media/bear.mp3" type="audio/mp3" />
          <source src="media/bear.ogg" type="audio/ogg" />
          <track src="media/bear.vtt" kind="captions" label="English" srclang="en" />
          <p>
            It looks like your browser doesn't support HTML5 audio players.
            <a href="media/bear.mp3" download>Download audio file</a>
            instead.
          </p>
        </audio>
      </figure>
    </section>

    <aside aria-labelledby="author-heading" role="complementary">
      <h2 id="author-heading">About the author</h2>
      <p>Evan Wild is an unemployed plumber from Doncaster...</p>
    </aside>

    <CommentSection />

    <section class="more_bears" aria-labelledby="more-bears-heading">
      <h2 id="more-bears-heading">More Bears</h2>
      <div
        class="more-bears"
        role="region"
        aria-busy="true"
        aria-live="polite"
      >
        <p id="more-bears-loading">...Loading more bears</p>
      </div>
    </section>
  </article>

  <aside
    class="secondary"
    role="complementary"
    aria-labelledby="realted-heading"
  >
    <h2 id="realted-heading">Related</h2>
    <nav aria-label="related-articles" class="aside-link-container">
      <ul>
        <li><a href="#">The trouble with Bees</a></li>
        <li><a href="#">The trouble with Otters</a></li>
        <li><a href="#">The trouble with Penguins</a></li>
        <li><a href="#">The trouble with Octopi</a></li>
        <li><a href="#">The trouble with Lemurs</a></li>
      </ul>
    </nav>
  </aside>
</main>

<footer role="contentinfo">
  <p>©Copyright 2050 by nobody. All rights reversed.</p>
</footer>

<SearchHighlighter />