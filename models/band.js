/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: Random
 *
 * Generates a random set of points
 * inspired by http://threejs.org/examples/#webgl_interactive_buffergeometry
 */

/* requireJS module definition */
define(["three"],
    (function (THREE) {

        "use strict";

        /**
         *
         * @param scene  - reference to the scene
         * @constructor
         */
        var Band = function (config) {

            var segments = config.segments || 100;
            var radius = config.radius || 300;
            var height = config.height || 100;

            this.positions = new Float32Array(2 * segments * 3);
            this.colors = new Float32Array(2 * segments * 3);
            this.indexArr = new Uint32Array(2 * segments * 3);

            // init indexArr
            this.indexArr[0] = 0;
            this.indexArr[1] = 1;
            this.indexArr[2] = 3;
            this.indexArr[3] = 0;
            this.indexArr[4] = 3;
            this.indexArr[5] = 2;

            var i;
            for (i = 6; i < this.indexArr.length - 6; i += 6) {
                this.indexArr[i] = this.indexArr[i - 6] + 2;
                this.indexArr[i + 1] = this.indexArr[i - 5] + 2;
                this.indexArr[i + 2] = this.indexArr[i - 4] + 2;
                this.indexArr[i + 3] = this.indexArr[i - 3] + 2;
                this.indexArr[i + 4] = this.indexArr[i - 2] + 2;
                this.indexArr[i + 5] = this.indexArr[i - 1] + 2;
            }

            this.indexArr[i] = this.indexArr[i - 6] + 2;
            this.indexArr[i + 1] = this.indexArr[i - 5] + 2;
            this.indexArr[i + 2] = this.indexArr[1];
            this.indexArr[i + 3] = this.indexArr[i - 3] + 2;
            this.indexArr[i + 4] = this.indexArr[1];
            this.indexArr[i + 5] = this.indexArr[0];


            var color = new THREE.Color();

            for (var i = 0; i < this.positions.length; i += 6) {

                // X and Z coordinates are on a circle around the origin
                var t = (i / this.positions.length) * Math.PI * 2;
                var x = Math.sin(t) * radius;
                var z = Math.cos(t) * radius;
                // Y coordinates are simply -height/2 and +height/2
                var y0 = height / 2;
                var y1 = -height / 2;

                // add two points for each position on the circle
                // IMPORTANT: push each float value separately!
                this.positions[i] = x;
                this.positions[i + 1] = y0;
                this.positions[i + 2] = z;

                this.positions[i + 3] = x;
                this.positions[i + 4] = y1;
                this.positions[i + 5] = z;


                color.setRGB(1, 0, 0);

                this.colors[i] = color.r;
                this.colors[i + 1] = color.g;
                this.colors[i + 2] = color.b;

                this.colors[i + 3] = color.r;
                this.colors[i + 4] = color.g;
                this.colors[i + 5] = color.b;
            }

            this.getPositions = function () {
                return this.positions;
            };

            this.getColors = function () {
                return this.colors;
            };

            this.getIndices = function () {
                return this.indexArr;
            }

        };

        return Band;
    }));
    
