const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'JOU7I1MXZL',
  '052c2e3efdc0d0f8161216f67955f34b'
);

const search = instantsearch({
  indexName: 'posts',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
        <article>
          <div>
            <h1>${components.Highlight({ hit, attribute: 'title' })}</h1>
            //ovde moze i email na ovu foru iznad kao title
          </div>
        </article>
      `,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.dynamicWidgets({
    container: '#dynamic-widgets',
    fallbackWidget({ container, attribute }) {
      return instantsearch.widgets.panel({
        templates: { header: () => attribute },
      })(instantsearch.widgets.refinementList)({
        container,
        attribute,
      });
    },
    widgets: [],
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
  instantsearch.widgets.stats({
    container: '#stats',
  }),
  instantsearch.widgets.hitsPerPage({
    container: '#hits-per-page',
    items: [
      { label: '8 hits per page', value: 8, default: true },
      { label: '16 hits per page', value: 16 },
    ],
  })
 
]);

search.start();
