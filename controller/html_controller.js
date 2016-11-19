/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "robot"],
    (function ($, Robot) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {
            $('#createRobot').click(function() {
                scene.activateLight();
                var robot = new Robot();
                scene.addBufferGeometry(robot);
                scene.animator = robot.animator();
            });

            $('#fight').click(function() {
                scene.animator();
            });
        };

        // return the constructor function
        return HtmlController;
    })); // require
