---
title: cancelling Asyncio.TaskGroup without boilerplate
slug: cancelling-asyncio-taskgroup-without-boilerplate
excerpt: Python>=315 have Asyncio.TaskGroup.cancel
category: "backend development"
tags: []
date: "2026-07-05"
publishedAt: "2026-07-05"
metaDescription: ""
---

Python3.15 is right around the corner as of when I am writing this article, its scheduled for its official stable release in october as always. I am running on its beta release `Python3.15.0b3` and out of everything on the release notes, lazy imports, utf8 as default encoding, sentinel builtin, frozendict builtin type, the one I actually want to check on in this blog post today is `asyncio.TaskGroup.cancel`. so this is that.


### cancelling Asyncio.TaskGroup

There is a blog I have which was a fairly minimal walk through, or introduction, to asynchronous programming in python using AnyIO's `create_task_group` for spawning different tasks. Task Groups, or nurseries in Trio lingo, have their own Cancel Scopes, cancelling them is as easy as calling `tg.cancel_scope.cancel()`. Cancel scopes are not a thing in Python AsyncIO, and part of why is that the cancellation semantics of Trio and asyncio differ, the former uses Level cancellation and the latter uses edge cancellation. you can use Cancel Scopes when you run AnyIO, because of what AnyIO does around its asyncio backend, but asyncio itself doesn't have this.

If you wanted to short circuit a `TaskGroup` early, you had to reach for the task the group is running under and cancel that, this leads to some boilerplate code where you have to catch the `CancelledError` that will propagate outside the TaskGroup. this is not very safe, cancelling it cancels the whole task, not just whatever's inside your taskgroup, it is possible you can end up taking down code that has nothing to do with the group.


### naming things can be hard sometimes!

It was actually almost named `TaskGroup.stop`. Guido seemed to lean towards calling this API `TaskGroup.stop`. his premise being that calling it `TaskGroup.cancel` implies that it will raise a `CancelledError` that's expected to propagate out of the taskgroup. but it actually doesn't propagate, it gets caught, and the taskgroup exits clean. eventually though, Guido came around to naming it TaskGroup.cancel, since others preferred that name, and Yury, one of the python core devs, also thought cancel was the more fitting name.

### What it entails

```python
# code copied from cpython3 https://github.com/python/cpython/issues/108951#issuecomment-1707742153
import asyncio

async def t1():
    async with asyncio.TaskGroup() as tg:
        tg.create_task(asyncio.sleep(1))
        tg._parent_task.cancel() # asyncio.current_task().cancel()
    assert False, "not reached"

try:
    asyncio.run(t1())    # Cancelled
    assert False, "not reached"
except asyncio.CancelledError:
    print("Cancelled")
```

Updated to use python>=315 `TaskGroup.cancel`
```python
import asyncio

async def t1():
    async with asyncio.TaskGroup() as tg:
        tg.create_task(asyncio.sleep(1))
        tg.cancel()
    print("exited clean, no exception to catch")


asyncio.run(t1()) # exited clean, no exception to catch
```

### why care

If you've never needed to bail out of a `TaskGroup` early, this feature will most likely not be something you care about. its a small api and I think it removes a real wart. worth knowing it exists next time a task group of yours needs to know when to stop.

bye!