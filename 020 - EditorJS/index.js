import EditorJS from '@editorjs/editorjs';
import Header from "@editorjs/header"
import List from "@editorjs/list"
import Embed from "@editorjs/editorjs"

const editor = new EditorJS({
    holder : "editorjs",
    tools : {
        header : {
            class : Header,
            inlineToolbar : ['link']  
        },
        list : {
            class : List,
            inlineToolbar : [
                'link',
                'bold'
            ]
        },
        
    }
})

let saveBtn = document.querySelector("button");