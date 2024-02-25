title: Using the Archive Admin Tool

The Admin Tool allows Archive volunteers to file Archive uploads and edit their descriptions. It's a fairly straightforward web interface.

Note that there is no public login to the Admin Tool. Only Archive volunteers have accounts.

This document assumes that you have full volunteer permissions. Current policy is that all volunteers have full permissions, but we may someday add people with more limited roles. (E.g., "description editing only".) People with limited roles won't see all of the controls described here.

[procedures]: org-procedures.html

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

###
zip only works on html (etc) files, and in /incoming
Add Note is only on the (info) page
Same for Notify
