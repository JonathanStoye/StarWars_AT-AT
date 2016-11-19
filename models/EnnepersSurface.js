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

        var EnnepersSurface = function (a, b, c, config) {

            this.config = config;

            var EnnepersSurfaceFunction = function (u, v) {
                var x = u - (Math.pow(u, 3) / 3) + u * Math.pow(v, 2);
                var y = v - ((Math.pow(v, 3) / 3) + (Math.pow(u, 2) * v));
                var z = Math.pow(u, 2) - Math.pow(v, 2);
                return [x, y, z]
            };

            var parametricSurface = new ParametricSurface(EnnepersSurfaceFunction, this.config);

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

        return EnnepersSurface;
    }));