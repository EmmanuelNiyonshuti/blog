---
title: "lazy imports python3.15"
slug: "lazy-imports-python315"
excerpt: "explicit lazy imports in python3.15 onwards PEP810"
category: "python"
date: "2026-08-01"
publishedAt: "2026-08-01"
metaDescription: ""
---
### eager imports
Python loads and executes a module the moment you import it.

Say I have a module named `heavy.py` pretending it's something like `matplotlib` that I want to import and use in my code.

```python
import time

print("heavy.py: top-level code running")
time.sleep(0.3)   # pretend this is the module importing its own dependencies and running its startup code
print("heavy.py: done")

def compute():
    return "some heavy computation result"
```

Let's import this in the python repl:

```python
$ python3
Python 3.14.2 (main, Jan 14 2026, 19:38:07) [Clang 21.1.4 ] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import heavy
heavy.py: top-level code running
heavy.py: done
>>> heavy.compute()
'some heavy computation result'
>>>
```

Default python import, loads and executes the top-level code of the module you import. a lot of modules depend on other modules that are significantly heavy, if we take `matplotlib` as an example, importing it pulls in other modules like `numpy`, `pillow`, etc, and none of those are trivial.

Like if I add a library such as `matplotlib` to my virtual environment, python has a built-in way to see this:
the `-X importtime` flag. it prints, for every module imported, how long that module's own code took to run (`self`),
and how long it took including everything it pulls in underneath (`cumulative`).

```bash
$ python3 -X importtime -c "import matplotlib" 2>&1 | grep -E "numpy$|PIL$|matplotlib$"
import time: self [us] | cumulative | imported package
import time:       957 |      52165 |     numpy
import time:       233 |        526 |       PIL
import time:      6169 |     175962 | matplotlib
```

we can see on my computer that importing `matplotlib` alone costs about `176ms` cumulative, but matplotlib's own code only accounts for `6ms` of that (self). most of the cost is everything underneath it: `numpy` alone is `52ms` cumulative, and that's just one of matplotlib's dependencies. When your code imports many modules like this, which is most of the time the case, this adds up and can contribute to your application's slow startup.

### lazy imports
python3.15 comes with a feature called `lazy imports`. The idea is that instead of loading a module the moment it's imported, the import is deferred and the module is only loaded when it's actually used. Think of a trick people already do by importing a module inside a function instead of at the top of the file, so it's only loaded when that function runs. it's basically the same idea, now built into the language.

This is also why it helps with `circular imports` which is a classic: module A's top-level code tries to run module B, whose top-level code tries to run module A back, before A has finished defining what B needs.

Let's try the above same example on the python3.15 repl:

```python
$ python3.15
Python 3.15.0b3 (main, Jun 23 2026, 15:19:17) [Clang 22.1.3 ] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> lazy import heavy
>>> heavy.compute()
heavy.py: top-level code running
heavy.py: done
'heavy computation result'
>>>
```
As you can see, we use the `lazy` keyword, and the module is only loaded the first time it's actually used. modules imported without the `lazy` keyword are still imported eagerly, same as before. there's also a second way to opt in: a `__lazy_modules__` list at the top of a module.

```python
__lazy_modules__ = ['json']
import json
import sys

print('json' in sys.modules)
result = json.dumps({'name': 'john'})
print('json' in sys.modules)
```

```python
$ python3.15
>>> import demo
False
True
>>>
```

The actual module loading is deferred until it's actually used.

### a couple of gotchas
*you can lazy import something that doesn't exist*

```python
$ python3.15
>>> lazy from json import idontexist
>>>
```
This might look like a problem, I think it is easy to make this mistake. But I think it exactly what you'd expect from deferring the lookup and loading until first use. I think thats the point, right?

*what if you use the module right at the top of your module?*

```python
lazy import yaml
import sys
import functools

loads = functools.partial(yaml.load, Loader=yaml.CSafeLoader)
print('yaml' in sys.modules)
```

```python
>>> import demo
    ...
AttributeError: module 'yaml' has no attribute 'CSafeLoader'. Did you mean '.SafeLoader' instead of '.CSafeLoader'?
>>>
```

run it and you get an `AttributeError`, because the module ends up loading right away. we're using it immediately at the top, so `lazy` doesn't buy us anything here. I came across this library pretty recently which this example is copied from, anthony's [lazy-static](https://github.com/asottile/lazy-static). I think, you can obviously write the same check yourself, but it's worth knowing a small library already exists for it.

### conclusion

You can read more about lazy imports in [PEP 810](https://peps.python.org/pep-0810/). I hope you got something out of this, and you can now go start experimenting with and adopting this new feature.

bye!