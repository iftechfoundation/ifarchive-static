changedate: December 3, 2023

We store files in directories. That's the job.

The server is a tree of directories, which you can browse from the [top, here](https://ifarchive.org/indexes/if-archive/). The full directory list is [viewable here](https://ifarchive.org/indexes/dirlist.html). (This [`directory-tree`](https://ifarchive.org/if-archive/directory-tree) file is supposed to show a map of the whole thing, but it hasn't been updated since 2013 so it's probably a bit wrong.)

## Symlinks

Much of the structure dates back to the 1990s. This is why, for example, Inform 6 and 7 are both filed under [`infocom/compilers`](https://ifarchive.org/indexes/if-archive/infocom/compilers/) rather than [`programming`](https://ifarchive.org/indexes/if-archive/programming/). Inform only has a distant historic connection to anything Infocom did, but back in 1993 one of the Archive's main goals was "collect everything we know about Infocom before it's all lost." So there's a top-level `infocom` directory. Similarly, there are top-level directories for `level9`, `scott-adams`, and other prominent 1980s studios.

We've worked around some of the organizational cruft by adding symlinks. A [symlink](https://en.wikipedia.org/wiki/Symlink) is a Unix file object that "points at" another file or directory. `programming/inform6` is a symlink to `infocom/compilers/inform6`, so someone who browses the [`programming`](https://ifarchive.org/indexes/if-archive/programming/) folder will see a reference to follow.

## Persistent URLs

Why don't we just reorganize the whole Archive to modern standards? Because *Archive URLs are supposed to be permanent*. People link to Archive files and directories. (IFDB, for example, has many thousands of such links.) URLs are, de facto, the unique persistent identifiers of Archive items.

Thus, if a directory was named `if-archive/infocom/compilers/inform6/` in the 1990s, we'd like it to still have the same name today. Same goes for files.

Of course there are tradeoffs. That directory *wasn't* named that in the 1990s; it was just `if-archive/infocom/compilers/inform/`. We changed it to `inform6` after Inform 7 came out. But we try to minimize these cases. Our rough rules are:

- Don't move or rename a file without a really good reason.
- If someone uploads a new version of a file with the same name, move the old one to an `old` subdirectory (perhaps adding a version number) and put the new one in its place.
- If someone uploads a new version of a file with a *new* name (e.g. with an updated version number in the filename), move the old one to an `old` subdirectory and put the new one in place. This is a case where the URL necessarily changes (because it had the version number in it.)

(Note that `old` subdirectories are a relatively recent innovation. We used to just delete old versions of files. But throwing away files does not befit the dignity of a historic archive.)

## Index files

Most Archive directories contain a text file called `Index`. This describes the contents of that directory. It's not mandatory, and it doesn't have to mention every file, but it's nice to have.

The `Index` file information is used to generate the index pages for the Archive. For example, [`if-archive/scott-adams/games/Index`](https://ifarchive.org/if-archive/scott-adams/games/Index) becomes the index page for [`if-archive/scott-adams/games`](https://ifarchive.org/indexes/if-archive/scott-adams/games/).

As you see, the format is very simple:

```

Description of the directory.

# filename

Description of that file.

# filename2

Description of another file.
```

Each file section starts with `# filename`. The descriptions employ Markdown formatting, so you can use `*emphasis*` or `[links][...]` or any of the other usual Markdown stuff. (Really `# filename` is just a Markdown header line. You could use `##` for subheaders if you had a really long description, but we generally don't.)

The Index file always has UTF-8 formatting and you can use Unicode characters freely.

### Where to put directory info

The `Index` format allows you to put descriptions on subdirectories as well as files. It looks exactly the same:

```
# subdirname

Description of that subdir.
```

But you can also put information at the *top* of the `Index` file *in* that subdirectory. Which way to go?

*Most of the time, put directory info at the top of the `Index` file in that directory.* (Rather than a section in the parent directory.) This makes for tidier listings.

There are some exceptions to this rule. For example, the [`if-archive/scott-adams/games`](https://ifarchive.org/indexes/if-archive/scott-adams/games/) example mentioned earlier. Here, the subdirs (`c64`, `scottfree`, `ti99`, `zcode`) are described in the parent dir rather than the subdir. This is just the way things were formatted many years ago. We've never gotten around to changing it.

(We may change it in the future.)

### Metadata

Notice the blank line at the beginning of the `Index` file? That's not a mistake. We use a [Markdown extension][mdext] to extract metadata header lines at the top of the file *and* in each filename section.

[mdext]: https://python-markdown.github.io/extensions/meta_data/

This might look like this:

```
ifwiki: WikiDirPage

Description of the directory.

# filename
tuid: a1b2c3d4e5f6g7h8

Description of that file.

# filename2
ifwiki: WikiGamePage
tuid: q2b2c3d4e5f6g7z9
tuid: p11b2c3d4e5f6g78

Description of another file.
```

Metadata lines look like `key: value`. The lines at the top describe the whole directory; the lines under the `# filename` describe that file. A file (or the directory) can have any amount of metadata.

Metadata lines do *not* have whitespace before them. A blank line ends the metadata section. (A line without a colon also ends the metadata section, so you could omit the blank lines if the description had no colons in it. But that's confusing, so we try to use the blank line consistently.)

There are currently just two common metadata lines:

* `tuid: ID`: An IFDB ID – sixteen alphanumeric characters. (IFDB calls its ID strings "TUIDs" internally.) This becomes an IFDB link on the index page.

* `ifwiki: PageName`: An IFWiki page title, minus the `https://www.ifwiki.org/` part. This becomes an IFWiki link on the index page.

IFWiki page titles should be written the way they appear to users, not in the URL. Thus: `ifwiki: Zork: A Troll's Eye View` rather than `ifwiki: Zork:_A_Troll%27s_Eye_View`. (However, a lot of the older `ifwiki` lines use underscores rather than spaces. This works, but spaces are preferred.)

Note that you will sometimes see a single file with many IFDB or IFWiki links. For example, in [`if-archive/scott-adams/games/scottfree/`](https://ifarchive.org/indexes/if-archive/scott-adams/games/scottfree/), the file `AdamsGames.zip` is a package containing a whole bunch of Scott Adams games. So it has a whole bunch of TUIDs.

There can also be two files with the *same* IFDB or IFWiki link! Walkthroughs and maps should refer to the IFDB/IFWiki entry for their game, so they will have the same metadata.

*Most of the existing TUIDs and IFWiki links were automatically generated from IFDB and IFWiki database dumps.* (We searched the data for Archive URLs and created backlinks.) These links are certainly incomplete and sometimes wrong. One of our goals in accepting more IF Archive volunteers is to keep the metadata more up to date.

To be clear, those database dumps were one-time operations. There is no mechanism to *automatically* create metadata lines when IFDB and IFWiki entries are updated. There's also no mechanism to ensure that walkthroughs and games have the same metadata entries. We may get there in the future, but right now it's all on the volunteers.

You will occasionally see another metadata line:

* `unbox-link: false`

This is applied to `.zip` files which should *not* have a "View Contents" unbox link. Currently, this is only used for packages like [`IFComp2023.zip`](https://ifarchive.org/indexes/if-archive/games/competition2023/) which are (a) very large *and* (b) already broken out into individual games (in the `Games` subdir), so there's no need to browse the big zip itself.

## The problem with the Competition directories

The `Index` format is pretty simple. It's easy to add new entries while following the existing layout...

Except for IFComp, which messes everything up.

IFComp (and the Archive) have evolved over the years (decades!) The way IFComp files have been uploaded has evolved as well. Here's a quick tour:

- [`competition95`](https://ifarchive.org/indexes/if-archive/games/competition95/): Files are stored directly in the comp directory. Descriptions and metadata for each game file.
- [`competition96`](https://ifarchive.org/indexes/if-archive/games/competition96/): One subdirectory for each game, containing unpacked game files. Descriptions and metadata for each subdir.
- [`competition97`](https://ifarchive.org/indexes/if-archive/games/competition97/) – [`competition99`](https://ifarchive.org/indexes/if-archive/games/competition99/): One subdir for each *dev system* (`tads`, `inform`, etc). Sub-sub-directories for each game. The top-level [Index](https://ifarchive.org/if-archive/games/competition97/Index) file has descriptions for the sub-sub-directories – that is, slashes in the headers (`# inform/edifice`). This is a weird format not used anywhere else.
- [`competition2000`](https://ifarchive.org/indexes/if-archive/games/competition2000/) – [`competition2013`](https://ifarchive.org/indexes/if-archive/games/competition2013/): One subdir for each dev system, but we drop the idea of descriptions for individual games. (Because there is now a competition *web site* that lists all the games – people are no longer relying on browsing the Archive for this info.) Also we've switched to four-digit years.
- [`competition2014`](https://ifarchive.org/indexes/if-archive/games/competition2014/) – [`competition2019`](https://ifarchive.org/indexes/if-archive/games/competition2019/): One subdir for each game. Still no descriptions or metadata.
- [`competition2020`](https://ifarchive.org/indexes/if-archive/games/competition2020/) – [`competition2021`](https://ifarchive.org/indexes/if-archive/games/competition2021/): One subdir for each game, but they are now all contained in a top-level `Games` folder.
- [`competition2022`](https://ifarchive.org/indexes/if-archive/games/competition2022/) – [`competition2023`](https://ifarchive.org/indexes/if-archive/games/competition2023/): One *zip file* for each game, contained in a top-level `Games` folder. (The new [unbox][] service allows us to host playable games in zip files rather than unpacked folders.

[unbox]: https://unbox.ifarchive.org

(Note that in [2012][comp2012], someone added IFDB metadata for every game to the `Comp12.zip` file. But nobody repeated this feat in later years.)

[comp2012]: https://ifarchive.org/indexes/if-archive/games/competition2012/

(Also: it would be tidier if all those historic game subdirs were zipped up, matching the 2022 convention. However, the "don't break URLs" rule has held us back from doing this.)

In theory, we'd like game descriptions and metadata to be visible on every *top-level* competition page. (You shouldn't have to burrow down into `competition2000/inform` or `competition2020/Games` to see that info.) But the way things are set up, this is awkward (see [1997][comp1997]-[1999][comp1999]).

The goal for 2022 on is to add entries to the top-level competition pages that look like:

```
# Games/Dr Ludwig and the Devil.zip
tuid: 4gvxr278ukyobiy

Dr Ludwig and the Devil, by SV Linwood.
```

Note the `/` in the pathname, which lets the top-level page reach down into the `Games` folder. As of February 2024, index system supports this. But it's only been done for [2023][comp2023] and that only has TUIDs, not title/author info.

[comp1997]: https://ifarchive.org/indexes/if-archive/games/competition97/
[comp1999]: https://ifarchive.org/indexes/if-archive/games/competition99/
[comp2023]: https://ifarchive.org/indexes/if-archive/games/competition2023/
