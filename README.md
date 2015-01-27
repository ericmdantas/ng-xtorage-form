# ng-xtorage-form

[![Build Status](https://travis-ci.org/ericmdantas/ng-xtorage-form.svg?branch=master)](https://travis-ci.org/ericmdantas/ng-xtorage)
[![Coverage Status](https://coveralls.io/repos/ericmdantas/ng-xtorage-form/badge.svg?branch=master)](https://coveralls.io/r/ericmdantas/ng-xtorage?branch=master)

Remember that one time when some user was filling a big form and then, something happened, and he lost all his info?

Well, that's not happening again!

# installation

```bower install ng-xtorage-form --save```


# what?

This angular directive is meant to be a **tiny** yet **handy** that caches info to the storage as soon as they change - in a form, for example.


# why?

Because we all know it's never good to fill that big form more than once. So, why not cache it?


# how?

The directive ```$xtorage-form``` exposes three attributes:


- storage;
- storage-key;
- info-to-be-saved;


# form

```javascript

   angular
        .module('myAwesomeModule', ['emd.ng-xtorage-form'])
        .controller('MyAwesomeController', function($scope)
        {
            $scope.model = {};
        })
```

```html

    <div ng-controller="MyAwesomeController">

        <form name="MyFormNameHere"
              $xtorage-form
                  storage="sessionStorage"
                  storage-key="KeyGoesHere"
                  info-to-be-saved="{{model}}" >
                    <input type="text" ng-model="model.name" />
                    <input type="text" ng-model="model.age" />
                    <input type="checkbox" ng-model="model.somethingBoolean" />
        </form>
    </div>
```


What that'll do is: **As soon as the model changes, it'll be saved to the storage.**

Where, the model is the ```{{model}}```, the storage is: ```storage``` and the key is ```KeyGoesHere```.

# ng-xtorage

```ng-xtorage-form``` uses ```ng-xtorage``` service to save stuff in the Web Storage.

If you wanna learn more about it, please [take a look at the repo](https://github.com/ericmdantas/ng-xtorage).

#LICENSE

MIT
