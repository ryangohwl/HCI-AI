import React from 'react'
import { useEditor,getSnapshot } from 'tldraw';
import { useState,useEffect } from 'react';

export function useGetArrows() {
    const editor = useEditor();
    const selectedShapes = () =>{
        const shape=editor.getSelectedShapes()
        if (shape.length >1){
            alert("Please select 1 text box only!")
        } else if (shape.length ===0){
            alert("please select at least 1 text box!")
        }
        
        else{
            if (shape[0].type ==="text"){
                const shapeId = shape[0].id
                const {document, session} = getSnapshot(editor.store)
                const store = document.store
                const getAllABindings = () =>{
                    for(let key in store) {
                        console.log(key)
                        if (store.hasOwnProperty(key) && key.startsWith('binding')){
                            console.log("exists")
                        }
                    }
                }
                getAllABindings()
                // useEffect(()=>{
                    
                    
                // },[bindings])
                // const allArrows = document.store

            }
            else {

                alert("Can only generate from texts!")

            }
        }
    }
    return selectedShapes
    };


  
