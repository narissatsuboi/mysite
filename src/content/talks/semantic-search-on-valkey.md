---
title: "Applying Semantic Search on a Valkey Cache with valkey-py and valkey-search"
description: Using valkey-search for semantic search against a cache, demoed with valkey-py and valkey-search.
date: 2026-08-19
event: Puget Sound Programming Python (PuPPy)
eventUrl: https://www.pspython.com/
location: Seattle, WA
# TODO: add the video URL when it is uploaded
slidesPdf: /slides/valkey-semantic-search.pdf
# video: https://...
cover: ./photos/semantic-search-talk.jpg
photos:
  - image: ./photos/semantic-search-talk.jpg
    alt: Narissa Tsuboi presenting the title slide of the talk to a seated audience
    caption: Presenting at PuPPy.
  - image: ./photos/semantic-search-motherduck-puppy.jpg
    alt: Welcome sign for the Python PuPPy Meetup, co-hosted by MotherDuck, with a duck and a corgi illustration
    caption: The meetup was co-hosted by MotherDuck.
  - image: ./photos/semantic-search-ducks.jpg
    alt: Shelves of rubber ducks and duck toys, including a crocheted duck and a sparkly duck
    caption: Rubber ducks on display.
repos:
  - title: valkey-semantic-search-demo
    url: https://github.com/narissatsuboi/valkey-semantic-search-demo
    description: The demo from the talk, using valkey-py and valkey-search.
related:
  - title: "Unlocked Conference - Dmitry Polyakovsky: Valkey and Semantic Caching"
    url: https://www.youtube.com/watch?v=pQfpTe7CY80
  - title: "Semantic Caching with Valkey and Redis: Reducing LLM Cost and Latency - Martin Visser"
    url: https://www.youtube.com/watch?v=7vdFUJgGOSs
  - title: valkey-py documentation
    url: https://valkey-py.readthedocs.io/en/latest/index.html
  - title: Valkey Search
    url: https://valkey.io/topics/search/
  - title: How a Postgres Meetup Got Me Hooked
    url: /blog/meetups-got-me-into-postgres
    note: A blog post on why I value giving and getting help in local tech communities.
# Thank you: people to thank by name (all fields but name are optional)
# thanks:
#   - name: Organizer Name
#     role: Organizer
#     url: https://example.com
#     note: A short personal thank-you.
# Remove this line to publish the talk.
draft: true
---

I gave this talk at [Puget Sound Programming Python (PuPPy)](https://www.pspython.com/) in August 2026. The focus was semantic search against a cache as a way to save money on RAG pipeline calls and agentic spend, with a demo using [valkey-py](https://github.com/valkey-io/valkey-py), the open source Python client, and `valkey-search` to search RGB color vectors by RGB ratio similarity. Semantic search support was added to the Valkey client as of March 2026. I learned about it at ValkeyConf and that's how I found this topic!

This was a super lively crowd, even though it was over 80 degrees in the space! I ran out of fuel due to the heat at the end but overall had a great time, got a lot of laughs and positive feedback from the audience.

The video isn't uploaded yet, but you can check out other PuPPy talks on the [PuPPy YouTube channel](https://www.youtube.com/@PSPython).
