/* Lecture 8
 * CS 4388/ CS 5388, Fall 2025, Texas State University
 * Instructor: Isayas Berhe Adhanom <isayas@txstate.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{
    private ground: gfx.Mesh3;
    private skybox: gfx.Mesh3;
    private sphere: gfx.Mesh3;

    private sphereVelocity: gfx.Vector3;


    // --- Create the App class ----
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.ground = gfx.Geometry3Factory.createBox(50, 1, 50);
        this.skybox = gfx.Geometry3Factory.createBox(100, 100, 100);
        this.sphere = gfx.Geometry3Factory.createSphere();

        this.sphereVelocity = new gfx.Vector3();

    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {     
        this.camera.setPerspectiveCamera(60, 1920/1080, 0.1, 1000);
        this.camera.position.set(0,1.6,0);

        this.ground.material.setColor(new gfx.Color(83/255, 209/255, 110/255));
        this.ground.position.set(0,-0.5, 0);

        //create ambient light to add uniform and constant lighting to everything in the scene
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.4, 0.4, 0.4));
      
        //create directional light that is infinitely far away like sunlight
        const directionaltLight = new gfx.DirectionalLight(new gfx.Color(0.6, 0.6, 0.6));
        directionaltLight.position.set(-1,2,1)    

       
        this.skybox.material = new gfx.UnlitMaterial(); 
        this.skybox.material.side = gfx.Side.BACK;
        this.skybox.material.setColor( new gfx.Color(0.698, 1, 1))

        
        this.sphere.position.set(0,3,-6);
        this.sphereVelocity.set(0,6,0);

                
        this.scene.add(this.ground);
        this.scene.add(this.skybox);
        this.scene.add(this.sphere);
        this.scene.add(ambientLight);
        this.scene.add(directionaltLight);
    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        //set accelaration
        const sphereAccelartion = new gfx.Vector3(0, -9.8, 0);  //accelartion m per sec per sec
        const frictionSlowdown = 0.75;

        // v_new = v_old + a * dt
        const a_dt = gfx.Vector3.multiplyScalar(sphereAccelartion, deltaTime);
        this.sphereVelocity.add(a_dt)

        //p_new = p_old + v_new * dt
        const v_dt = gfx.Vector3.multiplyScalar(this.sphereVelocity, deltaTime);
        this.sphere.position.add(v_dt);

        if(this.sphere.position.y < 0){
            console.log("collision detected: ", this.sphere.position.y)
            this.sphere.position.y = 1.0;
            this.sphereVelocity.y *= -1.0;
            this.sphereVelocity.multiplyScalar(frictionSlowdown);
        }

    }
}