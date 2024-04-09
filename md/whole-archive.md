title: Downloading the entire IF Archive
changedate: April 9, 2024

Occasionally we hear from someone who wants to download every file we've got.

That's fine! Feel free. However:

- Please respect our [terms of use](license.html). The files archived here have been contributed by many hands over a period of decades. Some of them have open-source or Creative Common licenses. Others do not; they rely on common understanding of the IF Archive, which is that this is a place to share the heritage of our community. If you see no formal license on a work, assume it is meant for "personal use only".

- Please do not thrash the server. If you want to download a zillion files, throttle your download speed or allow a moment of rest time between files.

### Downloading with rsync

In early 2024 we experimented with the idea of making the entire Archive downloadable in a single massive tar file. It wound up being about 30 gigabytes. Sadly, the AWS bandwidth cost of this did not justify the added value.

Instead, we now support `rsync` to fetch Archive files. The `rsync` protocol allows you to maintain a synchronized copy of the entire Archive. After the initial download, it will only fetch files that have changed.

We offer four rsync sources:

`rsync://rsync.ifarchive.org/if-archive`
: All the files in the Archive. (32 GB, that's "giga")

`rsync://rsync.ifarchive.org/indexes`
: HTML index pages for each directory. (58 MB)

`rsync://rsync.ifarchive.org/metadata`
: JSON/XML metadata files for each file with metadata. (68 MB)

`rsync://rsync.ifarchive.org/misc`
: Miscellaneous files and documentation. (1 MB)

(Sizes are as of early 2024. They all grow from year to year.)

Since web use is our primary customer (and `rsync` is not protected by a CDN), the `rsync` service has a modest bandwidth limit. Fetching the entire Archive (the first time!) will take roughly 45 minutes.
