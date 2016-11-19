/**
 * Created by Khale on 24.11.2015.
 */
/**
 * Created by Khaled on 24.11.2015.
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three", 'parametric'],
    (function (THREE, ParametricSurface) {

        "use strict";

        var DinisSurface = function (a, b, c, config) {

            this.config = config;

            var DinisSurfaceFunction = function (u, v) {
                var x = ( a * Math.cos(u) * Math.sin(v) );
                var y = ( a * Math.sin(u) * Math.sin(v) );
                var z = ( a * (Math.cos(v) + Math.log(Math.tan(v / 2))) + ( b * u) );
                return [x, y, z]
            };

            var parametricSurface = new ParametricSurface(DinisSurfaceFunction, this.config);

            this.positions = parametricSurface.getPositions();
            this.colors = parametricSurface.getColors();

            this.getPositions = function () {
                return this.positions;
            };

            this.getColors = function () {
                return this.colors;
            };

            this.getIndices = function () {
                return parametricSurface.getIndices();
            }

        };

        return DinisSurface;
    }));