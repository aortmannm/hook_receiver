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

Create a hook in github or gitlab 

Example:

``` bash
http://192.168.1.145:8001/sample
```

For that example you need to take the sample.json if u create a hook_receiver.json u need to create a hook like this:

``` bash
http://192.168.1.145:8001/hook_receiver
```


#### Edit sample.json with your commands you want to have