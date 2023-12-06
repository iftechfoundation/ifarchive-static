
First, have a look at the [Archive uploading info][pubdocs]. This is the public post which explains the upload procedure to our users.

[pubdocs]: uploader-docs.html

## General principles

*Follow the existing patterns.* We have a lot of precedent. When in doubt, look for the way it was done last time.

*Don't move or rename files without a good reason.* Archive URLs are supposed to be permanent. (See [overview][].)

[overview]: org-overview.html

*We hate to throw away files.* We're supposed to be an archive. That means saving stuff.

*No live scripting in files directly accessible on the Archive.* Twine games, and any other HTML with embedded scripting, should be zipped. That way they can be played via Unbox, but they don't pose a security risk to the Archive itself.

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

## Moving files to their permanent homes

For most uploads, this is easy. The "suggested dir" in the file info is very often correct.

Games go in the `if-archive/games` subdirectory appropriate to their format. If they're not in English, there's usually a `if-archive/games/format/language` directory.

Development tool uploads are usually new versions of an existing tool. So you can easily find where it's supposed to be.

If you don't know where something goes, or if the "suggested dir" is clearly wrong, ask on the Slack.

### Files related to other files

Sometimes we get two related uploads. For example, an author might upload a game file and its source code separately.

The convention is to put the game in the appropriate `if-archive/games/format` folder, and the source in `if-archive/games/source/format`. The description for each one should refer to the other. For example:

```
# GameName.z5

GameName, by Person.
(source code is in games/source/inform/GameName.inf)
```

```
# GameName.inf

Source code for GameName, by Person.
(the compiled game is in games/zcode/GameName.z5)
```

You would do something similar if a game is uploaded in two formats, or in a language translation.

### Files that go in more than one place

An author might upload a zip file which contains the game *and* its source code.

In this case, you should put the file in `if-archive/games/format`, and then create a symlink in `if-archive/games/source/format` pointing to the file.

(Note that the admintool does not yet have the ability to create a symlink.)

The descriptions would look like:

```
# GameName.zip

GameName, by Person.
Archive contains the game and source code.
(file is linked from games/source/inform/GameName.zip)
```

```
# GameName.zip

GameName, by Person.
Archive contains the game and source code.
(file is linked to games/zcode/GameName.zip)
```

(Here the descriptions are exactly the same, except the original says "linked from" and the symlink says "linked to".)

### After you move a file

Email the user who uploaded the file, and tell them it's done. (The email address is in the file info.) Provide a link to the index page, a link to the file itself, and, if the file was zipped, the "view contents" link (for playing via Unbox).

TO DO: There should also be a button to notify IFDB that the file has moved. (If the file was uploaded via the IFDB form, IFDB will know about it and can update its links automatcally.) This button does not yet exist.

### Replacing old versions

We're supposed to be an archive. That means *don't delete old versions of files*.

If a new version of an existing file comes in, the old version should be moved to an `old` subdirectory. For example, if you're replacing a game in `if-archive/games/twine`, the old version goes to `if-archive/games/twine/old`.

After moving the file to `old`, rename it to include the (old) version number. That way, if *another* new version comes in, there's no filename collision in the `old` dir.

### IFComp games

IFComp is a special case. The `if-archive/games/competition2023` folder always preserves the games *as they were released during IFComp*. These are never updated or replaced.

Post-comp releases go in the appropriate `if-archive/games/format` dir.

## Index files and metadata

Again, see the [overview][] for an explanation.

You can edit the description and metadata for any file (except those in Incoming, Unprocessed, or at the root level of the Archive).

You do this by hitting the Edit Index button for the file entry. You can also hit the Edit Index button at the top of the page; this edits the description and metadata for the *directory* (distinct from any of its contents).

There's a separate Edit Index File button which lets you edit the entire Index file for the directory -- the directory *and* all its contents. This is handy for making mass changes.

As for what to put *in* the metadata -- follow established patterns.

- Our current rule for games is to write "Title, by Author." (With the period.)
- If there's a version number, include that. For Inform games, include both the release number and the serial number.
- For post-comp releases of IFComp games, include a line "(the original competition entry is at PATH)".

Remember that Index file descriptions are [Markdown][]. Markdown removes single line breaks. So Index descriptions will appear on the page as one long paragraph, unless you deliberately leave a blank line. (Which we usually don't.)

[Markdown]: https://daringfireball.net/projects/markdown/syntax

## Special cases

A few services (IFWiki, IFDB, the IF Forum) have special privileges to upload files without using the standard upload form. That means files appear in Incoming *without any upload info*. (If you hit the "info" link, it will say "No upload information recorded for this file.")

This should happen *only* for service backup files, which get archived as follows:

- IFDB backups: [`if-archive/info/ifdb`](https://ifarchive.org/indexes/if-archive/info/ifdb/)
- IFWiki backups: [`if-archive/info/ifwiki`](https://ifarchive.org/indexes/if-archive/info/ifwiki/)
- Forum backups: [`if-archive/info/intficforum`](https://ifarchive.org/indexes/if-archive/info/intficforum/)

Note that IFComp uploads *do* come in through the standard upload form.
