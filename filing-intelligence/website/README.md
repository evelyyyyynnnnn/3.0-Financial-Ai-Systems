# Filing Intelligence — website

Static site for `filing-intelligence`. No build step: Vercel serves this folder as-is.

## Deploy on its own

Copy this folder into a new repository and point Vercel at the repository root:

```
vercel deploy --prod
```

`vercel.json` already sets `outputDirectory` to `.` and disables the build command,
so there is nothing else to configure.

## Refreshing the numbers

The page reads from `results.json`, which is written by the project's demo run:

```
cd ..            # the project root
pip install -r requirements.txt
python -m src.demo
```

That regenerates `website/results.json` and rebuilds `index.html`. Never edit the
figures on the page by hand — they exist so that what the site shows and what the
code produces cannot drift apart.
