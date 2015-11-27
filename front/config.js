System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "none",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "../config.json": "../config.json!",
    "angular": "github:angular/bower-angular@1.4.8",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "css": "github:systemjs/plugin-css@0.1.19",
    "firebase": "github:firebase/firebase-bower@2.3.2",
    "json": "github:systemjs/plugin-json@0.1.0",
    "lockr": "github:tsironis/lockr@0.8.3",
    "lodash": "npm:lodash@3.10.1",
    "moment": "npm:moment@2.10.6",
    "text": "github:systemjs/plugin-text@0.0.3",
    "wildemitter": "github:HenrikJoreteg/wildemitter@1.2.0",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.8"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:moment@2.10.6": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
