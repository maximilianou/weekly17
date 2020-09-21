# Ui

package.json
```
    "start": "ng serve --disableHostCheck=true --host=0.0.0.0 ",
    "serve": "ng serve --proxy-config proxy.conf.json",
```

proxy.conf.json
```
{
  "/api_js": {
    "target": "http://localhost:5017",
    "secure": false
  }
}
```

