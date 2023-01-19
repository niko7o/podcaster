# podcaster

Podcaster is an application that retrieves the top 100 podcasts from Apple.

# Architecture

- Next.js 13 with Typescript
- CSS variables, SCSS for better dev experience with mixins & maintainability
- Webpack for Production build optimization
- Cypress for end-to-end testing
- Jest for unit testing
- Vercel for deployment
- `localStorage` for client-sided temporary data storing & fetching

# Setup / Scripts

### Run the app locally:

- clone the repo locally: `git clone git@github.com:nikotomad/podcaster.git` 
- execute `npm install` or `yarn` depending on your package manager
- run `yarn dev` to start the build locally
- run `e2e:open` to execute end-to-end scenarios
- run `yarn test` to execute unit tests

### Run the app optimized for production:

- it was deployed to: https://podcaster-eight.vercel.app
- however, you can also run `yarn build` to generate production builds that will appear in the `.next/` folder and see the webpack asset optimizations


# Notes / Final thoughts

- Given the API is not under our domain & has a heavy amount of data, we have limited the podcast results to `30`. For an ideal user experience and less loading times, we could ideally paginate these results.

- I come from a background of React in my previous company but wanted to explore TypeScript - if you see anything goofy or improvable with the Types structure or similar, feedback will be welcome with open arms. I don't know the conventions / best practices fully just yet.

- Although the original design did not come with mobile designs, these styles were developed in a Mobile First manner with some breakpoints building up to Tablet and Desktop. Feel free to take a look from your mobile phone device at https://podcaster-eight.vercel.app

- The approach of the designs was strictly maintained to those proposed in the PDF, as asked on the page 2 of the exercise summary.

# Architecture optimizations

- For a more "production-ready" approach if this was a realistic use-case: we could have *avoided doing queries in the client-side* and done them in the server-side instead. Benefits would have included:
  - faster page load times with less impact on the browser with things to compute: the page doesn't need additional javascript to render.
  - *less rerenders* (no need to use setState since the data can be fed directly computed via props, a context or similar)
  - better *Google Core Web vitals* since the browser has to do less 
    - cumulative layout shift would be heavily improved since the pages mount with data solved/fetched already
    - largest contentful paint would improve dramatically on its `Element render delay` submetric 
    - for curiosity: https://web.dev/optimize-lcp/
  - as side effect of the above, better SEO performance
    - for curiosity: https://searchengineland.com/server-side-rendering-what-seos-need-to-understand-346296

- A more robust caching solution like *redis* would have been ideal here for `key:value` structure
  - time-based expirations for validity would have been as easy as passing an extra `EX` parameter without any date handling as we did
  ```js
    await redisClient.set(podcasts, JSON.stringify(results), {
        EX: 86400, // cache validity in seconds, one day
    }
  ```
  - for curiosity: https://www.digitalocean.com/community/tutorials/how-to-implement-caching-in-node-js-using-redis
