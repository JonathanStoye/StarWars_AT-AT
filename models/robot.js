/* requireJS module definition */
define(["three", "ellipsoid", "BufferGeometry"],
    (function (THREE, Ellipsoid, BufferGeometry) {

        "use strict";

        var Robot = function () {

            /**
             * Sizes
             */

            this.torsoSize = [600, 300, 250];
            this.shoulderSize = [80, 40, 80];
            this.legSize = [60, 40, 140];
            this.kneeSize = [50, 40, 50];
            this.kneeRoundSize = [80, 80, 80];
            this.feetSize = [160, 130, 160];
            this.feetBottomSize = [90, 10, 90];
            this.neckSize = [140, 140, 140];
            this.neckBoldSize = [55, 150, 55];
            this.headSize = [180, 130, 150];
            this.headFrontSize = [60, 90, 150];
            this.headFrontSize2 = [80, 60, 150];
            this.weaponSizeBoldPart = [100, 30, 30];
            this.weaponSize = [4, 80, 4];
            this.shotSize = [2, 80, 2];


            /**
             * Geometries
             */

            var cube = new THREE.BoxGeometry(1,1,1);
            var sphere = new THREE.SphereGeometry(0.5, 30, 30);
            var halfSphere = new THREE.SphereGeometry(0.5, 30, 30, 0, 6.3, 0, 1.5);
            var cylinder = new THREE.CylinderGeometry(1, 1, 1, 30);

            /**
             * Material
             */
            var material = new THREE.MeshLambertMaterial( {color: 0xffffff} );
            var redMaterial = new THREE.MeshLambertMaterial( {color: 0xFF0000} );

            /**
             * Meshes
             */

            var Cube = new THREE.Mesh(cube, material);
            var Sphere = new THREE.Mesh(sphere, material);
            var HalfSphere = new THREE.Mesh(halfSphere, material);
            var Cylinder = new THREE.Mesh(cylinder, material);
            var Shot = new THREE.Mesh(cylinder, redMaterial);

            /**
             * Part Constructor
             */
            var createPart = function(name, size, mesh){

                //create skeleton:
                var object = new THREE.Object3D();
                object.size = size;
                object.name = name;

                //create skin:
                object.mesh = mesh;
                object.mesh.scale.x = size[0];
                object.mesh.scale.y = size[1];
                object.mesh.scale.z = size[2];

                //add skin to skeleton:
                object.add(object.mesh);

                return object;
            }

            /* Build Robot */
            this.root = new THREE.Object3D();

            var torso = createPart("torso", this.torsoSize, Cube.clone());


            this.createLeg = function(xPos, yPos, zPos) {
                var Shoulder = createPart("Shoulder", this.shoulderSize, Cylinder.clone());
                Shoulder.translateX(xPos);
                Shoulder.translateY(yPos);
                Shoulder.translateZ(zPos);
                Shoulder.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1.6);
                //torso.add(Shoulder);

                var UpperLeg = createPart("UpperLeg", this.legSize, Cube.clone());
                //UpperLeg.translateX(- this.torsoSize[0]/4);
                //UpperLeg.translateY(this.shoulderSize[2]/6);
                UpperLeg.translateZ(this.shoulderSize[2] + this.legSize[2] / 3);
                //UpperLeg.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1.6);
                Shoulder.add(UpperLeg);

                var Knee = createPart("Knee", this.kneeSize, Cylinder.clone());
                //Knee.translateX(this.torsoSize[0]/4);
                //Knee.translateY(- this.torsoSize[1]/2 + this.kneeSize[1] + this.kneeSize[1] * 0.1);
                Knee.translateZ(this.legSize[2] / 2);
                //Knee.rotateOnAxis(new THREE.Vector3(0, 0, 0), 1.6);
                UpperLeg.add(Knee);

                var KneeRoundPart = createPart("KneeRoundPart", this.kneeRoundSize, HalfSphere.clone());
                //KneeRoundPart.translateX(- this.torsoSize[0]/4);
                //KneeRoundPart.translateY(this.shoulderSize[2]/6);
                //KneeRoundPart.translateZ(this.kneeSize[2] + this.feetSize[2] / 3);
                //KneeRoundPart.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1.6);
                Knee.add(KneeRoundPart);

                var BottomLeg = createPart("BottomLeg", this.legSize, Cube.clone());
                //BottomLeg.translateX(- this.torsoSize[0]/4);
                //BottomLeg.translateY(this.shoulderSize[2]/6);
                BottomLeg.translateZ(this.kneeSize[2] + this.legSize[2] / 3);
                //BottomLeg.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1.6);
                Knee.add(BottomLeg);

                var Foot = createPart("Foot", this.feetSize, HalfSphere.clone());
                //Foot.translateX(- this.torsoSize[0]/4);
                //Foot.translateY(this.shoulderSize[2]/6);
                Foot.translateZ(this.legSize[2] - this.feetSize[2] / 8);
                Foot.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1.6);
                BottomLeg.add(Foot);

                var FootBottom = createPart("FootBottom", this.feetBottomSize, Cylinder.clone());
                //FootBottom.translateX(this.torsoSize[0]/4);
                //FootBottom.translateY(- this.torsoSize[1]/2 + this.feetBottomSize[1] + this.kneeSize[1] * 0.1);
                //FootBottom.translateZ(this.legSize[2] / 2);
                //FootBottom.rotateOnAxis(new THREE.Vector3(0, 0, 0), 1.6);
                Foot.add(FootBottom);

                return Shoulder;
            }

            var FrontRightLeg = this.createLeg(this.torsoSize[0]/3, - this.torsoSize[1]/2 + this.shoulderSize[1] + this.shoulderSize[1] * 0.1, this.torsoSize[2]/1.8);
            var FrontLeftLeg = this.createLeg(this.torsoSize[0]/3, - this.torsoSize[1]/2 + this.shoulderSize[1] + this.shoulderSize[1] * 0.1, - this.torsoSize[2]/1.8);
            var BackRightLeg = this.createLeg(- this.torsoSize[0]/3, - this.torsoSize[1]/2 + this.shoulderSize[1] + this.shoulderSize[1] * 0.1, this.torsoSize[2]/1.8);
            var BackLeftLeg = this.createLeg(- this.torsoSize[0]/3, - this.torsoSize[1]/2 + this.shoulderSize[1] + this.shoulderSize[1] * 0.1, - this.torsoSize[2]/1.8);


            torso.add(FrontRightLeg);
            torso.add(FrontLeftLeg);
            torso.add(BackRightLeg);
            torso.add(BackLeftLeg);

            var neck = createPart("neck", this.neckSize, Sphere.clone());
            neck.translateX(this.torsoSize[0]/2);
            neck.translateY(-this.neckSize[1]/4);
            //neck.translateZ(this.legSize[2] / 2);
            //neck.rotateOnAxis(new THREE.Vector3(0, 0, 0), 1.6);
            torso.add(neck);

            var neckBold = createPart("neckBold", this.neckBoldSize, Cylinder.clone());
            neckBold.translateX(this.neckSize[0]/2);
            //neckBold.translateY(-this.neckBoldSize[1]/4);
            //neckBold.translateZ(this.legSize[2] / 2);
            neckBold.rotateOnAxis(new THREE.Vector3(0, 0, 1), 1.6);
            neck.add(neckBold);

            var head = createPart("head", this.headSize, Cube.clone());
            head.translateX(this.neckSize[0]);
            //head.translateY(-this.headSize[1]/4);
            //head.translateZ(this.legSize[2] / 2);
            head.rotateOnAxis(new THREE.Vector3(0, 0, 1), -0.4);
            neck.add(head);

            var headFront = createPart("headFront", this.headFrontSize, Cube.clone());
            headFront.translateX(this.headSize[0]/2);
            headFront.translateY(this.headFrontSize[1]/8);
            //headFront.translateZ(this.legSize[2] / 2);
            //headFront.rotateOnAxis(new THREE.Vector3(0, 0, 1), -0.4);
            head.add(headFront);

            var headFront2 = createPart("headFront2", this.headFrontSize2, Cube.clone());
            headFront2.translateX(this.headFrontSize[0]/2);
            //headFront2.translateY(-this.headFront2Size[1]/4);
            //headFront2.translateZ(this.legSize[2] / 2);
            //headFront2.rotateOnAxis(new THREE.Vector3(0, 0, 1), -0.4);
            headFront.add(headFront2);



            var leftWeapon = createPart("leftWeapon", this.weaponSizeBoldPart, Cube.clone());
            leftWeapon.translateX(this.headSize[0]/3);
            leftWeapon.translateY(-this.headSize[1]/2);
            leftWeapon.translateZ(this.headSize[2]/2 - this.weaponSizeBoldPart[2]/4);
            //leftWeapon.rotateOnAxis(new THREE.Vector3(0, 0, 1), -0.4);
            head.add(leftWeapon);

            var leftWeaponBarrel = createPart("leftWeaponBarrel", this.weaponSize, Cylinder.clone());
            leftWeaponBarrel.translateX(this.weaponSizeBoldPart[0]/1.2);
            //leftWeaponBarrel.translateY(this.weaponSize[1]/2);
            //leftWeaponBarrel.translateZ(-this.weaponSize[2]);
            leftWeaponBarrel.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1.6);
            leftWeapon.add(leftWeaponBarrel);



            var rightWeapon = createPart("rightWeapon", this.weaponSizeBoldPart, Cube.clone());
            rightWeapon.translateX(this.headSize[0]/3);
            rightWeapon.translateY(-this.headSize[1]/2);
            rightWeapon.translateZ(-this.headSize[2]/2 + this.weaponSizeBoldPart[2]/4);
            //rightWeapon.rotateOnAxis(new THREE.Vector3(0, 0, 1), -0.4);
            head.add(rightWeapon);

            var rightWeaponBarrel = createPart("rightWeaponBarrel", this.weaponSize, Cylinder.clone());
            rightWeaponBarrel.translateX(this.weaponSizeBoldPart[0]/1.2);
            //rightWeaponBarrel.translateY(this.weaponSize[1]/2);
            //rightWeaponBarrel.translateZ(-this.weaponSize[2]);
            rightWeaponBarrel.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1.6);
            rightWeapon.add(rightWeaponBarrel);

            var config = {
                uSegments: 30,
                vSegments: 30,
                uMin: 0,
                uMax: 6,
                vMin: 0,
                vMax: 3.42
            };

            var ellip = new Ellipsoid(10, 10, 10, config);
            var bufferGeometry = new BufferGeometry(true, false, false);
            bufferGeometry.setIndex(ellip.getIndices());
            bufferGeometry.addAttribute('position', ellip.getPositions());
            //bufferGeometry.addAttribute('color', ellip.getColors());

            var paraBuh = new THREE.Mesh(bufferGeometry.geometry, new THREE.MeshPhongMaterial({
                color: 0xff0000,
                //vertexColors: THREE.NoColors,
                side: THREE.DoubleSide
            }));

            this.leftShot = createPart("shot", [0.08,0.002,0.002], paraBuh.clone());
            this.leftShot.translateY(-100);
            this.leftShot.rotateOnAxis(new THREE.Vector3(0,0,1), 1.6);

            this.rightShot = createPart("shot", [0.08,0.002,0.002], paraBuh.clone());
            this.rightShot.translateY(-100);
            this.rightShot.rotateOnAxis(new THREE.Vector3(0,0,1), 1.6);

            leftWeaponBarrel.add(this.leftShot);
            rightWeaponBarrel.add(this.rightShot);

            this.leftShot = createPart("shot", this.shotSize, Shot.clone());
            leftWeaponBarrel.add(this.leftShot);

            this.rightShot = createPart("shot", this.shotSize, Shot.clone());
            rightWeaponBarrel.add(this.rightShot);


            this.root.add(torso);
            this.root.rotateY(-2.2);
            this.root.translateY(100);


            this.getMesh = function () {
                return this.root;
            }

            /* Robot Animation Here */

            this.animator = function () {

                var _this = this;
                _this.animateHead(_this.root.getObjectByName("neck"));
                return function singleAnimationCircle() {
                    window.setTimeout(_this.animateLeg, 0, FrontRightLeg);
                    window.setTimeout(_this.animateLeg, 1000, BackLeftLeg);
                    window.setTimeout(_this.animateLeg, 2000, FrontLeftLeg);
                    window.setTimeout(_this.animateLeg, 3000, BackRightLeg);
                    window.setTimeout(singleAnimationCircle, 4000);
                    window.setTimeout(_this.shoot(_this.leftShot), 1000);
                    window.setTimeout(_this.shoot(_this.rightShot), 1000);
                    window.setTimeout(_this.shoot(_this.leftShot), 1600);
                    window.setTimeout(_this.shoot(_this.rightShot), 1600);
                }
            }

            this.animateLeg = function (leg) {
                up();
                down();

                function up() {
                    if (leg.rotation._y < 0.3) {
                        leg.up = true;
                        window.setTimeout(up, 10);
                        leg.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01);
                        var Knee = leg.getObjectByName("Knee");
                        Knee.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.01);
                        //var Foot = leg.getObjectByName("Foot");
                        //Foot.rotateOnAxis(new THREE.Vector3(0, 0, 1), -0.01);
                    }
                    else {
                        leg.up = false;
                        return;
                    }
                }

                function down() {
                    window.setTimeout(down, 200);
                    if (leg.rotation._y > - 0.3 && !leg.up) {
                        leg.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.01);
                        var Knee = leg.getObjectByName("Knee");
                        Knee.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01);
                        //var Foot = leg.getObjectByName("Foot");
                        //Foot.rotateOnAxis(new THREE.Vector3(0, 0, 1), -0.01);
                    }
                }
            }

            this.animateHead = function animateHead(head) {
                var direction = true;
                window.setInterval(left, 120);

                function left() {
                    if (direction) {
                        if (head.rotation._y < -0.2) {
                            direction = false;
                        }
                        head.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.01);
                    } else {
                        if (head.rotation._y > 0.2) {
                            direction = true;
                        }
                        head.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01);
                    }
                }

            }

            this.shoot = function shoot(shot) {
                if (shot.position.y < 500) {
                    shot.position.y += 20;
                    window.setTimeout(shoot, 10, shot);
                }
                else {
                    shot.position.y = -100;
                }
            }
        }

        return Robot;

    }));