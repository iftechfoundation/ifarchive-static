title: IF Archive volunteer procedures
changedate: February 15, 2025

First, have a look at the [Archive uploading info][pubdocs]. This is the public post which explains the upload procedure to our users.

[pubdocs]: uploader-docs.html

## General principles

*Follow the existing patterns.* We have a lot of precedent. When in doubt, look for the way it was done last time.

*Don't move or rename files without a good reason.* Archive URLs are supposed to be permanent. (See [overview][].)

[overview]: org-overview.html

*We hate to throw away files.* We're supposed to be an archive. That means saving stuff.

*No live scripting in files directly accessible on the Archive.* Twine games, and any other HTML with embedded scripting, should be zipped. That way they can be played via Unbox, but they don't pose a security risk to the Archive itself.

*The definition of "interactive fiction" is not rigid.*

## The Incoming directory

Every uploaded file lands in the Incoming directory. If it's valid, it should be moved to the Unprocessed directory. If it's spam, trash, or malware, it should be deleted.

Our current goal (as stated in the [public info page][pubdocs]) is to move files from Incoming to Unprocessed within 24 hours. We'll see if this is workable.

The procedure is:

- Download the file and make sure it's the type it says it is.
- If it's obviously spam, delete it.
- If the file is larger than 100MB, start a discussion with the rest of the team. See "Particularly large files", below. Note, as long as it's not spam, it's a good idea to move incoming files to Unprocessed, even if we're not sure we'll keep the file permanently, just to ensure that further uploads don't get blocked.
- If it's a Twine game (or any HTML with embedded Javascript), hit the Zip button to zip it up.
- Rename the file if necessary to clean it up.
    - Remove editorial notes like `-final-release-` or `-this-one-works-`.
    - We prefer to store games with no version number, so that future updates keep the same URL. Remove version numbers as needed.
    - Other software (interpreters, compilers, etc) keep their version numbers.
    - When in doubt, look at how older files are stored and follow the existing pattern.
- Hit the Move button to move it to Unprocessed.

Note that if there's too much data in Incoming, further uploads are blocked. (We don't advertise the exact limit, but it's measured in total file size, not number of files.) This is a good reason to move files promptly to Unprocessed.

### Multiple copies uploaded

It's pretty common for someone to upload a file and then say "Whoops, that was the wrong file, here's the right one."

- Keep the right one and trash the wrong one(s).
- If the new filename looks like `My Game (correct version!).html` then rename it to the intended filename. (See above.)
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

### HTML games in various dev systems

HTML games in Twine, Ink, and Texture should be moved to `games/twine`, `games/ink`, and `games/texture`. All other HTML games should be moved to `games/html`.

Most of the games in the archive are organized by _output format_. Multiple IF dev systems may generate output files in the same output format. For example, Inform, ZIL, and Dialog can all generate Z-Code files. All Z-Code games go into `if-archive/games/zcode`, regardless of the dev system that was used to create them.

There are many dev systems that can generate output files in HTML format, including Twine, Adventuron, Ink, Texture, and even Inform. Unfortunately, we didn't make a very clear decision early on between whether to organize HTML files by dev system (`games/twine`) or by output format (`games/html`).

So we're going to follow existing patterns, with Twine, Ink, and Texture games in their own folders, and all other HTML games in `games/html`.

(Note that we always organize `games/source` by _dev system_. For example, we have separate directories for `games/source/inform` and `games/source/dialog` games. We'll continue to follow that pattern too.)

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

Fill in the description and metadata.

- For a game, use "GameName, by Person." Add release and version number if available.
- For other files, the uploader's description is a good starting place.
- If you're replacing an older version (now in `old`) you can look at its metadata. Copy the `tuid` and `ifwiki` lines if they exist -- those will be the same for the new version.
- If the file has an "IFDB temp ID" field (it was uploaded via IFDB), hit the "Notify IFDB" button on the "(info)" page. This tells IFDB to update its file links to point at the game's final position. If you get "no pending link" then you may want to update IFDB by hand.

Email the user who uploaded the file, and tell them it's done. (The email address is in the file info.) Provide a link to the index page, a link to the file itself, and, if the file was zipped, the "view contents" link (for playing via Unbox).

TO DO: It would be nice if the admintool had a "send email" button which filled in all of that stuff for you.

### Replacing old versions

We're supposed to be an archive. That means *don't delete old versions of files*.

If a new version of an existing file comes in, the old version should be moved to an `old` subdirectory. For example, if you're replacing a game in `if-archive/games/twine`, the old version goes to `if-archive/games/twine/old`.

After moving the file to `old`, rename it to include the (old) version number. That way, if *another* new version comes in, there's no filename collision in the `old` dir.

After replacing an existing file, hit the "Uncache" button. This tells CloudFlare that a new version exists. (You don't have to do this when storing a new file -- only when there's an old version that CloudFlare might have cached.)

Replacing a `.zip` file takes a certain amount of care, because zip files are *also* cached by the Unbox service. The best practice is:

- Replace the zip file.
- Hit "Rebuild".
- Hit "Uncache" on the file.
- Wait at least five minutes before visiting the Unbox "View contents" link! (This is the confusing bit. Unbox can take up to five minutes to notice a new file even after you've rebuilt and uncached. If you visit in that period, it might cache and display the *old* version. If that happens, roll your eyes, wait five minutes, and hit "Uncache" again.) (Or just don't visit "View contents" at all -- you don't really have to.)

### IFComp games

IFComp is a special case. The `if-archive/games/competition20XX` folder always preserves the games *as they were released during IFComp*.

Mid-comp releases (before the end of voting) go in `if-archive/games/competition20XX/Games`. The older, start-of-comp release is moved to `if-archive/games/competition20XX/Games/old`.

Releases after the end of voting ("post-comp") do *not* go in `competition20XX`. We want to preserve `competition20XX` exactly as it was when the results came out. Therefore, post-comp releases go in the appropriate `if-archive/games/format` dir. (Include a line in the description saying "Original IFComp release is at ...".)

(Note that the difference between "mid-comp" and "post-comp" is about when the game was released on the IFComp web site, not when it was uploaded to the IF Archive. It's possible that a mid-comp release gets uploaded late. Check the compile date or serial number to be sure.)

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

## What is interactive fiction anyway?

This is a hard question. There is plenty of fuzzy territory; lots of ways to say "Well, that is *similar* to stuff we already consider IF."

IFTF policy is that *IFTF is not in charge of nailing down these boundaries*. Most of our services are ultimately governed by (moderated) community standards: what games can be discussed on the forum, what games can be entered into IFComp, what games can be listed on IFDB and IFWiki.

That said, spam is real. If someone uploads a physics textbook or a graphical shoot-em-up game, that's probably not IF.

Reasons that lean towards an item being IF or IF-related:

- Primarily text, or has primarily text-based interactivity.
- Part of an IF-centric competition or game jam.
- Built using the IF tools that we handle. (Twine, Inform, TADS, etc.)
- Built by people who are active in the IF community.
- Already discussed on our other services (forum, IFDB, etc).

None of these are rigid rules. There are always going to be people who try to game the system by uploading a file to the Archive *and* starting a forum thread *and* an IFDB entry, all at once. Raise the question on the Slack or mailing list if you're unsure.

## Special cases

### IFTF service backups

A few services (IFWiki, IFDB, the IF Forum) have special privileges to upload files without using the standard upload form. That means files appear in Incoming *without any upload info*. (If you hit the "info" link, it will say "No upload information recorded for this file.")

This should happen *only* for service backup files, which get archived as follows:

- IFDB backups: [`if-archive/info/ifdb`](https://ifarchive.org/indexes/if-archive/info/ifdb/)
- IFWiki backups: [`if-archive/info/ifwiki`](https://ifarchive.org/indexes/if-archive/info/ifwiki/)
- Forum backups: [`if-archive/info/intficforum`](https://ifarchive.org/indexes/if-archive/info/intficforum/)

Note that IFComp uploads *do* sometimes come in through the standard upload form. These are enormous, so make sure these get moved to Unprocessed right away.

### Particularly large files

Speaking of enormous...

As of early 2025, the archive contains some 37 gigabytes of files. (Up from 30 gigabytes in 2023!) A file that adds half a gigabyte to that total is a significant bump. The marginal cost of a gigabyte is small, but if we accept large files unthinkingly, we'd be on a path to having ten times as many gigabytes pretty soon.

We should take a closer look at files that are over 1GB, and discuss them with the rest of the team. You can email the webuploaders list, or you can chat about it on Slack. Ask questions like these:

- Does it make sense to ask the uploader/author to make the file(s) smaller?
- If the files contain large images or sounds, does the author have the rights to that material? (Always a question, but as a practical matter, we look at images and music harder.)
- Which aspects of interactive fiction apply to this file? (Again, we have to be more strict about large files, simply because there are people who want to leech our storage space for large files.)

### Files uploaded by someone other than the author

In the early days, people uploaded all sorts of IF-related content to the archive. (Back when it was an FTP site!) There was a general agreement to not upload *commercial* games (like Infocom game files). But we didn't really have a notion of "open-source licensing".

These days, we try to be more careful. The [terms of service](https://ifarchive.org/misc/license.html) say:

> We prefer that material be donated by the original author or someone with the legal right to accept these terms. However, we understand that some IF-related material, particularly from the early years, was distributed with no clear license or terms. We host this material as part of the common heritage of interactive fiction. If you donate work which you did not create, you warrant that, to the best of your knowledge, it may be legitimately stored and distributed by the Archive. If you are a copyright owner and wish to dispute our use of your work, please contact us. If you wish to file a DMCA takedown notice, see below `[email to dmca@ifarchive.org]`.

Do your best. Try to figure out whether the file was originally intended to be freely distributed. If the original author can be contacted, do that.

### Deletion requests

Very occasionally, someone asks us to delete a file. This happens rarely enough that we should pretty much always discuss it on Slack.

Ask questions like these:

- Is the file's original author asking for it to be deleted? (We prefer not to host files without the author's permission; see above.)
- Is the file historically significant? (Competition entries; widely-discussed or influential games.)
- Is it spam, trash, or malware? (We try to delete those before we make them publicly available on the archive, but if we miss one, we can delete it after the fact.)
- Is the file a duplicate of another file in the archive? (An exact duplicate, or a near duplicate? If it's a near duplicate, are the differences historically important?)

It may be worth raising these issues with the requester. Do they *really* want the file to be deleted? Would it be okay to remove their name from the game listing rather than deleting the game entirely?

Sometimes people are confused about the difference between IFDB and the IF Archive. They may want to remove bad reviews of a game, rather than the game itself. Direct such people to IFDB.
