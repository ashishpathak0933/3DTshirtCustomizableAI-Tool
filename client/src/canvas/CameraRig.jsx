import React , {useRef}from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath';
import { useSnapshot } from 'valtio'
import state from '../store'
const CameraRig = ({children}) => {
    const group = useRef();
    const snap = useSnapshot(state);
   

    // just remember this hooks it allows to execute code on every rendered frame
    useFrame((state, delta)=>{
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    
    // initial position 
     let targetPosition = [-0.4 , 0 , 2];
     if(snap.intro){
    if(isBreakpoint) targetPosition = [0,0,2];
    if(isMobile) targetPosition = [0, 0.2 , 2.5] 
      } else {
    if(isMobile) targetPosition = [0, 0, 2.5]
    else targetPosition = [0, 0, 2];
          }
        
    //set model camera position 
    easing.damp3(state.camera.position, targetPosition , 0.25 , delta);  

    //ashish bro remember for rotation property 
    easing.dampE(
    group.current.rotation,
    [state.pointer.y / 10 , -state.pointer.x/ 5, 0], 
    0.25, 
    delta
    )

    })


   
  return (
    <group ref={group}>
        {children}
    </group>
  )
}

export default CameraRig
