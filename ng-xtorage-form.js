;(function() {
    "use strict";

    angular
        .module('emd.ng-xtorage-form', ['emd.ng-xtorage'])
        .directive('$xtorageForm', ['$xtorage', function($xtorage) {
            var _link = function(scope, element, attrs) {
                var _storage = attrs.storage || null;
                var _key = attrs.storageKey;
                var _watchThisProp = 'infoToBeSaved';

                attrs.$observe(_watchThisProp, function(info) {
                    $xtorage.save(_key, info, {storage: _storage});
                });
            };

            return _link;
        }])
}());
