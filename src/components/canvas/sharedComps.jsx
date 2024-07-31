import React, { useCallback } from "react";
import { useEditor, getSnapshot } from "tldraw";
import { useState, useEffect, useRef } from "react";

export function useGetArrows() {
  const [currentTextObj, setCurrentTextObj] = useState("");
  const [currentBindings, setCurrentBindings] = useState([]);

  const [contextStringArray, setContextStringArray] = useState ([])
  const editor = useEditor();
  const isFirstRender = useRef(true);
  const { document, session } = getSnapshot(editor.store);
  const store = document.store;
  const getAllBindings =() =>{
    const newBindings = [];
    for (let key in store) {
        
      if (store.hasOwnProperty(key) && key.startsWith("binding")) {
        newBindings.push({ "id": store[key].id, "toId": store[key].toId, "fromId": store[key].fromId });
        
      }
    
    }
    
    return newBindings
  }
    

    //Get all content bindings
  useEffect(() => {
    // console.log(`current text obj` + currentTextObj)
    const allBindings = getAllBindings()
    for (let index in allBindings) {
        const binding = allBindings[index]
        if (currentTextObj === binding.toId){
            const bindedToCurrentTextId = binding
            const bindedArrowIdToCurrentText = bindedToCurrentTextId.fromId
            console.log(`arrow object`+editor.getShape(bindedArrowIdToCurrentText)
        )
            for (let indextwo in allBindings){
                const bindingtwo = allBindings[indextwo]
                if (bindedArrowIdToCurrentText === bindingtwo.fromId){
                    const bindedToCurrentArrow = bindingtwo
                    const bindedTextIdToArrow = bindedToCurrentArrow.toId
                    const nextText = editor.getShape(bindedTextIdToArrow)
                    if (nextText.type !== "text") {
                        
                        console.log('end of map')
                    }
                    else {
                        setContextString()
                        console.log(nextText.props.text)
                        setCurrentTextObj(nextText)
                    }

                 }
            }
            // const bindedArrowToCurrentText = editor
            // console.log(store[bindedArrowsToCurrentText])
            // const startOfArrow = store
            // console.log(bindedArrowsToCurrentText)
            
            // console.log(`arrowId connected to current text:`+allBindings[binding])
            // const relevantArrow= allBindings[binding]
            // console.log(relevantArrow)
            // console.log(`text connected to currentText` +relevantArrow.key.fromId)
        }
      }
    },[currentTextObj])


    // sets all the bindings on the board


  const validShape =() => {
    const shape = editor.getSelectedShapes()
    if (shape.length > 1) {
      alert("Please select 1 text box only!");
    } 
    else if (shape.length === 0) {
      alert("please select at least 1 text box!");
    } 
    else {
      if (shape[0].type === "text") {
        setCurrentTextObj(shape[0].id);
      } else {
        alert("Can only generate from texts!");
      }
    }
  }

  return validShape;
}

// import React from 'react'
// import { useEditor,getSnapshot } from 'tldraw';
// import { useState,useEffect } from 'react';

// export function useGetArrows() {
//     const [bindings , setBindings] = setState([])
//     const editor = useEditor();
//     const selectedShapes = () =>{
//         const shape=editor.getSelectedShapes()
//         if (shape.length >1){
//             alert("Please select 1 text box only!")
//         } else if (shape.length ===0){
//             alert("please select at least 1 text box!")
//         }

//         else{
//             if (shape[0].type ==="text"){
//                 const setCurrentTextObj = shape[0].id
//                 const {document, session} = getSnapshot(editor.store)
//                 const store = document.store

//                 const getAllABindings = () =>{
//                     const bindings = []
//                     for(let key in store) {
//                         if (store.hasOwnProperty(key) && key.startsWith('binding')){

//                             bindings.push(store[key])

//                             console.log(bindings)
//                         }
//                     if (bindings.length ===0) {
//                     }
//                     }
//                 }
//                 getAllABindings()
//                 // useEffect(()=>{

//                 // },[bindings])
//                 // const allArrows = document.store

//             }
//             else {

//                 alert("Can only generate from texts!")

//             }
//         }
//     }
//     return selectedShapes
//     };
