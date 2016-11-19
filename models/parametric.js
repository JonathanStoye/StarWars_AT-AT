/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three"],
    (function (THREE) {

        "use strict";

        var ParametricSurface = function (posFunc, config) {

            console.log("Initalizing parametric surface...");

            var uSegments = config.uSegments || 100;
            var vSegments = config.vSegments || 100;
            var uMin = config.uMin || -2;
            var uMax = config.uMax || 2;
            var vMin = config.vMin || -2;
            var vMax = config.vMax || 2;

            var uSteps = (uMax - uMin) / uSegments;
            var vSteps = (vMax - vMin) / vSegments;

            this.positions = new Float32Array((uSegments + 1) * (vSegments + 1) * 3);
            this.colors = new Float32Array((uSegments + 1) * (vSegments + 1) * 3);
            this.indices = new Uint32Array((uSegments) * (vSegments) * 2 * 3);

            var color = new THREE.Color();

            /*
             // Filling indices Array
            var counter = 0;
             /            for (var x = 0; x < vSegments-1; x += vSegments) {
             for (var i = 0; i < this.indices.length; i += 6) {
             this.indices[i] = x + vSegments + counter;
             this.indices[i + 1] = counter;
             this.indices[i + 2] = vSegments + 1 - vSegments;
             this.indices[i + 3] = vSegments + counter;
             this.indices[i + 4] = counter + 1;
             this.indices[i + 5] =;
             counter++;
             }
             }*/

            var counter = 0;
            var triangles = [];
            console.log("Position Length: " + this.positions.length);
            for (var i = 0; i < vSegments; i++) {
                for (var j = 0; j < uSegments; j++) {
                    var u = uMin + (i * uSteps);
                    var v = vMin + (j * vSteps);

                    var x = i * (vSegments + 1) + j;
                    triangles.push(x, x + 1, x + vSegments + 1);
                    triangles.push(x + vSegments + 1, x + vSegments + 2, x + 1);


                    var xyz = posFunc(u, v);

                    var x = xyz[0] * 100;
                    var y = xyz[1] * 100;
                    var z = xyz[2] * 100;

                    this.positions[counter] = x;
                    this.positions[counter + 1] = y;
                    this.positions[counter + 2] = z;

                    //console.log(this.positions);

                    color.setRGB(1, 0, 0);
                    this.colors[counter] = color.r;
                    this.colors[counter + 1] = color.g;
                    this.colors[counter + 2] = color.b;

                    counter += 3;
                }
            }


            for (var i = 0; i < this.indices.length; i++) {
                this.indices[i] = triangles[i];
            }

            this.getPositions = function () {
                return this.positions;
            };

            this.getColors = function () {
                return this.colors;
            };

            this.getIndices = function () {
                return this.indices;
            }

        };

        return ParametricSurface;
    }));

