*NOTE: The lib is still under development*

The purpose of the lib to provide an easier way for navigating between dependencies in our app.
Lib uses `stat.json` file, provided by `webpack`, to build dependency graph.
There are 3 main mode:
### Module Overview
In the first mode we can see all third party modules that are used in our code base and
connection between them. Sometimes it helps to see hidden dependencies or find duplicated
modules.
![overview common](http://i.imgur.com/x0h1o6Z.png)
Here we can see that stacktrace.js is used only in one place in our code and included some
heavy third party modules. So we can conclude that it's a good candidate for [async loading](https://webpack.js.org/guides/code-splitting-async/)
![overview the stacktrace.js connections](http://i.imgur.com/v4m14c1.png)

### Module occurrence
If we want to see all places where the module was required we can select appropriate module
in select at top ![select](http://i.imgur.com/Jozdufk.png)

For example, we want to check how much it costs to switch to [preact library](https://github.com/developit/preact-compat). Selecting `react-dom` we can see next picture
![rect-dom occurrence](http://i.imgur.com/9hRJtP4.png)
Well, seems that we need to look more carefully at those libraries that use React-DOM API under the hood
and check how they are compatible with `preact`

### File usage
Another case is when we need to understand the whole picture why the file was included in the bundle.
For example, we want to split our domain logic by pages, before we need to understand on which pages those files
are utilized. Having selected desired module in the table at the right, we are able to see the whole
inclusion tree.
![inclusion tree](http://i.imgur.com/2ywZpWw.png)
To reduce visual noise use filtering by name at top corner
![filtering by name](http://i.imgur.com/70mifYn.png)
cool, now we figured out that desired domain logic file is utilized only on one page and we can start thinking
about code-splitting and inclusion that domain logic file into appropriate chunk
![menu page](http://i.imgur.com/zz9i1lJ.png)

