const expect = require('chai').expect;
const fs = require('fs');
const vm = require('vm');

describe('Temperatursteuerung', function () {

    let context;

    beforeEach(function () {
        const elements = {};

        const document = {
            getElementById: function (id) {
                if (!elements[id]) {
                    elements[id] = {
                        innerText: '',
                        addEventListener: function () {}
                    };
                }
                return elements[id];
            }
        };

        context = {
            document: document,
            setInterval: function () {},
            console: console
        };

        vm.createContext(context);

        const code = fs.readFileSync(
            require('path').join(__dirname, '../public/js/calculation.js'),
            'utf8'
        );

        vm.runInContext(code, context);

        // Temperaturanzeige sichtbar machen
        context.turnOnOff();
    });

    it('Plus soll Temperatur erhoehen', function () {
        context.increaseTemperature();

        expect(
            context.document.getElementById('temperature').innerText
        ).to.equal('Temperatur: 22 Celsius');
    });

    it('Minus soll Temperatur verringern', function () {
        context.decreaseTemperature();

        expect(
            context.document.getElementById('temperature').innerText
        ).to.equal('Temperatur: 20 Celsius');
    });

});