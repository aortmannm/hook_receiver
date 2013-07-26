### A simple hook receiver for git or github


###### Install dependencies
``` bash
npm install
```

###### Start app with
``` bash
node app.js <port> <branch>
```

When you don't take a branch on which the receiver should react it will react on all branches.

Create Hook in github or gitlab 

Example:

``` bash
http://192.168.1.145:8001/recipes
```

You need to take recipes at the end or you have to change it in app.js too.

It will comming soon that more hooks can be done with different endings.

#### Edit recipes.json with your commands you want to have