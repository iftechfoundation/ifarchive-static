
First, have a look at the [Archive uploading info][pubdocs]. This is the public post which explains the upload procedure to our users.

[pubdocs]: uploader-docs.html

## General principles

*Follow the existing patterns.* We have a lot of precedent. When in doubt, look for the way it was done last time.

*Don't move or rename files without a good reason.* Archive URLs are supposed to be permanent. (See [overview][].)

[overview]: org-overview.html

*We hate to throw away files.* We're supposed to be an archive. That means saving stuff.

## The Incoming directory

Every uploaded file lands in the Incoming directory. If it's valid, it should be moved to the Unprocessed directory. If it's spam, trash, or malware, it should be deleted.

Our current goal (as stated in the [public info page][pubdocs]) is to move files from Incoming to Unprocessed within 24 hours. We'll see if this is workable.

The procedure is:

- Download the file and make sure it's the type it says it is.
- If it's obviously spam, delete it.
- If it's a Twine game (or any HTML with embedded Javascript), hit the Zip button to zip it up.
- Hit the Move button to move it to Unprocessed.

Note that if there's too much data in Incoming, further uploads are blocked. (We don't advertise the exact limit, but it's measured in total file size, not number of files.) This is a good reason to move files promptly to Unprocessed.

### Multiple copies uploaded

It's pretty common for someone to upload a file and then say "Whoops, that was the wrong file, here's the right one."

- Keep the right one and trash the wrong one(s).
- If the new filename looks like `My Game (correct version!).html` then rename it to the intended filename.
- If the new filename looks like `My Game.html.1701652627.9965498`, then trailing bit is a timestamp. (Sorry, it's ugly.) This is what happens if someone uploads the exact same filename twice. Use the latest version, and rename it to remove the timestamp.

## The Trash directory

Deleted files go to the Trash directory. This means you can always get them back, if you don't wait too long. Trashed files older than 30 days are deleted forever.

When you edit an Index file, the old version goes to the Trash directory. So if you screw up an edit, you can get the old version back. (This is why Trash has so many files named `Index-foo-bar.1`.)

Similarly, when you zip up an HTML file, the original version goes to the Trash.

## Special cases

A few services (IFWiki, IFDB, the IF Forum) have special privileges to upload files without using the standard upload form. That means files appear in Incoming *without any upload info*. (If you hit the "info" link, it will say "No upload information recorded for this file.")

This should happen *only* for service backup files, which get archived as follows:

- IFDB backups: [if-archive/info/ifdb](https://ifarchive.org/indexes/if-archive/info/ifdb/)
- IFWiki backups: [if-archive/info/ifwiki](https://ifarchive.org/indexes/if-archive/info/ifwiki/)
- Forum backups: [if-archive/info/intficforum](https://ifarchive.org/indexes/if-archive/info/intficforum/)

Note that IFComp uploads *do* come in through the standard upload form.

