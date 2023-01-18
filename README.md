# podcaster

This application retrieves the top 100 podcasts from Apple.

# Flow & Contents

## Homepage

The home provides a list of top 100 podcasts. Whether you are a returning user or not, these will be:
- requested to the Apple API upon new users visiting
- cached via client-side in `localStorage` for 24 hours for all upcoming visits from a same client.
  - if 24 hours have passed, they will be rerequested to the API & renewed
  - if you are still in the 24 hour window, no additional requests happen

While exploring, you will be enabled to filter these podcasts either by:
- podcast title
- podcast author

Clicking on a title will lead you to that podcast overview.

## Podcast Overview

...

## Podcast Chapter

...

# Architecture

...
