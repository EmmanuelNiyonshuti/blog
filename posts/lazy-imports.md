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

Let's take this toy example, let's say I have a module named `heavy.py` pretending it's something like `matplotlib` that I want to import and use in my code.

```python
#heavy.py
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
We can see that default python import system, loads and executes the top-level code of the module you import. Taking an example we used of  `matplotlib` but in reality rather than using the toy script above, importing this package will pull in other packages like numpy, pillow, and more. Just like many other python packages, sometimes they depend on each other, and with how the import system in python works, this can add a small or significant overhead to your code depending on what you import and how you are importing them. 

Let's actually install matplotlib as the example to see how long the modules it imports and itself takes to run. Luckily, Python has a built-in way to see this kind of thing.
We can use `-X importtime` flag and print, for every module imported, how long that module's own code took to run, and how long it took including everything it pulls in(in other words its dependencies).

```bash
$ python3 -X importtime -c "import matplotlib" 2>&1 | grep -E "numpy$|PIL$|matplotlib$"
import time: self [us] | cumulative | imported package
import time:       957 |      52165 |     numpy
import time:       233 |        526 |       PIL
import time:      6169 |     175962 | matplotlib
```

On my computer, importing matplotlib alone costs about 176ms cumulative, but matplotlib's own code only accounts for 6ms of that (self). Most of the cost comes from everything it depends on. Numpy alone is 52ms cumulative, for example. Obviously this can vary depending on the computer, but there's still some kind of overhead because of how python's import system works. When your code imports many modules like this, which is normally the case, it can add up and contribute to your application's slow startup. You can check out the actual benchmarks in PEP 810, by the way -- I put the link in the conclusion section below. 

### lazy imports
python3.15 comes with a feature called `lazy imports`. The idea is that instead of loading a module the moment it's imported, the import is deferred and the module is only loaded when it's actually used. Think of a trick people already do by importing a module inside a function instead of at the top of the file, so it's only loaded when that function runs. it's basically the same idea, now built into the language.

Let's try the same example, but now with python3.15's lazy import:

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

We can see that, the actual module loading is deferred until it's actually used.

### a couple of gotchas
*you can lazy import something that doesn't exist*

```python
$ python3.15
>>> lazy from json import idontexist
>>>
```
This might look like a problem, I think it is easy to make this mistake. But I think it's exactly what you'd expect from deferring the lookup and loading until first use. I think that's the point, right?

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

run it and you get an `AttributeError`, because the module ends up loading right away. we're using it immediately at the top, so `lazy` doesn't buy us anything here. I came across this library pretty recently which this example is copied from, anthony's [lazy-static](https://github.com/asottile/lazy-static). I think you can obviously write the same check yourself, but it's worth knowing a small library already exists for it.

### conclusion

You can read more about lazy imports in [PEP 810](https://peps.python.org/pep-0810/). Ultimately, I hope you got something out of this, and you can now go start experimenting with and adopting this new feature.

bye!