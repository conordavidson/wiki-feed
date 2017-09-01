# Wiki-Feed
Visualizes Wikipedia's recent changes Real-Time API

<!-- **Link to project:** http://recruiters-love-seeing-live-demos.com/ -->

## How It's Made:

**Tech used:** React, EventSource Web API, D3, Rickshaw, HTML, CSS.

The main Wiki-Feed React component listens to Wikipedia's recent changes Real-Time API and sends the content downstream to the following components:

  Chart - Plots contributions/second by language on a Rickshaw area graph.
  Allcontributions - Counts all contributions.
  Contributors - Counts total contributions per language.
