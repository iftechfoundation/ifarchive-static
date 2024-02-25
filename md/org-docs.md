title: Using the Archive Admin Tool

The Admin Tool allows Archive volunteers to file Archive uploads and edit their descriptions. It's a fairly straightforward web interface.

Note that there is no public login to the Admin Tool. Only Archive volunteers have accounts.

This document assumes that you have full volunteer permissions. Current policy is that all volunteers have full permissions, but we may someday add people with more limited roles. (E.g., "description editing only".) People with limited roles won't see all of the controls described here.

[procedures]: org-procedures.html
[overview]: org-overview.html

## Your account

Your account settings are available by clicking your name (in the upper right corner). You can change your password and set your time zone from this page.

## Navigation

The main navigation bar lists where you can go. Most of these pages contain lists of files.

- **Home:** The front page. The "Rebuild Index" button lives here.
- **UploadLog:** Recent upload records from the [upload form][uploadform]. You can browse earlier entries using the "Next 20 →" link at the bottom of the page.
- **Incoming:** Newly uploaded files. Not publicly visible.
- **Unprocessed:** Uploaded files which have been vetted but not yet moved to their final destination. This page is visible to the public as [/unprocessed][ifunproc].
- **Archive:** The root directory of the Archive. You can navigate to all Archive folders (including /unprocessed) by selecting subdirectories from here.
- **Trash:** Files which have been deleted are moved here. If you delete something by accident, this is where to look. Files in the Trash are deleted after 30 days. Not publicly visible.
- **AdminLog:** Recent activity in the AdminTool by all the volunteers. You can see who's doing what.

[uploadform]: https://upload.ifarchive.org/cgi-bin/upload.py
[ifunproc]: https://ifarchive.org/indexes/if-archive/unprocessed/

## Upload info

You can view the upload info for any file by clicking its "(info)" link. For convenience, the Incoming and Unprocessed pages show the upload info for each listed file. Archive pages don't, but that's what "(info)" is for.

Most of the older files on the Archive have no upload info. That's because they were contributed before the [upload form][uploadform] existed.

Occasionally a file will have two or more upload records. This can occur if a file is uploaded twice, with identical content but different upload info. See "Multiple copies uploaded" in the [Procedures doc][procedures].

Most of the upload record is taken straight from the [upload form][uploadform]. The only possibly confusing elements:

- "Original filename": If a file is uploaded twice, one of the copies will be distinguished by a timestamp stuck on the filename. "Original filename" shows what the file was named on the originator's machine. Also, if a file is zipped up, "original filename" will show the ".html" version.
- "IFDB temp ID", "IFDB TUID": These only appear for files that were uploaded from IFDB's upload form (not the Archive one).
- "Admin notes": These are notes added by volunteers for each other. They are not publicly visible.

## File commands

Note that not all file commands are available in every directory. In particular, the [top-level Archive page][toppage] is quite locked down; only the "Edit Index" command is available. Visit a lower-level directory to see the full array of buttons.

[toppage]: https://ifarchive.org/indexes/if-archive/

### Move

Move the file to another directory.

### Rename

Rename the file in place.

### Delete

Delete a file. (Really, this moves it to the Trash folder.)

### Zip

Zip up a file. This option is only available for `.html` and `.svg` files, and only in the Incoming directory.

We don't want "naked" HTML files publicly available on the Archive; they could contain malicious Javascript. Therefore, our policy is zip all such files in Incoming and *then* move them to Unprocessed. See the [Procedures doc][procedures].

(Text articles in HTML format might not have scripting, and could be left unzipped. There are some such in the [/articles][ifarticles] directory. But games always have scripting.)

[ifarticles]: https://ifarchive.org/indexes/if-archive/articles/

### Edit Index

Edit the description and metadata of a file entry.

The description uses [Markdown][] format. Metadata lines look like `key: value`. See the [Overview document][overview] for a complete description.

[Markdown]: https://daringfireball.net/projects/markdown/syntax

You can also edit the description and metadata of the whole directory. That's the "Edit Index" button at the top of the page.

The "Edit Index File" button (also at the top) lets you edit *all* the index entries on the page as a single text file. (They're stored as a single text file, for example [this one][topindex]. When you hit "Edit Index File" you're editing that text file directly.)

[topindex]: https://ifarchive.org/if-archive/Index

### Create Symlink

Add a link referring to this file in another directory. We use this to make one file seem to be in two different places. (Say, if a package contains both a game and its source code.)

When you push this button, you're in the location that will be linked *to*. You are then prompted to enter the directory where the file will be linked *from*.

### Add Note

Add an administrative note to the file. These notes are never publicly visible; they are meant for the volunteer team only.

This button is hidden away on the file's info page! Hit the "(info)" button to find it.

(These notes cannot be edited or deleted, only added to.)

### Notify IFDB

Tell IFDB that a file has been moved to its permanent home; its IFDB entry is adjusted to indicate this. See "After you move a file" in the [Procedures doc][procedures].

This button is hidden away on the file's info page! Hit the "(info)" button to find it. It only appears for files with an "IFDB temp ID" entry. (That is, they were uploaded via IFDB's form.)

### Uncache

Wipe the Cloudflare cache for this file. If you replace a file with a different file of the same name (say, because a new version was uploaded), you should push this. You don't need to push it for newly-arrived files.

### Create Subdirectory

Create a subdirectory of a directory. This is not available for Incoming, Unprocessed, or Trash.

### Delete Subdirectory

This is only available for *empty* subdirectories.
