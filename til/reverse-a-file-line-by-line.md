---
title: "cat spelled backwards"
slug: "cat-spelled-backwards"
excerpt: "using tac to reverse a file line by line"
category: "linux"
date: "2026-05-28"
publishedAt: "2026-05-28"
---

we can use `tac` to print a file with its lines in reverse order.

e.g: for log files which we care about the most recent entries,
we can use `tac`.

print the whole log file in reverse order.
```
tac tmp/app.log
```

print 5 most recent log entries.

```
tac tmp/app.log | head -5

```

