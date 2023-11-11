var avatar; // Declare a variable to store the avatar image

var VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
    GravityBehavior = toxi.physics2d.behaviors.GravityBehavior,
    AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior,
    VerletParticle2D = toxi.physics2d.VerletParticle2D,
    VerletSpring2D = toxi.physics2d.VerletSpring2D,
    VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D,
    Vec2D = toxi.geom.Vec2D,
    Rect = toxi.geom.Rect;

var physics;
var dancer;

function setup()
{
    createCanvas(500, 500); // Use numeric values for width and height
    physics = new VerletPhysics2D();
    physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

    physics.setWorldBounds(new Rect(0, 0, width, height));

    dancer = new Skeleton(width / 2, height / 2 - 150);

    // Create buttons
    var raiseShoulderBtn = document.createElement("button");
    raiseShoulderBtn.id = "raiseShoulderBtn";
    raiseShoulderBtn.textContent = "Raise Shoulder";

    var danceFastBtn = document.createElement("button");
    danceFastBtn.id = "danceFastBtn";
    danceFastBtn.textContent = "Dance Fast";

    var danceBtn = document.createElement("button");
    danceBtn.id = "danceBtn";
    danceBtn.textContent = "Dance";

    document.body.appendChild(raiseShoulderBtn);
    document.body.appendChild(danceFastBtn);
    document.body.appendChild(danceBtn);

    document.getElementById("raiseShoulderBtn").addEventListener("click", function() {
        dancer.raiseShoulder();
    });

    document.getElementById("danceFastBtn").addEventListener("click", function() {
        dancer.danceFast();
    });

    document.getElementById("danceBtn").addEventListener("click", function() {
        dancer.dance();
    });
}

function draw() {
    background(0);
    dancer.display();
    // dancer.dance();
    physics.update();
}

function Particle(loc, r_) {
    this.p = new VerletParticle2D(loc);
    this.r = r_;
}

Particle.prototype.display = function () {
    fill(0, 100, 0); // color of joints
    stroke(120, 234, 170); // color of outer covering
    strokeWeight(15); // width of outer covering
    // Elliptical object
    ellipse(this.p.x, this.p.y, this.r * 2, this.r * 2);
    // image(avatar, this.parts[0].p.x - this.parts[0].r, this.parts[0].p.y - this.parts[0].r, this.parts[0].r * 2, this.parts[0].r * 2);
}

Particle.prototype.lock = function () {
    this.p.lock();
}

Particle.prototype.unlock = function () {
    this.p.unlock();
}

function Skeleton(x, y) {
    this.parts = []; 
    this.springs = []; 

    this.origin = new Vec2D(x, y); 

    // Positioning the joints
    this.parts.push(new Particle(new Vec2D(x, y), 30));
    this.parts.push(new Particle(new Vec2D(x, y), 4));

    this.parts.push(new Particle(new Vec2D(x + 20, y + 80), 4));
    this.parts.push(new Particle(new Vec2D(x - 20, y + 80), 4));

    this.parts.push(new Particle(new Vec2D(x + 100, y + 80), 4));
    this.parts.push(new Particle(new Vec2D(x - 100, y + 80), 4));

    this.parts.push(new Particle(new Vec2D(x + 200, y + 80), 8));
    this.parts.push(new Particle(new Vec2D(x - 200, y + 80), 8));

    this.parts.push(new Particle(new Vec2D(x, y + 120), 4));

    this.parts.push(new Particle(new Vec2D(x + 50, y + 230), 4));
    this.parts.push(new Particle(new Vec2D(x + 50, y + 230), 4));

    this.parts.push(new Particle(new Vec2D(x + 50, y + 280), 18));
    this.parts.push(new Particle(new Vec2D(x + 50, y + 280), 18));

    this.parts[0].p.lock();

    // Head
    this.springs.push(new VerletSpring2D(this.parts[0].p, this.parts[1].p, 5, 0.01));

    // Head
    this.springs.push(new VerletSpring2D(this.parts[0].p, this.parts[1].p, 5, 0.01));

    // Arms
    this.springs.push(new VerletSpring2D(this.parts[1].p, this.parts[2].p, 20, 0.01));
    this.springs.push(new VerletSpring2D(this.parts[1].p, this.parts[3].p, 20, 0.01));

    // Elbows
    this.springs.push(new VerletSpring2D(this.parts[2].p, this.parts[4].p, 40, 0.01));
    this.springs.push(new VerletSpring2D(this.parts[3].p, this.parts[5].p, 40, 0.01));

    // Shoulder Length
    physics.addSpring(new VerletMinDistanceSpring2D(this.parts[3].p, this.parts[2].p, 100, 0.01));

    // Fists
    this.springs.push(new VerletSpring2D(this.parts[6].p, this.parts[4].p, 40, 0.01));
    this.springs.push(new VerletSpring2D(this.parts[7].p, this.parts[5].p, 40, 0.01));

    // Chest
    this.springs.push(new VerletSpring2D(this.parts[1].p, this.parts[8].p, 50, 0.01));

    physics.addSpring(new VerletMinDistanceSpring2D(this.parts[8].p, this.parts[2].p, 100, 0.01));
    physics.addSpring(new VerletMinDistanceSpring2D(this.parts[8].p, this.parts[3].p, 100, 0.01));

    physics.addSpring(new VerletMinDistanceSpring2D(this.parts[0].p, this.parts[2].p, 100, 0.01));
    physics.addSpring(new VerletMinDistanceSpring2D(this.parts[0].p, this.parts[3].p, 100, 0.01));

    // Legs
    this.springs.push(new VerletSpring2D(this.parts[8].p, this.parts[10].p, 80, 0.01));
    this.springs.push(new VerletSpring2D(this.parts[8].p, this.parts[9].p, 80, 0.01));

    physics.addSpring(new VerletMinDistanceSpring2D(this.parts[10].p, this.parts[9].p, 50, 0.01));

    // Toes
    this.springs.push(new VerletSpring2D(this.parts[12].p, this.parts[10].p, 80, 0.01));
    this.springs.push(new VerletSpring2D(this.parts[11].p, this.parts[9].p, 80, 0.01));

    // particle motion
    for (var i = 0; i < this.parts.length; i++) {
        var p = this.parts[i];
        physics.addParticle(p.p);
    }

    // move body
    for (var i = 0; i < this.springs.length; i++) {
        var s = this.springs[i];
        physics.addSpring(s);
    }

    this.hangle = 0;
    this.vangle = 0;
    this.headhangle = 0;
    this.headvangle = 0;
}

// Dance
Skeleton.prototype.dance = function ()
{
    this.parts[0].p.x = this.origin.x + sin(this.headhangle) * 20;
    this.parts[0].p.y = this.origin.y + cos(this.headvangle) * 20;

    this.parts[9].p.x -= 20;
    this.parts[10].p.x += 20;

    this.hangle += 0.002;  
    this.vangle += 0.01;
    this.headhangle += 0.3;
    this.headvangle += 0.3;
}

Skeleton.prototype.raiseShoulder = function () {
    this.parts[2].p.y -= 10; 
    this.parts[3].p.y -= 12;

    this.hangle += 0.00025;  
}

Skeleton.prototype.danceFast = function () {
    this.parts[6].p.y -= 20; 
    this.parts[5].p.y -= 10; 
    this.hangle += 0.0055;
}

Skeleton.prototype.collapse = function () {
    this.parts[1].p.y += 10; // Lower the chest
    this.parts[8].p.y += 10; // Lower the hips
    this.parts[9].p.x -= 5;  // Move left leg to the left
    this.parts[10].p.x += 5; // Move right leg to the right
    this.parts[11].p.y += 5; // Lower left toes
    this.parts[12].p.y += 5; // Lower right toes

    this.hangle += 0.0005;
}



Skeleton.prototype.display = function () {
    // display joints
    for (var i = 0; i < this.springs.length; i++) {
        var s = this.springs[i];
        stroke(255);
        strokeWeight(10);
        line(s.a.x, s.a.y, s.b.x, s.b.y);
    }

    // display body 
    for (var i = 0; i < this.parts.length; i++) {
        var p = this.parts[i];
        p.display();
    }
}

//

// const movementThreshold = 0.1;
// const initialSliderValue = 5;

// const audio1Slider = document.getElementById("myRange1");
// audio1Slider.value = initialSliderValue;

// const audio2Slider = document.getElementById("myRange2");
// audio2Slider.value = initialSliderValue;

// function updateSliderValue(value) {
//     audio1Slider.value = value;
//     // Rest of your code
// }
    
function calculateAbsoluteDifference(data) {
    if (prevSensorData) {
        const diffAx = Math.abs(data.ax - prevSensorData.ax);
        const diffAy = Math.abs(data.ay - prevSensorData.ay);
        const diffAz = Math.abs(data.az - prevSensorData.az);

        const totalDiffOfA = diffAx + diffAy + diffAz;

        if (diffAx >= 2) {
            console.log('Big Movement on _A_ Detected!');
            // const newValue = parseInt(audio1Slider.value) + 1;
            // updateSliderValue(newValue);
            // console.log(audio1Slider.value);
            // //can also add the drum
            // const keyEvent = new KeyboardEvent('keydown', {
            //     key: 'f'
            // });
            // document.dispatchEvent(keyEvent);

            // const keyUp = new KeyboardEvent('keyup', {
            //     key: 'f',
            // });
            // document.dispatchEvent(keyUp);
            Skeleton.dancer.raiseShoulder();
        }

        if (Math.abs(data.ax) < 0.03) 
        {
            console.log('Move!!!!!');
            // const keyEvent = new KeyboardEvent('keydown', {
            //     key: 'g',
            // });
            // document.dispatchEvent(keyEvent);

            // const keyUp = new KeyboardEvent('keyup', {
            //     key: 'g',
            // });
            // document.dispatchEvent(keyUp);
            
            // const newValue = parseInt(audio1Slider.value) - 1;
            // updateSliderValue(newValue);
        }

        if (diffAx >= 3) {
            console.log('Big Movement on _O_ Detected!');                    
        }
    }

    prevSensorData = data;
}

function handleReceivedSensorData(data) {
    calculateAbsoluteDifference(data);
}

