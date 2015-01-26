"use strict";

describe('$xtorageFormCache', function()
{
    var _scope, _compile, _element, _form, _xtorage;
    var _html;

    beforeEach(module('emd.ng-xtorage-form'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _xtorage = $injector.get('$xtorage');

        _scope.model = {a: "1", b: {z: "x"}, c: true, d: 1.5};
        _scope.storage = "sessionStorage";

        _html = '<form name="form" $xtorage-form-cache storage-key="key" info-to-be-saved="{{model}}" storage="{{storage}}">'+
                        '<input name="input1" type="text" ng-model="model.a"/>'+
                        '<input name="input2" type="text" ng-model="model.b.z"/>'+
                        '<input name="input3" type="text" type="checkbox" ng-model="model.c"/>'+
                        '<input name="input4" type="text" ng-model="model.d"/>'+
                    '</form>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _form = _scope.form;

        spyOn(_xtorage, 'save').and.callFake(angular.noop);
    }))

    describe('creation', function()
    {
        it('should have element created an accessible', function()
        {
            _scope.$digest();

            expect(_element).toBeDefined();
            expect(_xtorage.save).toHaveBeenCalled();
        })
    })

    describe('on info change', function()
    {
        it('input 1 changed, should save object to the store', function()
        {
            _form.input1.$setViewValue("2");

            _scope.$digest();

            expect(_xtorage.save).toHaveBeenCalledWith("key", angular.toJson(_scope.model), {storage: 'sessionStorage'});
        })

        it('input 2 changed, should save object to the store', function()
        {
            _form.input2.$setViewValue("akdjakljd");

            _scope.$digest();

            expect(_xtorage.save).toHaveBeenCalledWith("key", angular.toJson(_scope.model), {storage: 'sessionStorage'});
        })

        it('input 3 changed, should save object to the store', function()
        {
            _form.input3.$setViewValue(false);

            _scope.$digest();

            expect(_xtorage.save).toHaveBeenCalledWith("key", angular.toJson(_scope.model), {storage: 'sessionStorage'});
        })

        it('input 4 changed, should save object to the store', function()
        {
            _form.input4.$setViewValue(1);

            _scope.$digest();

            expect(_xtorage.save).toHaveBeenCalledWith("key", angular.toJson(_scope.model), {storage: 'sessionStorage'});
        })

        it('should change the whole object from the store', function()
        {
            _scope.model = {a: 'alo'};

            _scope.$digest();

            expect(_xtorage.save).toHaveBeenCalledWith("key", angular.toJson(_scope.model), {storage: 'sessionStorage'});
        })

        it('should call save using localStorage now', function()
        {
            _scope.model = {a: 'alo'};
            _scope.storage = 'localStorage';

            _html = '<form name="form" $xtorage-form-cache storage-key="key" info-to-be-saved="{{model}}" storage="{{storage}}">'+
                            '<input name="input1" type="text" ng-model="model.a"/>'+
                            '<input name="input2" type="text" ng-model="model.b.z"/>'+
                            '<input name="input3" type="text" type="checkbox" ng-model="model.c"/>'+
                            '<input name="input4" type="text" ng-model="model.d"/>'+
                    '</form>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();

            expect(_xtorage.save).toHaveBeenCalledWith("key", angular.toJson(_scope.model), {storage: 'localStorage'});
        })

        it('should call save passing storage as null', function()
        {
            _scope.model = {a: 'alo'};
            _scope.storage = undefined;

            _html = '<form name="form" $xtorage-form-cache storage-key="key" info-to-be-saved="{{model}}" storage="{{storage}}">'+
                        '<input name="input1" type="text" ng-model="model.a"/>'+
                        '<input name="input2" type="text" ng-model="model.b.z"/>'+
                        '<input name="input3" type="text" type="checkbox" ng-model="model.c"/>'+
                        '<input name="input4" type="text" ng-model="model.d"/>'+
                    '</form>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();

            expect(_xtorage.save).toHaveBeenCalledWith("key", angular.toJson(_scope.model), {storage: null});
        })
    })
})