# A simple hook receiver for git or github


## Install dependencies

``` bash
npm install
```

## Start receiver with
``` bash
node index.js -p <port>
```

Specify branch in the .json file in your config folder.

Create a hook in github or gitlab 

Example:

``` bash
http://192.168.1.145:8001/sample
```

For that example you need to take the sample.json if u create a hook_receiver.json u need to create a hook like this:

``` bash
http://192.168.1.145:8001/hook_receiver
```


## Edit sample.json with your commands and branch you want to have