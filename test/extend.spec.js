import {extend} from '../src/helper.js';

describe('helper.js', function () {
    describe(':: extend()', function () {
        var mock = {};

        beforeEach(function () {
            mock.first = {
                a: 1
            };

            mock.second = {
                a: 2,
                b: 3
            };

            mock.third = {
                a: 3,
                c: 4
            };
        });

        it('Should extend a single object.', function () {
            let object = extend(mock.first);

            expect(object).toEqual({
                a: 1
            });
        });

        it('Should extend multiple objects.', function () {
            let object = extend(mock.first, mock.second);

            expect(object).toEqual({
                a: 2,
                b: 3
            });

            object = extend(mock.second, mock.third);

            expect(object).toEqual({
                a: 3,
                b: 3,
                c: 4
            });
        });

        it('Should only modify the first extended object', function () {
            let mock_first = Object.create(mock.first);

            let object = extend(mock.first, mock.second);

            expect(mock.first).not.toEqual(mock_first);
            expect(mock.second).toEqual(mock.second);
        });

        it('Should not extend object keys with null values', function () {
            let object = extend(mock.first, {
                a: null
            });

            expect(mock.first).toEqual({
                a: null
            });
        });

        it('Should not extend object keys with undefined values', function () {
            let object = extend(mock.first, {
                a: undefined
            });

            expect(mock.first).toEqual({
                a: 1
            });
        });
    });
});
