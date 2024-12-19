import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


@Component({
  selector: 'app-threed-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './threed-preview.component.html',
  styleUrl: './threed-preview.component.css'
})
export class ThreedPreviewComponent implements OnInit{
  ngOnInit(): void {
    if(!this.modelUrl){
      return;
    }
  }
  @ViewChild('canvas') private canvasRef!:ElementRef<HTMLCanvasElement>;
  @Input() modelUrl:string='';

  private scene!:THREE.Scene;
  private camera!:THREE.PerspectiveCamera;
  private renderer!:THREE.WebGLRenderer;
  private controls!:OrbitControls;
  private model:THREE.Object3D | null=null;
  
  isLoading=true;

  ngAfterViewInit():void{
    this.initScene();
    this.loadModel();
    this.animate();
  }

  private initScene():void{
    //Scene setup
    this.scene=new THREE.Scene();
    this.scene.background=new THREE.Color(0xf0f0f0);

    //Camera setup
    const aspect=this.getAspectRatio();
    this.camera=new THREE.PerspectiveCamera(75,aspect,0.1,1000);
    this.camera.position.z=5;

    // Renderer setup
    this.renderer=new THREE.WebGLRenderer({
          canvas:this.canvasRef.nativeElement,
          antialias:true
        });
    this.renderer.setSize(this.getWidth(),this.getHeight());
    this.renderer.setPixelRatio(window.devicePixelRatio) ;
    this.renderer.shadowMap.enabled=true;
    
    // Controls setup
    this.controls=new OrbitControls(this.camera,this.renderer.domElement);
    this.controls.enableDamping=true;
    this.controls.dampingFactor=0.05;

    // Lighting setup
    const ambientLight=new THREE.AmbientLight(0xffffff,0.5);
    this.scene.add(ambientLight);

    const directionalLight=new THREE.DirectionalLight(0xffffff,1);
    directionalLight.position.set(5,5,5);
    directionalLight.castShadow=true;
    this.scene.add(directionalLight);

    //Handle window resize
    window.addEventListener('resize',()=>this.onWindowResize());
        
  }

private loadModel():void{
      const dracoLoader=new DRACOLoader();
      dracoLoader.setDecoderPath('/assets/3dModels/libs/draco/gltf/');
  
      const loader=new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        this.modelUrl,
        (gltf)=>{
          if(this.model){
            this.scene.remove(this.model);
          }

          this.model=gltf.scene;
          this.scene.add(this.model);
          //center and scale model

          const box=new THREE.Box3().setFromObject(this.model);
          const center=box.getCenter(new THREE.Vector3());
          const size=box.getSize(new THREE.Vector3());

          const maxDim=Math.max(size.x,size.y,size.z);
          const scale=2/maxDim;
          this.model.scale.multiplyScalar(scale);

          this.model.position.sub(center.multiplyScalar(scale));

          this.isLoading=false;

        },
        (progress)=>{
          console.log('Loading progress', (progress.loaded/progress.total)*100,'%');
        },
        (error)=>{
          console.log('Error loading model!',error);
          this.isLoading=false;
        }
      );
}  

private animate():void{
  requestAnimationFrame(()=>this.animate());
  if(this.model){
    this.model.rotation.y+=0.01;
  }
  this.controls.update();
  this.renderer.render(this.scene,this.camera);
}

private getAspectRatio():number{
  return this.getWidth()/this.getHeight();
}

private getWidth():number{
  return this.canvasRef?.nativeElement?.parentElement?.clientWidth  || window.innerWidth;
}

private getHeight():number{
  return this.canvasRef?.nativeElement?.parentElement?.clientHeight  || window.innerHeight;
}

private onWindowResize():void{
  if(this.camera && this.renderer){
    this.camera.aspect=this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.getWidth(),this.getHeight());
  }
}

resetCamera():void{
  this.camera.position.set(0,0,5);
  this.camera.lookAt(0,0,0);
  this.controls.reset();
}

ngOnDestroy(): void {
  window.removeEventListener('resize',()=>this.onWindowResize());

  if(this.renderer!=null){
    this.renderer.dispose();
    this.renderer=null;
    this.canvasRef=null;
  }
}
}
