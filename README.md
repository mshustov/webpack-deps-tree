### Motivation
The purpose of the lib to provide an easier way for understanding dependency graph in our apps.
Usually, we want to see next dependencies:
1. Why that specific module or file was included in the bundle.
2. Which dependencies in the bundle are included due to the specific module.
3. Which modules use that specific module.

### Usage
Tool uses `stat.json` file, provided by `webpack`, to build dependency graph.
So to get a visual representation of dependency graph:
1. Run webpack build with saving stats file on disk. ie, `webpack --json > stats.json`.
2. Go to [online version](https://restrry.github.io/webpack-deps-tree/static/).
3. Upload generated `stats.json` file.

Next version will have the option to be used as webpack plugin as well.

### Usage cases
Let's overview all 3 main cases:
#### Module Overview
In that mode, we can see all third party modules that are used in our code base and
connection between them. In this way we can spot hidden dependencies or find duplicated modules.

![overview common](http://i.imgur.com/x0h1o6Z.png)
##### Example:
Here we can see that stacktrace.js is used only in one place in our code and included some
heavy third party modules. So we can conclude that it's a good candidate for [async loading](https://webpack.js.org/guides/code-splitting-async/)

![overview the stacktrace.js connections](http://i.imgur.com/v4m14c1.png)

#### Module usage
If we want to see all modules that require specific module, we can select appropriate module
in select element that places at top of that page

![select](http://i.imgur.com/Jozdufk.png)

##### Example:
We want to check how much it costs to switch to [preact library](https://github.com/developit/preact-compat). Selecting `react-dom` we can see next picture

![rect-dom occurrence](http://i.imgur.com/9hRJtP4.png)
Well, seems that we need to look more carefully at those libraries that use React-DOM API under the hood
and check how they are compatible with `preact`

#### File usage
Another case is when we need to understand the whole picture why the file was included in the bundle.
The specific files are listed in the table on the left side of the page

![file table](http://i.imgur.com/w6REQi6.png)
To see the whole inclusion tree (up to webpack entry point) you should select specific file with a click on its name.
Than tree will be rendered:
1. inclusion tree

![inclusion tree](http://i.imgur.com/gyl7ewr.png)
2. reference table with listing all places where that specific file was required and listing all modules that are required by our specific module

[reference table](http://i.imgur.com/Wwn2ICf.png)
##### Example
We want to split our domain logic by pages, before we need to understand on which pages those files
are utilized. Having selected desired module in the table at the right, we are able to see the whole
inclusion tree.

![inclusion tree](http://i.imgur.com/2ywZpWw.png)
To reduce visual noise use filtering by name(input element at top left corner of the page)

![filtering by name](http://i.imgur.com/70mifYn.png)


well, now we figured out that desired domain logic file is utilized only on one page and we can start thinking
about code-splitting and inclusion that domain logic file into appropriate chunk

![menu page](http://i.imgur.com/zz9i1lJ.png)


### Additional notes
The lib is still under development and was created due to personal needs. If you have any ideas what should be improved or fixed don't hesitate to create an issue.

