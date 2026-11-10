---
title: "From WAL to Kafka: Turning Postgres Changes into Event Streams"
description: How PostgreSQL logical replication and the Debezium connector turn row-level database changes into Kafka event streams via Change Data Capture.
date: 2026-06-04
event: Seattle Postgres
eventUrl: https://www.meetup.com/seattle-postgres/
location: Seattle, WA
# TODO: add the video URL and any photos when you have them
slidesPdf: /slides/wal-to-kafka.pdf
# video: https://...
cover: ./photos/from-wal-to-kafka-slide-15.png
coverFit: contain
photos:
  - image: ./photos/from-wal-to-kafka-slide-15.png
    alt: "Slide titled Replication Slot Positions. A bar splits the WAL into three zones: OK to recycle, held for Debezium, and incoming / not yet read, with restart_lsn and confirmed_flush_lsn marking the boundaries. A warning says that if the connector goes offline the held zone grows, WAL accumulates and the disk fills up."
    caption: "Slide 15 from the talk: Diagram I made to help visualize the replication slot log sequence numbers in relation to the debezium connector's progress."
repos:
  - title: postgres-cdc-kafka-demo
    url: https://github.com/narissatsuboi/postgres-cdc-kafka-demo
    description: The demo from the talk. It uses the wal2json output plugin to emit row-level changes.
related:
  - title: Postgres Internals
    url: https://postgrespro.com/community/books/internals
    # note: 
  - title: "Mastering Postgres Replication Slots: Preventing WAL Bloat and Other Production Issues"
    url: https://www.morling.dev/blog/mastering-postgres-replication-slots/
    note: By Gunnar Morling.
# Thank you: people to thank by name (all fields but name are optional)
thanks:
  - name: Jeremy Schneider
    role: Organizer
    url: https://www.linkedin.com/in/ardentperf/
    note: Thank you for encouraging me to speak on this topic, and for teaching me about the WAL!
# Remove this line to publish the talk.
draft: true
---

I gave this talk at the [Seattle Postgres](https://www.meetup.com/seattle-postgres/) meetup in June 2026. Using a fictitious scenario where the audience and myself are software engineers at a fictitious AI company with a fictitious AI agent (Anthropix and Clyde), we learned how Postgres logical replication, together with replication slots and the Debezium connector, turn row-level changes into Kafka event streams via Change Data Capture -- and how CDC can power downstream operations at Anthropix as it scales.

It also covered the key configuration on both the Postgres and connector sides, common use cases, monitoring replication lag and WAL growth, and the production performance tradeoffs.

Something that really bothered me when learning about the write ahead log was that I couldn't outright read the log entries in human words instead of bytes. So this talk also included a demo of how to decode the WAL to JSON in real time, visualize each row level change, then that row level change as an event in Kafka.

The video isn't uploaded yet, but you can check out other Seattle Postgres talks on the [SEAPUG YouTube channel](https://www.youtube.com/@seattle-postgres).
